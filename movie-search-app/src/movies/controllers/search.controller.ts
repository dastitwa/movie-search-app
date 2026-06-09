import {
    Controller,
    Get,
    Query,
  } from '@nestjs/common';
  
  import { SearchService } from '../services/search.service';
  
  @Controller('movies/search')
  export class SearchController {
    constructor(
      private readonly searchService: SearchService,
    ) {}
  
    @Get('full-text')
    async fullTextSearch(
      @Query('q')
      query: string,
    ) {
      return this.searchService.fullTextSearch(
        query,
      );
    }
  }