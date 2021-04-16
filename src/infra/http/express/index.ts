import express, { Application, Router } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { EnvironmentConfiguration } from '@/configs/env.config';
import { errors } from 'celebrate';
import { handleAsyncErrorMiddleware } from './middelwares/handle-async-error.middelware';

export class ExpressConfiguration {
  private app: Application;
  private env: EnvironmentConfiguration;

  constructor(router: Router) {
    this.app = express();
    this.env = EnvironmentConfiguration.builder();
    this.app.use(cors());
    this.app.use(express.text());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(router);
    this.app.use(errors());
    this.app.use(handleAsyncErrorMiddleware);
  }

  public run() {
    this.app.listen(this.env.PORT, () =>
      console.log(`Server is listening on port ${this.env.PORT}!`),
    );
  }

  static builder(router: Router = Router()) {
    return new ExpressConfiguration(router);
  }
}
