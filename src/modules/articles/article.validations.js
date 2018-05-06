import Joi from 'joi';

export default {
  createArticle: {
    body: {
      title: Joi.string().min(3).required(),
      text: Joi.string().min(10).required(),
    }
  }
}