module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config/constants.js":
/*!*********************************!*\
  !*** ./src/config/constants.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconst devConfig = {\n  MONGO_URL: 'mongodb://localhost:27017/supreme-posts-dev',\n  JWT_SECRET: 'thisIsASecret'\n};\n\nconst testConfig = {\n  MONGO_URL: 'mongodb://localhost:27017/supreme-posts-test'\n};\n\nconst prodConfig = {\n  MONGO_URL: 'mongodb://localhost:27017/supreme-posts-prod'\n};\n\nconst defaultConfig = {\n  PORT: process.env.PORT || 3000,\n  JWT_SECRET: 'thisIsASecret'\n};\n\nfunction envConfig(env) {\n  switch (env) {\n    case 'development':\n      return devConfig;\n    case 'test':\n      return testConfig;\n    default:\n      return prodConfig;\n  }\n}\n\nexports.default = Object.assign({}, defaultConfig, envConfig(\"development\"));\n\n//# sourceURL=webpack:///./src/config/constants.js?");

/***/ }),

/***/ "./src/config/database.js":
/*!********************************!*\
  !*** ./src/config/database.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _constants = __webpack_require__(/*! ./constants */ \"./src/config/constants.js\");\n\nvar _constants2 = _interopRequireDefault(_constants);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n_mongoose2.default.Promise = global.Promise;\n\ntry {\n  _mongoose2.default.connect(_constants2.default.MONGO_URL);\n} catch (err) {\n  _mongoose2.default.createConnection(_constants2.default.MONGO_URL);\n}\n\n_mongoose2.default.connection.once('open', () => console.log('MongodDB Running')).on('error', e => {\n  throw e;\n});\n\n//# sourceURL=webpack:///./src/config/database.js?");

/***/ }),

/***/ "./src/config/middlewares.js":
/*!***********************************!*\
  !*** ./src/config/middlewares.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _morgan = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar _morgan2 = _interopRequireDefault(_morgan);\n\nvar _bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _compression = __webpack_require__(/*! compression */ \"compression\");\n\nvar _compression2 = _interopRequireDefault(_compression);\n\nvar _helmet = __webpack_require__(/*! helmet */ \"helmet\");\n\nvar _helmet2 = _interopRequireDefault(_helmet);\n\nvar _passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst isDev = \"development\" === 'development';\nconst isProd = \"development\" === 'production';\n\nexports.default = app => {\n  if (isProd) {\n    app.use((0, _compression2.default)());\n    app.use((0, _helmet2.default)());\n  }\n  app.use(_bodyParser2.default.json());\n  app.use(_bodyParser2.default.urlencoded({\n    extended: true\n  }));\n  app.use(_passport2.default.initialize());\n  if (isDev) {\n    app.use((0, _morgan2.default)('combined'));\n  }\n};\n\n//# sourceURL=webpack:///./src/config/middlewares.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _constants = __webpack_require__(/*! ./config/constants */ \"./src/config/constants.js\");\n\nvar _constants2 = _interopRequireDefault(_constants);\n\n__webpack_require__(/*! ./config/database */ \"./src/config/database.js\");\n\nvar _middlewares = __webpack_require__(/*! ./config/middlewares */ \"./src/config/middlewares.js\");\n\nvar _middlewares2 = _interopRequireDefault(_middlewares);\n\nvar _modules = __webpack_require__(/*! ./modules */ \"./src/modules/index.js\");\n\nvar _modules2 = _interopRequireDefault(_modules);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst app = (0, _express2.default)();\n(0, _middlewares2.default)(app);\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\n(0, _modules2.default)(app);\n\napp.listen(_constants2.default.PORT, err => {\n  if (err) {\n    throw err;\n  } else {\n    console.log(`\n       Server running on port: ${_constants2.default.PORT}\n       ---\n       Running on: ${\"development\"}\n       ---\n       Make something great\n       `);\n  }\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/modules/articles/article.controllers.js":
