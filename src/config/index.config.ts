import { ConfigModuleOptions } from '@nestjs/config';
import * as path from 'path';
import appConfig from './app.config';
import * as Joi from 'joi';

export default {
  isGlobal: true,
  envFilePath: [
    '../../.env',
  ].map(dir => path.join(__dirname, dir)),
  load: [appConfig],
  validationSchema: Joi.object({
    ENV: Joi.string().default('development'),
    PORT: Joi.number().port().default(3000),
    DB_TYPE: Joi.string().default('postgres'),
    DB_HOST: Joi.string().default('localhost'),
    DB_USERNAME: Joi.string().default('exam'),
    DB_PASSWORD: Joi.string().default('testpassword'),
    DB_NAME: Joi.string().default('exams'),
  }),
} as ConfigModuleOptions;