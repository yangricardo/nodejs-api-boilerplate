import dotenv from 'dotenv';
import Joi from 'joi';

export class EnvironmentConfiguration {
  PORT: number;
  HTTP_RUNTIME: 'express';

  static builder(): EnvironmentConfiguration {
    dotenv.config();
    const { value, error } = Joi.object({
      PORT: Joi.number().default(3000),
      HTTP_RUNTIME: Joi.string().valid('express').default('express'),
    })
      .unknown(true)
      .validate(process.env, { abortEarly: false });
    if (error) {
      console.error(error.details);
      process.exit(1);
    }
    return value;
  }
}