/*!*****************************************************!*\
  !*** ./src/modules/articles/article.controllers.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createArticle = createArticle;\nexports.getArticleById = getArticleById;\nexports.getArticlesList = getArticlesList;\nexports.updateArticle = updateArticle;\nexports.deleteArticle = deleteArticle;\nexports.favouriteArticle = favouriteArticle;\nexports.toReadArticle = toReadArticle;\n\nvar _httpStatus = __webpack_require__(/*! http-status */ \"http-status\");\n\nvar _httpStatus2 = _interopRequireDefault(_httpStatus);\n\nvar _user = __webpack_require__(/*! ../users/user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _article = __webpack_require__(/*! ./article.model */ \"./src/modules/articles/article.model.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nasync function createArticle(req, res) {\n  try {\n    const article = await _article2.default.createArticle(req.body, req.user._id);\n    await _article2.default.summarizeText(article, req.body.title, req.body.text);\n    if (req.file) await article.savePhoto(req.file.path, req.file.mimetype);\n    return res.status(_httpStatus2.default.CREATED).json(article);\n  } catch (e) {\n    res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function getArticleById(req, res) {\n  try {\n    const promise = await Promise.all([_user2.default.findById(req.user._id), _article2.default.findById(req.params.id).populate('user')]);\n    const favourite = promise[0]._favourites.isArticleIsFavourite(req.params.id);\n    const article = promise[1];\n    return res.status(_httpStatus2.default.OK).json(Object.assign({}, article.toJSON(), {\n      favourite\n    }));\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function getArticlesList(req, res) {\n  try {\n    const promise = await Promise.all([_user2.default.findById(req.user._id), _article2.default.list({\n      limit: parseInt(req.query.limit, 0),\n      skip: parseInt(req.query.skip, 0)\n    })]);\n    const articles = promise[1].reduce((arr, article) => {\n      const favourite = promise[0]._favourites.isArticleIsFavourite(article._id);\n      arr.push(Object.assign({}, article.toJSON(), {\n        favourite\n      }));\n      return arr;\n    }, []);\n    return res.status(_httpStatus2.default.OK).json(articles);\n  } catch (e) {\n    res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function updateArticle(req, res) {\n  try {\n    const article = await _article2.default.findById(req.params.id);\n    if (!article.user.equals(req.user._id)) {\n      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);\n    }\n    Object.keys(req.body).forEach(key => {\n      article[key] = req.body[key];\n    });\n    if (req.file) await article.savePhoto(req.file.path, req.file.mimetype);\n    return res.status(_httpStatus2.default.OK).json((await article.save()));\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function deleteArticle(req, res) {\n  try {\n    const article = await _article2.default.findById(req.params.id);\n    if (!article.user.equals(req.user._id)) {\n      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);\n    }\n    await article.remove();\n    return res.sendStatus(_httpStatus2.default.OK);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function favouriteArticle(req, res) {\n  try {\n    const user = await _user2.default.findById(req.user._id);\n    await user._favourites.articles(req.params.id);\n    return res.sendStatus(_httpStatus2.default.OK);\n  } catch (e) {\n    res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function toReadArticle(req, res) {\n  try {\n    const user = await _user2.default.findById(req.user._id);\n    await user._toRead.articles(req.params.id);\n    return res.sendStatus(_httpStatus2.default.OK);\n  } catch (e) {\n    res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\n//# sourceURL=webpack:///./src/modules/articles/article.controllers.js?");

/***/ }),

