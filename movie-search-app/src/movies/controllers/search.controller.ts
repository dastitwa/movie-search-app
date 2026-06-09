import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import { SearchService } from '../services/search.service';

import type {
  RankingMode,
} from '../queries/ranking.query';

@Controller('movies/search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
  ) {}

  @Get('full-text')
  async fullTextSearch(
    @Query('q') query: string,

    @Query('page')
    page = '1',

    @Query('size')
    size = '10',
  ) {
    return this.searchService.fullTextSearch(
      query,
      Number(page),
      Number(size),
    );
  }

  @Get('keyword')
  async keywordSearch(
    @Query('field') field: string,

    @Query('value') value: string,

    @Query('page')
    page = '1',

    @Query('size')
    size = '10',
  ) {
    return this.searchService.keywordSearch(
      field,
      value,
      Number(page),
      Number(size),
    );
  }

  @Get('fuzzy')
  async fuzzySearch(
    @Query('q') query: string,

    @Query('page')
    page = '1',

    @Query('size')
    size = '10',
  ) {
    return this.searchService.fuzzySearch(
      query,
      Number(page),
      Number(size),
    );
  }

  @Get('autocomplete')
  async autocompleteSearch(
    @Query('q') query: string,

    @Query('page')
    page = '1',

    @Query('size')
    size = '10',
  ) {
    return this.searchService.autocompleteSearch(
      query,
      Number(page),
      Number(size),
    );
  }

  @Get('partial')
  async partialSearch(
    @Query('q') query: string,

    @Query('page')
    page = '1',

    @Query('size')
    size = '10',
  ) {
    return this.searchService.partialSearch(
      query,
      Number(page),
      Number(size),
    );
  }

  @Get('filter')
  async filterSearch(
    @Query('genre') genre?: string,

    @Query('language')
    language?: string,

    @Query('page')
    page = '1',

    @Query('size')
    size = '10',
  ) {
    return this.searchService.filterSearch(
      genre,
      language,
      Number(page),
      Number(size),
    );
  }

  @Get('combined')
  async combinedSearch(
    @Query('q') query: string,

    @Query('genre')
    genre?: string,

    @Query('year')
    year?: string,

    @Query('page')
    page = '1',

    @Query('size')
    size = '10',
  ) {
    return this.searchService.combinedSearch(
      query,
      genre,
      year
        ? Number(year)
        : undefined,
      Number(page),
      Number(size),
    );
  }

  @Get('ranking')
  async rankingSearch(
    @Query('q') query: string,

    @Query('mode')
    mode = 'all',

    @Query('page')
    page = '1',

    @Query('size')
    size = '10',
  ) {
    return this.searchService.rankingSearch(
      query,
      mode as RankingMode,
      Number(page),
      Number(size),
    );
  }
}