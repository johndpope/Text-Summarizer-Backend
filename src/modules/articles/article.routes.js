import {
    Router
} from 'express';
import validate from 'express-validation';
import articleValidation from './article.validations';

import * as articleController from './article.controllers';
import {
    authJwt
} from "../../services/auth.services";

const routes = new Router();

routes.post('/', authJwt, validate(articleValidation.createArticle), articleController.createArticle);
routes.get('/:id', articleController.getArticleById);
routes.get('/', articleController.getArticlesList);
routes.patch(
    '/:id',
    authJwt,
    validate(articleValidation.updateArticle),
    articleController.updateArticle,
);
routes.delete('/:id', authJwt, articleController.deleteArticle);

export default routes;