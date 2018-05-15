import Joi from 'joi';

export default {
  createCollection: {
    body: {
      title: Joi.string().min(3).max(24).required(),
      description: Joi.string().min(10).max(48),
    }
  },
  updateCollection: {
    body: {
      title: Joi.string().min(5).max(24).required(),
      description: Joi.string().min(10).max(48),
    }
  }
}
