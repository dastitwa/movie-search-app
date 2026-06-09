import {
    Injectable,
    Logger,
  } from '@nestjs/common';
  
  import { ElasticsearchService } from '../../elasticsearch/elasticsearch.service';
  
  import { MOVIES_INDEX } from '../constants/index.constants';
  
  import { buildFullTextQuery } from '../queries/full-text.query';
  
  @Injectable()
  export class SearchService {
    private readonly logger =
      new Logger(SearchService.name);
  
    constructor(
      private readonly elasticsearchService: ElasticsearchService,
    ) {}
  
    async fullTextSearch(
      query: string,
    ) {
      const startTime =
        Date.now();
  
      const response =
        await this.elasticsearchService.search(
          MOVIES_INDEX,
          buildFullTextQuery(
            query,
          ),
        );
  
      const executionTime =
        Date.now() - startTime;
  
      this.logger.log(
        `Full text search completed in ${executionTime} ms`,
      );
  
      return {
        total:
          response.hits.total,
        results:
          response.hits.hits.map(
            (hit) =>
              hit._source,
          ),
      };
    }
  }