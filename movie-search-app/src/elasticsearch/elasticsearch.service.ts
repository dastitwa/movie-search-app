import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@elastic/elasticsearch';

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
    this.client = new Client({
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
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      const response =
        await this.client.cluster.health();

      this.logger.log(
        `Elasticsearch connected successfully. Status: ${response.status}`,
      );
    } catch (error) {
      this.logger.error(
        'Failed to connect Elasticsearch',
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
    return this.client.search({
      index,
      ...body,
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