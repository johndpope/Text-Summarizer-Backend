import { Router } from 'express';
import path from 'path';
import Multer from 'multer';
import Minio from 'minio';
import { authLocal } from '../../services/auth.services';
import { authJwt } from '../../services/auth.services';
import * as userController from './user.controllers';
import { minioClient } from '../../services/minio.services'

const routes = new Router();

routes.post('/signup', userController.signup);
routes.post('/login', authLocal, userController.login);
routes.post('/:id/follow', authJwt ,userController.follow);
routes.patch('/update', authJwt, Multer({storage: Multer.memoryStorage()}).single("photo"), userController.update);

export default routes;
