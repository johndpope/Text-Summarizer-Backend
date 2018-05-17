import HTTPStatus from 'http-status';
import fs from 'fs';
import User from './user.model';
import { minioClient } from '../../services/minio.services';


export async function signup(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export function login(req, res, next) {
  try {
    const user = req.user.toAuthJSON();
    if (user.photo){
      var size = 0
      var data = ""
      minioClient.getObject('europetrip', user.photo, (err, dataStream) => {
        if (err) {
          return console.log(err)
        }
        dataStream.on('data', (chunk) => {
          size += chunk.length
          data += chunk
        })
        dataStream.on('end', () => {
          console.log('End. Total size = ' + size)
          user.photo = data
          res.status(HTTPStatus.OK).json(user);
          return next();
        })
      });
    } else {
      res.status(HTTPStatus.OK).json(user);
      return next();
    }
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function follow(req, res) {
  try {
    const user = await User.findById(req.user._id);
    await user._followings.add(req.params.id);
    await User.checkFollower(req.params.id, req.user.id)
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function update(req, res) {
  try {
    const user = await User.findById(req.user._id);
    Object.keys(req.body).forEach(key => {
      user[key] = req.body[key];
    });
    if (req.file)
      //TODO make sure that the original file name is unique
      await user.savePhoto(req.file);
    return res.status(HTTPStatus.OK).json(await user.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
