import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().required(),

  ELASTICSEARCH_NODE: Joi.string().required(),

  ELASTICSEARCH_USERNAME: Joi.string().allow(''),

  ELASTICSEARCH_PASSWORD: Joi.string().allow(''),
});