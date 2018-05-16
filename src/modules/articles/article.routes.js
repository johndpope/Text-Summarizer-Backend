import { Router } from 'express';
import validate from 'express-validation';
import articleValidation from './article.validations';
import * as articleController from './article.controllers';
import { authJwt } from '../../services/auth.services';
import { mult } from '../../services/upload.services';

const routes = new Router();

routes.post('/', authJwt, mult, validate(articleValidation.createArticle), articleController.createArticle);
routes.get('/:id', authJwt,articleController.getArticleById);
routes.get('/', authJwt,articleController.getArticlesList);
routes.patch('/:id', authJwt, mult, validate(articleValidation.updateArticle), articleController.updateArticle);
routes.delete('/:id', authJwt, articleController.deleteArticle);
routes.post('/:id/favourite', authJwt, articleController.favouriteArticle);
routes.post('/:id/toread', authJwt, articleController.toReadArticle);

export default routes;
