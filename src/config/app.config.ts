import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default registerAs('app', () => ({
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/modules/**/*.entity.js'],
    synchronize: process.env.NODE_ENV != 'production',
    logging: process.env.NODE_ENV != 'production',
    logger: 'advanced-console',
  } as TypeOrmModuleOptions,
}));