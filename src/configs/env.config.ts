import dotenv from 'dotenv';
import Joi from 'joi';

export class EnvironmentConfiguration {
  PORT: number;
  HTTP_RUNTIME: 'express';
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SYNCRONIZE: boolean;
  DB_LOGGING: boolean;
  DB_SSL!: boolean;

  static builder(): EnvironmentConfiguration {
    dotenv.config();
    const { value, error } = Joi.object({
      PORT: Joi.number().default(3000),
      HTTP_RUNTIME: Joi.string().valid('express').default('express'),
      DB_NAME: Joi.string().default('postgres'),
      DB_USERNAME: Joi.string().default('postgres'),
      DB_PASSWORD: Joi.string().default('postgres'),
      DB_HOST: Joi.string().default('localhost'),
      DB_PORT: Joi.number().default(5434),
      DB_SYNCRONIZE: Joi.boolean().default(false),
      DB_LOGGING: Joi.boolean().default(false),
      DB_SSL: Joi.boolean().default(false),
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
