import { EnvironmentConfiguration } from './env.config';
import path from 'path';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_NAME,
  DB_LOGGING,
  DB_PASSWORD,
  DB_SYNCRONIZE,
  DB_SSL,
} = EnvironmentConfiguration.builder();

const sslConfig = DB_SSL
  ? {
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }
  : {};

export const defaultConnection: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: DB_SYNCRONIZE,
  logging: DB_LOGGING,
  entities: [path.join(__dirname, '..', `**`, `*.entity.*`)],
  migrations: [
    path.join(__dirname, '..', 'core', 'typeorm', 'migrations', '**', '*.ts'),
  ],
  subscribers: [path.join(__dirname, '..', `**`, `*.subscriber.*`)],
  cli: {
    entitiesDir: path.join(__dirname, '..', 'core', 'typeorm', 'entities'),
    migrationsDir: path.join(__dirname, '..', 'core', 'typeorm', 'migrations'),
    subscribersDir: path.join(
      __dirname,
      '..',
      'core',
      'typeorm',
      'subscribers',
    ),
  },
  ...sslConfig,
};

export async function getDefaultConnection(): Promise<Connection> {
  const connection = await createConnection(defaultConnection);
  console.log(`=====> ${connection.name} database connection started<====`);
  return connection;
}

export default defaultConnection;