/***/ "./src/modules/articles/article.model.js":
/*!***********************************************!*\
  !*** ./src/modules/articles/article.model.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _slug = __webpack_require__(/*! slug */ \"slug\");\n\nvar _slug2 = _interopRequireDefault(_slug);\n\nvar _mongooseUniqueValidator = __webpack_require__(/*! mongoose-unique-validator */ \"mongoose-unique-validator\");\n\nvar _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);\n\nvar _pythonShell = __webpack_require__(/*! python-shell */ \"python-shell\");\n\nvar _pythonShell2 = _interopRequireDefault(_pythonShell);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst ArticleSchema = new _mongoose.Schema({\n  title: {\n    type: String,\n    trim: true,\n    required: [true, 'Title is required'],\n    minlength: [3, 'Title need to be longer'],\n    maxlength: [24, 'Title need to be shorter'],\n    unique: true\n  },\n  text: {\n    type: String,\n    trim: true,\n    required: [true, 'Text is required'],\n    minlength: [10, 'Text need to be longer']\n  },\n  summary: {\n    type: String,\n    trim: true,\n    minLength: [10, 'Summary need to be longer']\n  },\n  photo: {\n    data: Buffer,\n    contentType: String\n  },\n  slug: {\n    type: String,\n    trim: true,\n    lowercase: true\n  },\n  user: {\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'User'\n  },\n  favouriteCount: {\n    type: Number,\n    default: 0\n  },\n  toReadFlag: {\n    type: Boolean,\n    default: false\n  }\n}, {\n  timestamps: true\n});\n\nArticleSchema.plugin(_mongooseUniqueValidator2.default, {\n  message: '{VALUE} already taken!'\n});\n\nArticleSchema.pre('validate', function (next) {\n  this._slugify();\n  next();\n});\n\nArticleSchema.methods = {\n  _slugify() {\n    this.slug = (0, _slug2.default)(this.title);\n  },\n  toJSON() {\n    return {\n      _id: this._id,\n      title: this.title,\n      text: this.text,\n      summary: this.summary,\n      createdAt: this.createdAt,\n      user: this.user,\n      favoriteCount: this.favoriteCount\n    };\n  },\n  savePhoto(data, type) {\n    this.photo.data = data;\n    this.photo.contentType = type;\n    this.save();\n  }\n};\n\nArticleSchema.statics = {\n  createArticle(args, user) {\n    return this.create(Object.assign({}, args, {\n      user\n    }));\n  },\n  list({\n    skip = 0,\n    limit = 5\n  } = {}) {\n    return this.find().sort({\n      createdAt: -1\n    }).skip(skip).limit(limit).populate('user');\n  },\n  summarizeText(post, title, text) {\n    console.log('inside summarizeText');\n    const shellOptions = {\n      pythonPath: '/usr/bin/python3',\n      pythonOptions: ['-u'],\n      args: [title, text]\n    };\n    const shell = new _pythonShell2.default('/Summarization/Engine/predicter.py', shellOptions);\n    shell.on('message', summary => {\n      console.log(summary);\n      post.summary = summary;\n      post.save();\n    });\n    shell.end((err, code, signal) => {\n      if (err) throw err;\n      console.log('The exit code was: ', code);\n      console.log('The exit signal was: ', signal);\n      console.log('python-shell has finished excuting');\n    });\n  },\n  incFavourite(articleId) {\n    return this.findByIdAndUpdate(articleId, { $inc: { favouriteCount: 1 } });\n  },\n  decFavourite(articleId) {\n    return this.findByIdAndUpdate(articleId, { $inc: { favouriteCount: -1 } });\n  },\n  addToRead(articleId) {\n    return this.findByIdAndUpdate(articleId, { toReadFlag: true });\n  },\n  removeToRead(articleId) {\n    return this.findByIdAndUpdate(articleId, { toReadFlag: false });\n  }\n};\n\nexports.default = _mongoose2.default.model('Article', ArticleSchema);\n\n//# sourceURL=webpack:///./src/modules/articles/article.model.js?");

/***/ }),

/***/ "./src/modules/articles/article.routes.js":
/*!************************************************!*\
  !*** ./src/modules/articles/article.routes.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _expressValidation = __webpack_require__(/*! express-validation */ \"express-validation\");\n\nvar _expressValidation2 = _interopRequireDefault(_expressValidation);\n\nvar _article = __webpack_require__(/*! ./article.validations */ \"./src/modules/articles/article.validations.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nvar _article3 = __webpack_require__(/*! ./article.controllers */ \"./src/modules/articles/article.controllers.js\");\n\nvar articleController = _interopRequireWildcard(_article3);\n\nvar _auth = __webpack_require__(/*! ../../services/auth.services */ \"./src/services/auth.services.js\");\n\nvar _upload = __webpack_require__(/*! ../../services/upload.services */ \"./src/services/upload.services.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst routes = new _express.Router();\n\nroutes.post('/', _auth.authJwt, _upload.mult, (0, _expressValidation2.default)(_article2.default.createArticle), articleController.createArticle);\nroutes.get('/:id', _auth.authJwt, articleController.getArticleById);\nroutes.get('/', _auth.authJwt, articleController.getArticlesList);\nroutes.patch('/:id', _auth.authJwt, _upload.mult, (0, _expressValidation2.default)(_article2.default.updateArticle), articleController.updateArticle);\nroutes.delete('/:id', _auth.authJwt, articleController.deleteArticle);\nroutes.post('/:id/favourite', _auth.authJwt, articleController.favouriteArticle);\nroutes.post('/:id/toread', _auth.authJwt, articleController.toReadArticle);\n\nexports.default = routes;\n\n//# sourceURL=webpack:///./src/modules/articles/article.routes.js?");

