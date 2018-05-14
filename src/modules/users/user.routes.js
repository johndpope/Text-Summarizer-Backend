import { Router } from 'express';
import path from 'path';
import { authLocal } from '../../services/auth.services';
import { mult } from '../../services/upload.services';
import * as userController from './user.controllers';
var multer  = require('multer')

const routes = new Router();

routes.post('/signup', userController.signup);
routes.post('/login', authLocal, userController.login);


routes.post('/profile', mult, function (req, res, next) {
  //console.log(req.file)
})

export default routes;
