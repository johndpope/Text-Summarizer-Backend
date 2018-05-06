import Article from './article.model';
import HttpStatus from 'http-status';

export async function createArticle(req, res) {
  try {
    const article = await Article.createArticle(req.body, req.user._id);
    return res.status(HttpStatus.CREATED).json(article);
  } catch (e) {
    return res.status(HttpStatus.BAD_REQUEST).json(e);
  }
}

export async function getArticleById(req, res) {
  try {
    const article = await Article.findById(req.params.id).populate('user');
    return res.status(HTTPStatus.OK).json(article);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}