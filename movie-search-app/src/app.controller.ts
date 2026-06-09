import {
  ValidationPipe,
  Logger,
  INestApplication,
} from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

import { ExecutionTimeInterceptor } from './common/interceptors/execution-time.interceptor';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

let app: INestApplication;

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    app = await NestFactory.create(AppModule);

    const configService =
      app.get(ConfigService);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    app.useGlobalInterceptors(
      new ExecutionTimeInterceptor(),
    );

    app.useGlobalFilters(
      new GlobalExceptionFilter(),
    );

    app.enableShutdownHooks();

    const port =
      configService.get<number>('PORT') ??
      3000;

    await app.listen(port);

    logger.log(
      `Movie Search API running on port ${port}`,
    );
  } catch (error) {
    logger.error(
      'Failed to start application',
      error,
    );

    process.exit(1);
  }
}

async function gracefulShutdown(
  signal: string,
) {
  const logger = new Logger('Shutdown');

  try {
    logger.log(
      `${signal} received. Starting graceful shutdown.`,
    );

    if (app) {
      await app.close();
    }

    logger.log(
      'Application shutdown completed.',
    );

    process.exit(0);
  } catch (error) {
    logger.error(
      'Shutdown failed',
      error,
    );

    process.exit(1);
  }
}

process.on('SIGINT', () =>
  gracefulShutdown('SIGINT'),
);

process.on('SIGTERM', () =>
  gracefulShutdown('SIGTERM'),
);

bootstrap();