import mongoose, {
  Schema
} from 'mongoose';
import slug from 'slug'
import uniqueValidator from 'mongoose-unique-validator';
import PythonShell from 'python-shell';

const ArticleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required'],
    minlength: [3, 'Title need to be longer'],
    unique: true,
  },
  text: {
    type: String,
    trim: true,
    required: [true, 'Text is required'],
    minlength: [10, 'Text need to be longer']
  },
  summary: {
    type: String,
    trim: true,
    minLength: [10, 'Summary need to be longer'],
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  favoriteCount: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
});

ArticleSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

ArticleSchema.pre('validate', function (next) {
  this._slugify();

  next();
});

ArticleSchema.methods = {
  _slugify() {
    this.slug = slug(this.title);
  },
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      text: this.text,
      summary: this.summary,
      createdAt: this.createdAt,
      slug: this.slug,
      user: this.user,
      favoriteCount: this.favoriteCount,
    };
  },
};

ArticleSchema.statics = {
  createArticle(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
  list({
    skip = 0,
    limit = 5
  } = {}) {
    return this.find()
      .sort({
        createdAt: -1
      })
      .skip(skip)
      .limit(limit)
      .populate('user');
  },
  summarizeText(post, title, text) {
    console.log('inside summarizeText')
    const shellOptions = {
      pythonPath: '/usr/bin/python3',
      pythonOptions: ['-u'],
      args: [title, text],
    };
    const shell = new PythonShell(
      '/Summarization/Engine/predicter.py',
      shellOptions,
    );
    shell.on('message', summary => {
      console.log(summary);
      post.summary = summary;
      post.save();
    });
    shell.end((err, code, signal) => {
      if (err) throw err;
      console.log('The exit code was: ', code);
      console.log('The exit signal was: ', signal);
      console.log('python-shell has finished excuting');
    });
  },
};

export default mongoose.model('Article', ArticleSchema);