/***/ }),

/***/ "./src/modules/articles/article.validations.js":
/*!*****************************************************!*\
  !*** ./src/modules/articles/article.validations.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _joi = __webpack_require__(/*! joi */ \"joi\");\n\nvar _joi2 = _interopRequireDefault(_joi);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = {\n  createArticle: {\n    body: {\n      title: _joi2.default.string().min(3).max(24).required(),\n      text: _joi2.default.string().min(10).required()\n    }\n  },\n  updateArticle: {\n    body: {\n      title: _joi2.default.string().min(3).max(24),\n      text: _joi2.default.string().min(10)\n    }\n  }\n};\n\n//# sourceURL=webpack:///./src/modules/articles/article.validations.js?");

/***/ }),

/***/ "./src/modules/collections/collection.controllers.js":
/*!***********************************************************!*\
  !*** ./src/modules/collections/collection.controllers.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createCollection = createCollection;\nexports.updateCollection = updateCollection;\nexports.getCollectionById = getCollectionById;\nexports.addArticleToCollection = addArticleToCollection;\nexports.deleteCollection = deleteCollection;\nexports.getUserCollections = getUserCollections;\n\nvar _httpStatus = __webpack_require__(/*! http-status */ \"http-status\");\n\nvar _httpStatus2 = _interopRequireDefault(_httpStatus);\n\nvar _collection = __webpack_require__(/*! ./collection.model */ \"./src/modules/collections/collection.model.js\");\n\nvar _collection2 = _interopRequireDefault(_collection);\n\nvar _user = __webpack_require__(/*! ../users/user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nasync function createCollection(req, res) {\n  try {\n    const collection = await _collection2.default.createCollection(req.body, req.user._id);\n    if (req.file) collection.savePhoto(req.file.path, req.file.mimetype);\n    return res.status(_httpStatus2.default.CREATED).json(collection);\n  } catch (e) {\n    res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function updateCollection(req, res) {\n  try {\n    const collection = await _collection2.default.findById(req.params.id);\n    if (!collection.user.equals(req.user._id)) {\n      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);\n    }\n    Object.keys(req.body).forEach(key => {\n      collection[key] = req.body[key];\n    });\n    if (req.file) collection.savePhoto(req.file.path, req.file.mimetype);\n    return res.status(_httpStatus2.default.OK).json((await collection.save()));\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function getCollectionById(req, res) {\n  try {\n    const collection = await _collection2.default.findById(req.params.id).populate('articles').populate('user');\n    return res.status(_httpStatus2.default.OK).json(collection);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function addArticleToCollection(req, res) {\n  try {\n    const collection = await _collection2.default.findById(req.params.cid);\n    await collection._articles.add(req.params.aid);\n    return res.sendStatus(_httpStatus2.default.OK);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function deleteCollection(req, res) {\n  try {\n    const collection = await _collection2.default.findById(req.params.id);\n    if (!collection.user.equals(req.user._id)) {\n      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);\n    }\n    await collection.remove();\n    return res.sendStatus(_httpStatus2.default.OK);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function getUserCollections(req, res) {\n  try {\n    const collections = await _collection2.default.find({ user: req.params.uid }).populate('articles');\n    return res.status(_httpStatus2.default.OK).json(collections);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\n//# sourceURL=webpack:///./src/modules/collections/collection.controllers.js?");

/***/ }),

