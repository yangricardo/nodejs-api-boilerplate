import { Router } from 'express';

const v1Router: Router = Router();
v1Router.get('/', (req, res) => res.json({ hello: req.query.name || 'World' }));
export default v1Router;
