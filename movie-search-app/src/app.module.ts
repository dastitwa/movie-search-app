import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import {
  ThrottlerModule,
  ThrottlerGuard,
} from '@nestjs/throttler';

import {
  APP_GUARD,
} from '@nestjs/core';

import { envValidationSchema } from './config/env.validation';

import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';

import { HealthModule } from './health/health.module';

import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema:
        envValidationSchema,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),

    ElasticsearchModule,

    MoviesModule,

    HealthModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}