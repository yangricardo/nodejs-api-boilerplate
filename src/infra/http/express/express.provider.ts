import express, { Application } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import passport from 'passport';
import { EnvironmentConfiguration } from '@/configs/env.config';
import { handleAsyncErrorMiddleware } from './middelwares/handle-async-error.middelware';
import routes from './routes';
export class ExpressProvider {
  private app: Application;
  private env: EnvironmentConfiguration;

  constructor() {
    this.app = express();
    this.env = EnvironmentConfiguration.builder();
    this.app.use(cors());
    this.app.use(express.text());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(routes);
    this.app.use(errors());
    this.app.use(handleAsyncErrorMiddleware);
  }

  public run() {
    this.app.listen(this.env.PORT, () => {
      console.log(`[ExpressProvider] Listening on port (${this.env.PORT})`);
      console.log(
        `[ExpressProvider] Available on endpoint (http://localhost:${this.env.PORT})`,
      );
    });
  }

  static builder() {
    return new ExpressProvider();
  }
}
