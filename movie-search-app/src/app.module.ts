import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';

// import { BulkIndexService } from './ingestion/bulk-index.service';

import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ElasticsearchModule,

    MoviesModule,
  ],

  // providers: [
  //   BulkIndexService
  // ],
  
})
export class AppModule {}