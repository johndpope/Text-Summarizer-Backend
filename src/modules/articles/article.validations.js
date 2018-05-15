import Joi from 'joi';

export default {
  createArticle: {
    body: {
      title: Joi.string().min(3).max(24).required(),
      text: Joi.string().min(10).required(),
    }
  },
  updateArticle: {
    body: {
      title: Joi.string().min(3).max(24),
      text: Joi.string().min(10),
    },
  },
}