/***/ "./src/modules/collections/collection.model.js":
/*!*****************************************************!*\
  !*** ./src/modules/collections/collection.model.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _slug = __webpack_require__(/*! slug */ \"slug\");\n\nvar _slug2 = _interopRequireDefault(_slug);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst CollectionSchema = new _mongoose.Schema({\n  title: {\n    type: String,\n    trim: true,\n    required: [true, 'Collection title is requires'],\n    minlength: [3, 'Title need to be longer'],\n    maxlength: [24, 'Title need to be shorter'],\n    unique: true\n  },\n  description: {\n    type: String,\n    trim: true,\n    required: false,\n    minlength: [5, 'Description need to be longer'],\n    maxlength: [48, 'Description need to be shorter']\n  },\n  photo: {\n    data: Buffer,\n    contentType: String\n  },\n  user: {\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'User'\n  },\n  articles: [{\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'Article'\n  }]\n}, {\n  timestamps: true\n});\n\nCollectionSchema.methods = {\n  toJSON() {\n    return {\n      _id: this._id,\n      title: this.title,\n      description: this.description,\n      photo: this.photo,\n      user: this.user,\n      articles: this.articles,\n      createdAt: this.createdAt\n    };\n  },\n  savePhoto(data, type) {\n    this.photo.data = data;\n    this.photo.contentType = type;\n    console.log('saving photo to db');\n    this.save();\n  },\n  _articles: {\n    add(articleId) {\n      if (this.articles.indexOf(articleId) >= 0) {\n        console.log('removing article from collection');\n        this.articles.remove(articleId);\n      } else {\n        console.log('adding article to collection');\n        this.article.push(articleId);\n      }\n      this.save();\n    }\n  }\n};\n\nCollectionSchema.statics = {\n  createCollection(args, user) {\n    return this.create(Object.assign({}, args, {\n      user\n    }));\n  }\n};\n\nexports.default = _mongoose2.default.model('Collection', CollectionSchema);\n\n//# sourceURL=webpack:///./src/modules/collections/collection.model.js?");

/***/ }),

/***/ "./src/modules/collections/collection.routes.js":
/*!******************************************************!*\
  !*** ./src/modules/collections/collection.routes.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _expressValidation = __webpack_require__(/*! express-validation */ \"express-validation\");\n\nvar _expressValidation2 = _interopRequireDefault(_expressValidation);\n\nvar _collection = __webpack_require__(/*! ./collection.validations */ \"./src/modules/collections/collection.validations.js\");\n\nvar _collection2 = _interopRequireDefault(_collection);\n\nvar _collection3 = __webpack_require__(/*! ./collection.controllers */ \"./src/modules/collections/collection.controllers.js\");\n\nvar collectionController = _interopRequireWildcard(_collection3);\n\nvar _auth = __webpack_require__(/*! ../../services/auth.services */ \"./src/services/auth.services.js\");\n\nvar _upload = __webpack_require__(/*! ../../services/upload.services */ \"./src/services/upload.services.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst routes = new _express.Router();\n\nroutes.post('/', _auth.authJwt, _upload.mult, (0, _expressValidation2.default)(_collection2.default.createCollection), collectionController.createCollection);\nroutes.patch('/:id', _auth.authJwt, _upload.mult, (0, _expressValidation2.default)(_collection2.default.updateCollection), collectionController.updateCollection);\nroutes.get('/:id', _auth.authJwt, collectionController.getCollectionById);\nroutes.post('/:cid/:aid', _auth.authJwt, collectionController.addArticleToCollection); // performs the add and delete (if the requested article already exists it got deleted)\nroutes.delete('/:id', _auth.authJwt, collectionController.deleteCollection);\nroutes.get('/user/:uid', _auth.authJwt, collectionController.getUserCollections);\n\nexports.default = routes;\n\n//# sourceURL=webpack:///./src/modules/collections/collection.routes.js?");

/***/ }),

/***/ "./src/modules/collections/collection.validations.js":
/*!***********************************************************!*\
  !*** ./src/modules/collections/collection.validations.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _joi = __webpack_require__(/*! joi */ \"joi\");\n\nvar _joi2 = _interopRequireDefault(_joi);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = {\n  createCollection: {\n    body: {\n      title: _joi2.default.string().min(3).max(24).required(),\n      description: _joi2.default.string().min(10).max(48)\n    }\n  },\n  updateCollection: {\n    body: {\n      title: _joi2.default.string().min(5).max(24),\n      description: _joi2.default.string().min(10).max(48)\n    }\n  }\n};\n\n//# sourceURL=webpack:///./src/modules/collections/collection.validations.js?");

/***/ }),

