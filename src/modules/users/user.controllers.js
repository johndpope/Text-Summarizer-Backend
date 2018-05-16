import HTTPStatus from 'http-status';
import fs from 'fs';
import User from './user.model';


export async function signup(req, res) {
  try {
    const user = await User.create(req.body);
    if (req.file)
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

export async function follow(req, res){
  try {
    const user = await User.findById(req.user._id);
    await user._followings.add(req.params.id);
    await User.checkFollower(req.params.id, req.user.id)
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
