import { ExpressProvider } from '@/infra/http/express/express.provider';
import { EnvironmentConfiguration } from './env.config';
export class StartupConfiguration {
  static async run({ HTTP_RUNTIME } = EnvironmentConfiguration.builder()) {
    switch (HTTP_RUNTIME) {
      case 'express':
      default:
        ExpressProvider.builder().run();
        break;
    }
  }
}
