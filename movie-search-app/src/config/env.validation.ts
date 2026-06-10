import * as Joi from 'joi';

export const envValidationSchema =
  Joi.object({
    PORT: Joi.number()
      .default(3000),

    ELASTICSEARCH_NODE:
      Joi.string()
        .uri()
        .required(),

    ELASTICSEARCH_USERNAME:
      Joi.string()
        .required(),

    ELASTICSEARCH_PASSWORD:
      Joi.string()
        .required(),
  });