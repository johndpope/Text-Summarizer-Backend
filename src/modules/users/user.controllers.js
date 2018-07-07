import HTTPStatus from 'http-status';
import fs from 'fs';
import User from './user.model';
import Article from '../articles/article.model';
import { minioClient } from '../../services/minio.services';


export async function signup(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

function upsertUser(profile, res){
    return User
      .findOne({'twitter.id': profile.id }, (err, user) => {
      if (!user) {
        const twitterInfo = {
          id: profile.id,
          fullName: profile.displayName,
          screenName: profile.username,
        };

        var newUser = new User({
          userName: twitterInfo.screenName,
          photo: profile.photos[0].value,
          twitter: twitterInfo
        });

        newUser.save( (error, savedUser) => {
          if (error) {
            return res.status(HTTPStatus.BAD_REQUEST)
          }
          return res.status(HTTPStatus.OK).json(savedUser.toAuthJSON());
        });
      } else {
        return res.status(HTTPStatus.OK).json(user.toAuthJSON());
      }
    });
}

export async function twitterSignup(req, res) {
  try {
    upsertUser(req.user, res);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export function login(req, res, next) {
  try {
    const user = req.user;
    Article.find({ '_id': { $in: user.favourites.articles }}, (err, objs)=> {
      user.favourites.articles = objs;
      Article.find({ '_id': { $in: user.toRead.articles}}, (err, toreads) => {
        user.toRead.articles = toreads;
        if (user.photo){
          var size = 0
          var data = ""
          minioClient.getObject('mybucket', user.photo, (err, dataStream) => {
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
          res.status(HTTPStatus.OK).json(user.toAuthJSON());
          return next();
        }
      })
    });

  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function follow(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if(req.user._id.equals(req.params.id)){
      return res.sendStatus(HTTPStatus.BAD_REQUEST);
    }
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
    if (req.file){
      //TODO make sure that the original file name is unique
      await user.savePhoto(req.file);
      return res.status(HTTPStatus.OK).json(user);
    }
    return res.status(HTTPStatus.OK).json(await user.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function findUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if(!user) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ message: 'User not found!'});
    }
    return res.status(HTTPStatus.OK).json(user.toJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).josn(e);
  }
}
