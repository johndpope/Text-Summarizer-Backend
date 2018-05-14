import HTTPStatus from 'http-status';
import fs from 'fs';
import User from './user.model';

export async function signup(req, res) {
  try {
    const user = await User.create(req.body);
    user.savePhoto(req.file.path, req.file.mimetype);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export function login(req, res, next) {
  res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
  return next();
}
