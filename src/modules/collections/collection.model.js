import mongoose, { Schema } from 'mongoose';
import slug from 'slug';
import { minioClient } from '../../services/minio.services';

const CollectionSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Collection title is requires'],
    minlength: [3, 'Title need to be longer'],
    maxlength: [24, 'Title need to be shorter'],
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    required: false,
    minlength: [5, 'Description need to be longer'],
    maxlength: [48, 'Description need to be shorter'],
  },
  photo: {
    type: String,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Article',
    }
  ]
}, {
  timestamps: true
});

CollectionSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      description: this.description,
      photo: this.photo,
      user: this.user,
      articles: this.articles,
      createdAt: this.createdAt,
    }
  },
  savePhoto(photo){
    minioClient.putObject('europetrip', photo.originalname, photo.buffer, "application/octet-stream", function(error, etag) {
       if(error) {
           return console.log(error);
       }
       console.log('File uploaded successfully.')
   });
   this.photo = photo.originalname
   this.save()
  },
  _articles: {
    add(articleId){
      if (this.articles.indexOf(articleId) >= 0){
        console.log('removing article from collection');
        this.articles.remove(articleId);
      } else {
        console.log('adding article to collection');
        this.articles.push(articleId);
      }
      this.save();
    }
  }
}

CollectionSchema.statics = {
  createCollection(args, user){
    return this.create({
      ...args,
      user,
    });
  }
}

export default mongoose.model('Collection', CollectionSchema);
