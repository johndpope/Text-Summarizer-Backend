import HTTPStatus from 'http-status';
import Collection from './collection.model';
import User from '../users/user.model';

export async function createCollection(req, res) {
  try {
    const collection = await Collection.createCollection(req.body, req.user._id);
    if (req.file)
      collection.savePhoto(req.file.path, req.file.mimetype);
    return res.status(HTTPStatus.CREATED).json(collection);
  } catch (e) {
    res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updateCollection(req, res) {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection.user.equals(req.user._id)){
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    Object.keys(req.body).forEach(key => {
      collection[key] = req.body[key];
    });
    if (req.file)
      collection.savePhoto(req.file.path, req.file.mimetype);
    return res.status(HTTPStatus.OK).json(await collection.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getCollectionById(req, res) {
  try {
    const collection = await Collection.findById(req.params.id);
    return res.status(HTTPStatus.OK).json(collection.articles);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function addArticleToCollection(req, res) {
  try {
    const collection = await Collection.findById(req.params.cid);
    await collection._articles.add(req.params.aid);
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
