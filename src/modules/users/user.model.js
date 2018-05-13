import mongoose, {
  Schema
} from 'mongoose';
import validator from 'validator';
import {
  hashSync,
  compareSync
} from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import constants from '../../config/constants';
import Article from '../articles/article.model';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
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
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    minlength: [6, 'Password need to be longer'],
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
      token: `JWT ${this.createToken()}`,
    };
  },
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
    };
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
};

export default mongoose.model('User', UserSchema);
