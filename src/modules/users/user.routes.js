import { Router } from 'express';
import path from 'path';
import { authLocal } from '../../services/auth.services';
import { authJwt } from '../../services/auth.services';
import { mult } from '../../services/upload.services';
import * as userController from './user.controllers';

const routes = new Router();

routes.post('/signup', mult ,userController.signup);
routes.post('/login', authLocal, userController.login);
routes.post('/:id/follow', authJwt ,userController.follow);
routes.patch('/update', authJwt, mult, userController.update);

export default routes;
