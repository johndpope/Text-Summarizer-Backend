import { Router } from 'express';

import * as userController from './user.controllers';

const routes = new Router();

routes.post('/signup', userController.signup);

export default routes;
