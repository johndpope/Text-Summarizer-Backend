import { Router } from 'express';
import validate from 'express-validation';
import collectionValidation from './collection.validations';
import * as collectionController from './collection.controllers';
import { authJwt } from '../../services/auth.services';
import { mult } from '../../services/upload.services';


const routes = new Router();

routes.post('/', authJwt, mult, validate(collectionValidation.createCollection), collectionController.createCollection);
routes.patch('/:id', authJwt, mult, validate(collectionValidation.updateCollection), collectionController.updateCollection);
routes.get('/:id', authJwt, collectionController.getCollectionById);
routes.post('/:cid/:aid', authJwt, collectionController.addArticleToCollection); // performs the add and delete (if the requested article already exists it got deleted)
routes.delete('/:id', authJwt, collectionController.deleteCollection);
routes.get('/user/:uid', authJwt, collectionController.getUserCollections);

export default routes