/***/ "./src/modules/index.js":
/*!******************************!*\
  !*** ./src/modules/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _user = __webpack_require__(/*! ./users/user.routes */ \"./src/modules/users/user.routes.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _article = __webpack_require__(/*! ./articles/article.routes */ \"./src/modules/articles/article.routes.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nvar _collection = __webpack_require__(/*! ./collections/collection.routes */ \"./src/modules/collections/collection.routes.js\");\n\nvar _collection2 = _interopRequireDefault(_collection);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = app => {\n  app.use('/api/v1/users', _user2.default);\n  app.use('/api/v1/articles', _article2.default);\n  app.use('/api/v1/collections', _collection2.default);\n};\n\n//# sourceURL=webpack:///./src/modules/index.js?");

/***/ }),

/***/ "./src/modules/users/user.controllers.js":
/*!***********************************************!*\
  !*** ./src/modules/users/user.controllers.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.signup = signup;\nexports.login = login;\nexports.follow = follow;\nexports.update = update;\n\nvar _httpStatus = __webpack_require__(/*! http-status */ \"http-status\");\n\nvar _httpStatus2 = _interopRequireDefault(_httpStatus);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _user = __webpack_require__(/*! ./user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nasync function signup(req, res) {\n  try {\n    const user = await _user2.default.create(req.body);\n    if (req.file) user.savePhoto(req.file.path, req.file.mimetype);\n    return res.status(_httpStatus2.default.CREATED).json(user.toAuthJSON());\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nfunction login(req, res, next) {\n  res.status(_httpStatus2.default.OK).json(req.user.toAuthJSON());\n  return next();\n}\n\nasync function follow(req, res) {\n  try {\n    const user = await _user2.default.findById(req.user._id);\n    await user._followings.add(req.params.id);\n    await _user2.default.checkFollower(req.params.id, req.user.id);\n    return res.sendStatus(_httpStatus2.default.OK);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function update(req, res) {\n  try {\n    const user = await _user2.default.findById(req.user._id);\n    Object.keys(req.body).forEach(key => {\n      user[key] = req.body[key];\n    });\n    if (req.file) await user.savePhoto(req.file.path, req.file.mimetype);\n    return res.status(_httpStatus2.default.OK).json((await user.save()));\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\n//# sourceURL=webpack:///./src/modules/users/user.controllers.js?");

/***/ }),

