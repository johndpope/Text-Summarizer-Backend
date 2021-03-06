import HTTPStatus from 'http-status';
import fs from 'fs';
import User from './user.model';
import Article from '../articles/article.model';
import {
  minioClient
} from '../../services/minio.services';

export async function signup(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

// update
function upsertUser(profile, res) {
  return User.findOne({
      'twitter.id': profile.id,
    },
    (err, user) => {
      if (!user) {
        const twitterInfo = {
          id: profile.id,
          fullName: profile.displayName,
          screenName: profile.username,
        };

        var newUser = new User({
          userName: twitterInfo.screenName,
          photo: profile.photos[0].value,
          twitter: twitterInfo,
        });

        newUser.save((error, savedUser) => {
          if (error) {
            return res.status(HTTPStatus.BAD_REQUEST);
          }
          return res.status(HTTPStatus.OK).json(savedUser.toAuthJSON());
        });
      } else {
        return res.status(HTTPStatus.OK).json(user.toAuthJSON());
      }
    },
  );
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
    if (user.photo) {
      var size = 0;
      var data = '';
      minioClient.getObject('mybucket', user.photo, (err, dataStream) => {
        if (err) {
          return console.log(err);
        }
        dataStream.on('data', chunk => {
          size += chunk.length;
          data += chunk;
        });
        dataStream.on('end', () => {
          console.log('End. Total size = ' + size);
          user.photo = data;
          res.status(HTTPStatus.OK).json(user);
          return next();
        });
      });
    } else {
      res.status(HTTPStatus.OK).json(user.toAuthJSON());
      return next();
    }
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function follow(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (req.user._id.equals(req.params.id)) {
      return res.sendStatus(HTTPStatus.BAD_REQUEST);
    }
    await user._followings.add(req.params.id);
    await User.checkFollower(req.params.id, req.user.id);
    var isUserFollowed = await User.isFollowed(req.params.id, req.user.id);
    return res.status(HTTPStatus.OK).json({
      isFollowed: isUserFollowed,
    });
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
    if (req.file) {
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
    if (!user) {
      return res.status(HTTPStatus.BAD_REQUEST).json({
        message: 'User not found!',
      });
    }
    return res.status(HTTPStatus.OK).json(user.toJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getFollowers(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(HTTPStatus.BAD_REQUEST).json({
        message: 'User not found!',
      });
    }
    User.find({
        _id: {
          $in: user.followers,
        },
      },
      (err, followers) => {
        return res.status(HTTPStatus.OK).json({
          data: followers,
        });
      },
    );
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getFollowing(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(HTTPStatus.BAD_REQUEST).json({
        message: 'User not found!',
      });
    }
    User.find({
        _id: {
          $in: user.followings,
        },
      },
      (err, followings) => {
        return res.status(HTTPStatus.OK).json({
          data: followings,
        });
      },
    );
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getUserArticles(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(HTTPStatus.BAD_REQUEST).json({
        message: 'User not found!',
      });
    }
    Article.find({
        user: {
          $in: user.id,
        },
      },
      (err, userArticles) => {
        return res.status(HTTPStatus.OK).json({
          data: userArticles,
        });
      },
    ).populate('user');
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getFavouritesList(req, res) {
  try {
    User.findById(req.params.id, (err, user) => {
      Article.find({
          _id: {
            $in: user.favourites.articles,
          },
        },
        (err, favs) => {
          return res.status(HTTPStatus.OK).json({
            data: favs,
          });
        },
      ).populate('user');
    });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export function getToreadsList(req, res, next) {
  try {
    User.findById(req.params.id, (err, user) => {
      Article.find({
          _id: {
            $in: user.toRead.articles,
          },
        },
        (err, toreads) => {
          return res.status(HTTPStatus.OK).json(toreads);
        },
      );
    });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}