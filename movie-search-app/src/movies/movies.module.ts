import { Module } from '@nestjs/common';

import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';

import { SearchController } from './controllers/search.controller';

import { SearchService } from './services/search.service';

@Module({
  imports: [
    ElasticsearchModule,
  ],

  controllers: [
    SearchController,
  ],

  providers: [
    SearchService,
  ],
})
export class MoviesModule {}