/***/ "./src/modules/users/user.model.js":
/*!*****************************************!*\
  !*** ./src/modules/users/user.model.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _validator = __webpack_require__(/*! validator */ \"validator\");\n\nvar _validator2 = _interopRequireDefault(_validator);\n\nvar _bcryptNodejs = __webpack_require__(/*! bcrypt-nodejs */ \"bcrypt-nodejs\");\n\nvar _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nvar _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);\n\nvar _mongooseUniqueValidator = __webpack_require__(/*! mongoose-unique-validator */ \"mongoose-unique-validator\");\n\nvar _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);\n\nvar _constants = __webpack_require__(/*! ../../config/constants */ \"./src/config/constants.js\");\n\nvar _constants2 = _interopRequireDefault(_constants);\n\nvar _article = __webpack_require__(/*! ../articles/article.model */ \"./src/modules/articles/article.model.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst UserSchema = new _mongoose.Schema({\n  email: {\n    type: String,\n    unique: true,\n    required: true,\n    trim: true,\n    validate: {\n      validator(email) {\n        return _validator2.default.isEmail(email);\n      },\n      message: '{VALUE} is not a valid email!'\n    }\n  },\n  firstName: {\n    type: String,\n    required: [true, 'First name is required'],\n    trim: true\n  },\n  lastName: {\n    type: String,\n    required: [true, 'Last name is required'],\n    trim: true\n  },\n  userName: {\n    type: String,\n    required: [true, 'User name is required'],\n    trim: true,\n    unique: true\n  },\n  photo: {\n    data: Buffer,\n    contentType: String\n  },\n  password: {\n    type: String,\n    required: [true, 'Password is required'],\n    trim: true,\n    minlength: [6, 'Password need to be longer']\n  },\n  favourites: {\n    articles: [{\n      type: _mongoose.Schema.Types.ObjectId,\n      ref: 'Article'\n    }]\n  },\n  toRead: {\n    articles: [{\n      type: _mongoose.Schema.Types.ObjectId,\n      ref: 'Article'\n    }]\n  },\n  followings: [{\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'User'\n  }],\n  followers: [{\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'User'\n  }]\n}, {\n  timestamps: true\n});\n\nUserSchema.plugin(_mongooseUniqueValidator2.default, {\n  message: '{VALUE} already taken!'\n});\n\nUserSchema.pre('save', function (next) {\n  if (this.isModified('password')) {\n    this.password = this._hashPassword(this.password);\n  }\n  return next();\n});\n\nUserSchema.methods = {\n  _hashPassword(password) {\n    return (0, _bcryptNodejs.hashSync)(password);\n  },\n  authenticateUser(password) {\n    return (0, _bcryptNodejs.compareSync)(password, this.password);\n  },\n  createToken() {\n    return _jsonwebtoken2.default.sign({\n      _id: this._id\n    }, _constants2.default.JWT_SECRET);\n  },\n  toAuthJSON() {\n    return {\n      _id: this._id,\n      userName: this.userName,\n      token: `JWT ${this.createToken()}`\n    };\n  },\n  toJSON() {\n    return {\n      _id: this._id,\n      userName: this.userName,\n      firstName: this.firstName,\n      lastName: this.lastName,\n      photo: this.photo\n    };\n  },\n  savePhoto(data, type) {\n    this.photo.data = data;\n    this.photo.contentType = type;\n    this.save();\n  },\n  _favourites: {\n    async articles(articleId) {\n      if (this.favourites.articles.indexOf(articleId) >= 0) {\n        this.favourites.articles.remove(articleId);\n        await _article2.default.decFavourite(articleId);\n      } else {\n        this.favourites.articles.push(articleId);\n        await _article2.default.incFavourite(articleId);\n      }\n      return this.save();\n    },\n    isArticleIsFavourite(articleId) {\n      if (this.favourites.articles.indexOf(articleId) >= 0) {\n        return true;\n      }\n      return false;\n    }\n  },\n  _toRead: {\n    async articles(articleId) {\n      if (this.toRead.articles.indexOf(articleId) >= 0) {\n        this.toRead.articles.remove(articleId);\n        await _article2.default.removeToRead(articleId);\n      } else {\n        this.toRead.articles.push(articleId);\n        await _article2.default.addToRead(articleId);\n      }\n      return this.save();\n    }\n  },\n  _followings: {\n    async add(userId) {\n      if (this.followings.indexOf(userId) >= 0) {\n        console.log('removing user from following list');\n        this.followings.remove(userId);\n      } else {\n        console.log('adding new user to following list');\n        this.followings.push(userId);\n      }\n      this.save();\n    }\n  },\n  _followers: {\n    async add(userId) {\n      if (this.followers.indexOf(userId) >= 0) {\n        console.log('removing user from followers list');\n        this.followers.remove(userId);\n      } else {\n        console.log('adding new user to followers list');\n        this.followers.push(userId);\n      }\n      this.save();\n    }\n  }\n};\n\nUserSchema.statics = {\n  async checkFollower(currentId, followerId) {\n    const user = await this.findById(currentId);\n    user._followers.add(followerId);\n  }\n};\n\nexports.default = _mongoose2.default.model('User', UserSchema);\n\n//# sourceURL=webpack:///./src/modules/users/user.model.js?");

/***/ }),

/***/ "./src/modules/users/user.routes.js":
/*!******************************************!*\
  !*** ./src/modules/users/user.routes.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _auth = __webpack_require__(/*! ../../services/auth.services */ \"./src/services/auth.services.js\");\n\nvar _upload = __webpack_require__(/*! ../../services/upload.services */ \"./src/services/upload.services.js\");\n\nvar _user = __webpack_require__(/*! ./user.controllers */ \"./src/modules/users/user.controllers.js\");\n\nvar userController = _interopRequireWildcard(_user);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst routes = new _express.Router();\n\nroutes.post('/signup', _upload.mult, userController.signup);\nroutes.post('/login', _auth.authLocal, userController.login);\nroutes.post('/:id/follow', _auth.authJwt, userController.follow);\nroutes.patch('/update', _auth.authJwt, _upload.mult, userController.update);\n\nexports.default = routes;\n\n//# sourceURL=webpack:///./src/modules/users/user.routes.js?");

/***/ }),

