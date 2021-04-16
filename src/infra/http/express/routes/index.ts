import { Router } from 'express';
import v1Router from './v1';
const baseRouter: Router = Router();
baseRouter.use('/v1', v1Router);
export default baseRouter;
