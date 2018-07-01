import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import { minioClient } from '../../services/minio.services';
import constants from '../../config/constants';
import Article from '../articles/article.model';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email!',
    },
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    unique: true,
  },
  photo: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: [6, 'Password need to be longer'],
  },
  twitter: {
    id: String,
    fullName: String,
    screenName: String,
  },
  favourites: {
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
  },
  toRead: {
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
  },
  followings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
}, {
  timestamps: true
});


UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign({
        _id: this._id,
      },
      constants.JWT_SECRET)
  },
  toAuthJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      photo: this.photo,
      twitter: this.twitter,
      token: `JWT ${this.createToken()}`,
    };
  },
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
      favourites: this.favourites,
      toRead: this.toRead,
      followings: this.followings,
      followers: this.followers,
      photo: this.photo
    };
  },
  savePhoto(photo){
     minioClient.putObject('mybucket', photo.originalname, photo.buffer, "application/octet-stream", function(error, etag) {
        if(error) {
            return console.log(error);
        }
        console.log('File uploaded successfully.');
    });
    this.photo = photo.originalname;
    this.save();
  },
  _favourites: {
    async articles(articleId) {
      if (this.favourites.articles.indexOf(articleId) >= 0) {
        this.favourites.articles.remove(articleId);
        await Article.decFavourite(articleId);
      } else {
        this.favourites.articles.push(articleId);
        await Article.incFavourite(articleId);
      }
      return this.save();
    },
    isArticleIsFavourite(articleId) {
      if (this.favourites.articles.indexOf(articleId) >= 0) {
        return true;
      }
      return false;
    },
  },
  _toRead: {
    async articles(articleId) {
      if (this.toRead.articles.indexOf(articleId) >= 0) {
        this.toRead.articles.remove(articleId);
        await Article.removeToRead(articleId);
      } else {
        this.toRead.articles.push(articleId);
        await Article.addToRead(articleId);
      }
      return this.save();
    },
  },
  _followings: {
    async add(userId) {
      if (this.followings.indexOf(userId) >= 0 ){
        console.log('removing user from following list');
        this.followings.remove(userId);
      } else {
        console.log('adding new user to following list');
        this.followings.push(userId);
      }
      this.save();
    }
  },
  _followers: {
    async add(userId) {
      if (this.followers.indexOf(userId) >= 0 ){
        console.log('removing user from followers list');
        this.followers.remove(userId);
      } else {
        console.log('adding new user to followers list');
        this.followers.push(userId);
      }
      this.save();
    }
  }
};

UserSchema.statics = {
  async checkFollower(currentId, followerId){
    const user = await this.findById(currentId);
    user._followers.add(followerId)
  }
}

export default mongoose.model('User', UserSchema);
