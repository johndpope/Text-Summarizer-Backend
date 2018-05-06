import Article from './article.model';
import HTTPStatus from 'http-status';

export async function createArticle(req, res) {
  try {
    const article = await Article.createArticle(req.body, req.user._id);
    return res.status(HTTPStatus.CREATED).json(article);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
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

export async function getArticlesList(req, res) {
  const limit = parseInt(req.query.limit, 0);
  const skip = parseInt(req.query.skip, 0);
  try {
    const articles = await Article.list({
      limit,
      skip
    });
    return res.status(HTTPStatus.OK).json(articles);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updateArticle(req, res) {
  try {
    const article = await Article.findById(req.params.id);

    if (!article.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    Object.keys(req.body).forEach(key => {
      article[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await article.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deleteArticle(req, res) {
  try {
    const article = await Article.findById(req.params.id);

    if (!article.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    await article.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}