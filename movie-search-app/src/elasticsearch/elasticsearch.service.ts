import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Client,
  ClientOptions,
} from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(
    ElasticsearchService.name,
  );

  private readonly client: Client;

  constructor(
    private readonly configService: ConfigService,
  ) {
    const clientOptions: ClientOptions = {
      node:
        this.configService.get<string>(
          'ELASTICSEARCH_NODE',
        ) ?? 'https://localhost:9200',

      auth: {
        username:
          this.configService.get<string>(
            'ELASTICSEARCH_USERNAME',
          ) ?? '',
        password:
          this.configService.get<string>(
            'ELASTICSEARCH_PASSWORD',
          ) ?? '',
      },

      tls: {
        rejectUnauthorized: false,
      },

      maxRetries: 3,

      requestTimeout: 10000,

      sniffOnStart: false,
    };

    this.client = new Client(clientOptions);
  }

  private async waitForElasticsearch(): Promise<void> {
    const maxAttempts = 5;

    for (
      let attempt = 1;
      attempt <= maxAttempts;
      attempt++
    ) {
      try {
        const response =
          await this.client.cluster.health();

        this.logger.log(
          `Elasticsearch connected successfully. Status: ${response.status}`,
        );

        return;
      } catch (error) {
        const delay = Math.min(
          1000 * Math.pow(2, attempt),
          10000,
        );

        this.logger.warn(
          `Elasticsearch unavailable. Retry ${attempt}/${maxAttempts} in ${delay}ms`,
        );

        if (attempt === maxAttempts) {
          throw error;
        }

        await new Promise(
          (resolve) =>
            setTimeout(resolve, delay),
        );
      }
    }
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.waitForElasticsearch();
    } catch (error) {
      this.logger.error(
        'Failed to connect Elasticsearch after retries',
        error,
      );

      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.close();

    this.logger.log(
      'Elasticsearch connection closed',
    );
  }

  getClient(): Client {
    return this.client;
  }

  async indexExists(
    index: string,
  ): Promise<boolean> {
    return this.client.indices.exists({
      index,
    });
  }

  async createIndex(
    index: string,
    mapping: Record<string, any>,
  ) {
    return this.client.indices.create({
      index,
      mappings: mapping,
    });
  }

  async deleteIndex(index: string) {
    return this.client.indices.delete({
      index,
    });
  }

  async getIndex(index: string) {
    return this.client.indices.get({
      index,
    });
  }

  async search(
    index: string,
    body: Record<string, any>,
  ) {
    const safeBody = { ...body };
  
    delete safeBody.index;
  
    return this.client.search({
      index,
      ...safeBody,
    });
  }

  async bulk(
    operations: Record<string, any>[],
  ) {
    return this.client.bulk({
      refresh: true,
      operations,
    });
  }

  async count(index: string) {
    return this.client.count({
      index,
    });
  }

  async health() {
    return this.client.cluster.health();
  }

  async ping(): Promise<boolean> {
    try {
      await this.client.ping();

      return true;
    } catch {
      return false;
    }
  }
}