/***/ "./src/services/auth.services.js":
/*!***************************************!*\
  !*** ./src/services/auth.services.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.authJwt = exports.authLocal = undefined;\n\nvar _passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _passportLocal = __webpack_require__(/*! passport-local */ \"passport-local\");\n\nvar _passportLocal2 = _interopRequireDefault(_passportLocal);\n\nvar _passportJwt = __webpack_require__(/*! passport-jwt */ \"passport-jwt\");\n\nvar _user = __webpack_require__(/*! ../modules/users/user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _constants = __webpack_require__(/*! ../config/constants */ \"./src/config/constants.js\");\n\nvar _constants2 = _interopRequireDefault(_constants);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Local strategy\nconst localOpts = {\n  usernameField: 'email'\n};\n\nconst localStrategy = new _passportLocal2.default(localOpts, async (email, password, done) => {\n  try {\n    const user = await _user2.default.findOne({ email });\n    if (!user) {\n      return done(null, false);\n    } else if (!user.authenticateUser(password)) {\n      return done(null, false);\n    }\n\n    return done(null, user);\n  } catch (e) {\n    return done(e, false);\n  }\n});\n\n// Jwt strategy\nconst jwtOpts = {\n  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),\n  secretOrKey: _constants2.default.JWT_SECRET\n};\n\nconst jwtStrategy = new _passportJwt.Strategy(jwtOpts, async (payload, done) => {\n  try {\n    const user = await _user2.default.findById(payload._id);\n\n    if (!user) {\n      return done(null, false);\n    }\n\n    return done(null, user);\n  } catch (e) {\n    return done(e, false);\n  }\n});\n\n_passport2.default.use(localStrategy);\n_passport2.default.use(jwtStrategy);\n\nconst authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });\nconst authJwt = exports.authJwt = _passport2.default.authenticate('jwt', { session: false });\n\n//# sourceURL=webpack:///./src/services/auth.services.js?");

/***/ }),

/***/ "./src/services/upload.services.js":
/*!*****************************************!*\
  !*** ./src/services/upload.services.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.mult = undefined;\n\nvar _multer = __webpack_require__(/*! multer */ \"multer\");\n\nvar _multer2 = _interopRequireDefault(_multer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst multerConfig = {\n  storage: _multer2.default.diskStorage({\n    destination: (req, file, next) => {\n      next(null, 'src/modules/uploads/profile-photos');\n    },\n\n    filename: (req, file, next) => {\n      console.log(file);\n      const ext = file.mimetype.split('/')[1];\n      next(null, file.fieldname + '-' + Date.now() + '.' + ext);\n    }\n  }),\n\n  // filter out and prevent non-image files.\n  fileFilter: (req, file, next) => {\n    if (!file) {\n      next();\n    }\n\n    // only permit image mimetypes\n    const image = file.mimetype.startsWith('image/');\n    if (image) {\n      console.log('photo uploaded');\n      next(null, true);\n    } else {\n      console.log(\"file not supported\");\n      //TODO:  A better message response to user on failure.\n      return next();\n    }\n  }\n};\n\nconst mult = exports.mult = (0, _multer2.default)(multerConfig).single('photo');\n\n//# sourceURL=webpack:///./src/services/upload.services.js?");

/***/ }),

/***/ "bcrypt-nodejs":
/*!********************************!*\
  !*** external "bcrypt-nodejs" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt-nodejs\");\n\n//# sourceURL=webpack:///external_%22bcrypt-nodejs%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-validation":
/*!*************************************!*\
  !*** external "express-validation" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-validation\");\n\n//# sourceURL=webpack:///external_%22express-validation%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "http-status":
/*!******************************!*\
  !*** external "http-status" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http-status\");\n\n//# sourceURL=webpack:///external_%22http-status%22?");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"joi\");\n\n//# sourceURL=webpack:///external_%22joi%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "mongoose-unique-validator":
/*!********************************************!*\
  !*** external "mongoose-unique-validator" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose-unique-validator\");\n\n//# sourceURL=webpack:///external_%22mongoose-unique-validator%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-jwt\");\n\n//# sourceURL=webpack:///external_%22passport-jwt%22?");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "python-shell":
/*!*******************************!*\
  !*** external "python-shell" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"python-shell\");\n\n//# sourceURL=webpack:///external_%22python-shell%22?");

/***/ }),

/***/ "slug":
/*!***********************!*\
  !*** external "slug" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"slug\");\n\n//# sourceURL=webpack:///external_%22slug%22?");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"validator\");\n\n//# sourceURL=webpack:///external_%22validator%22?");

/***/ })

/******/ });