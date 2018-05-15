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
