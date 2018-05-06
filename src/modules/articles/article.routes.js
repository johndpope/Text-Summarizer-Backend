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

export default routes;