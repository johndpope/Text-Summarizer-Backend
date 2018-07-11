import HTTPStatus from 'http-status';
import Collection from './collection.model';
import User from '../users/user.model';
import { minioClient } from '../../services/minio.services'


export async function createCollection(req, res) {
  try {
    const collection = await Collection.createCollection(req.body, req.user._id);
    if (req.file)
      //TODO make sure that the original file name is unique
      await collection.savePhoto(req.file);
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
      //TODO make sure that the original file name is unique
      await collection.savePhoto(req.file);
    return res.status(HTTPStatus.OK).json(await collection.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getCollectionById(req, res, next) {
  try {
    const collection = await Collection.findById(req.params.id).populate('articles').populate('user');
    if (collection.photo){
      var size = 0
      var data = ""
      minioClient.getObject('mybucket', collection.photo, (err, dataStream) => {
        if (err) {
          return console.log(err)
        }
        dataStream.on('data', (chunk) => {
          size += chunk.length
          data += chunk
        })
        dataStream.on('end', () => {
          console.log('End. Total size = ' + size)
          collection.photo = data
          res.status(HTTPStatus.OK).json(collection);
          return next();
        })
      });
    } else {
      res.status(HTTPStatus.OK).json(collection);
      return next();
    }
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function addArticleToCollection(req, res) {
  try {
    const collection = await Collection.findById(req.params.cid);
    console.log(collection)
    await collection._articles.add(req.params.aid);
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deleteCollection(req, res) {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    await collection.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getUserCollections(req, res) {
  try {
      const collections = await Collection.find({user: req.params.uid}).populate('articles').populate('user');

    return res.status(HTTPStatus.OK).json({data : collections});
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
