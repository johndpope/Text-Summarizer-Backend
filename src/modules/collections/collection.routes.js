import { Router } from 'express';
import validate from 'express-validation';
import collectionValidation from './collection.validations';
import * as collectionController from './collection.controllers';
import { authJwt } from '../../services/auth.services';
import { mult } from '../../services/upload.services';


const routes = new Router();

routes.post('/', authJwt, mult, validate(collectionValidation.createCollection), collectionController.createCollection);

export default routes
