import { ExpressConfiguration } from '@/infra/http/express';
import { EnvironmentConfiguration } from './env.config';
export class StartupConfiguration {
  static async run({ HTTP_RUNTIME } = EnvironmentConfiguration.builder()) {
    switch (HTTP_RUNTIME) {
      case 'express':
      default:
        ExpressConfiguration.builder().run();
        break;
    }
  }
}
