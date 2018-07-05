module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
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
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/app_test.js");
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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconst devConfig = {\n  MONGO_URL: 'mongodb://localhost:27017/supreme-posts-dev',\n  JWT_SECRET: 'thisIsASecret'\n};\n\nconst testConfig = {\n  MONGO_URL: 'mongodb://localhost:27017/supreme-posts-test'\n};\n\nconst prodConfig = {\n  MONGO_URL: 'mongodb://admin:admin@ds251518.mlab.com:51518/likerss'\n};\n\nconst defaultConfig = {\n  PORT: process.env.PORT || 3000,\n  JWT_SECRET: 'thisIsASecret'\n};\n\nfunction envConfig(env) {\n  switch (env) {\n    case 'development':\n      return devConfig;\n    case 'test':\n      return testConfig;\n    default:\n      return prodConfig;\n  }\n}\n\nexports.default = Object.assign({}, defaultConfig, envConfig(\"development\"));\n\n//# sourceURL=webpack:///./src/config/constants.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _morgan = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar _morgan2 = _interopRequireDefault(_morgan);\n\nvar _bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _compression = __webpack_require__(/*! compression */ \"compression\");\n\nvar _compression2 = _interopRequireDefault(_compression);\n\nvar _helmet = __webpack_require__(/*! helmet */ \"helmet\");\n\nvar _helmet2 = _interopRequireDefault(_helmet);\n\nvar _passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst isDev = \"development\" === 'development';\nconst isProd = \"development\" === 'production';\nconst isTest = \"development\" === 'test';\n\nexports.default = app => {\n  if (isProd) {\n    app.use((0, _compression2.default)());\n    app.use((0, _helmet2.default)());\n  }\n  app.use(_bodyParser2.default.json());\n  app.use(_bodyParser2.default.urlencoded({\n    extended: true\n  }));\n  app.use(_passport2.default.initialize());\n  if (isDev || isTest) {\n    app.use((0, _morgan2.default)('combined'));\n  }\n};\n\n//# sourceURL=webpack:///./src/config/middlewares.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _constants = __webpack_require__(/*! ./config/constants */ \"./src/config/constants.js\");\n\nvar _constants2 = _interopRequireDefault(_constants);\n\n__webpack_require__(/*! ./config/database */ \"./src/config/database.js\");\n\nvar _middlewares = __webpack_require__(/*! ./config/middlewares */ \"./src/config/middlewares.js\");\n\nvar _middlewares2 = _interopRequireDefault(_middlewares);\n\nvar _modules = __webpack_require__(/*! ./modules */ \"./src/modules/index.js\");\n\nvar _modules2 = _interopRequireDefault(_modules);\n\nvar _expressSession = __webpack_require__(/*! express-session */ \"express-session\");\n\nvar _expressSession2 = _interopRequireDefault(_expressSession);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst app = (0, _express2.default)();\napp.use((0, _expressSession2.default)({ secret: 'this is my secret session' }));\n(0, _middlewares2.default)(app);\n\napp.get('/', (req, res) => {\n  res.status(200).send('Hello World!');\n});\n\n(0, _modules2.default)(app);\n\napp.listen(_constants2.default.PORT, err => {\n  if (err) {\n    throw err;\n  } else {\n    console.log(`\n       Server running on port: ${_constants2.default.PORT}\n       ---\n       Running on: ${\"development\"}\n       ---\n       Make something great\n       `);\n  }\n});\n\nmodule.exports = app;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/modules/articles/article.controllers.js":
/*!*****************************************************!*\
  !*** ./src/modules/articles/article.controllers.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createArticle = createArticle;\nexports.getArticleById = getArticleById;\nexports.getArticlesList = getArticlesList;\nexports.updateArticle = updateArticle;\nexports.deleteArticle = deleteArticle;\nexports.favouriteArticle = favouriteArticle;\nexports.toReadArticle = toReadArticle;\n\nvar _httpStatus = __webpack_require__(/*! http-status */ \"http-status\");\n\nvar _httpStatus2 = _interopRequireDefault(_httpStatus);\n\nvar _minio = __webpack_require__(/*! ../../services/minio.services */ \"./src/services/minio.services.js\");\n\nvar _user = __webpack_require__(/*! ../users/user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _article = __webpack_require__(/*! ./article.model */ \"./src/modules/articles/article.model.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nasync function createArticle(req, res) {\n  console.log('inside the controller');\n  try {\n    const article = await _article2.default.createArticle(req.body, req.user._id);\n    await _article2.default.summarizeText(article, req.body.title, req.body.text);\n    if (req.file) await article.savePhoto(req.file);\n    return res.status(_httpStatus2.default.CREATED).json(article);\n  } catch (e) {\n    res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function getArticleById(req, res) {\n  try {\n    const promise = await Promise.all([_user2.default.findById(req.user._id), _article2.default.findById(req.params.id).populate('user')]);\n    const favourite = promise[0]._favourites.isArticleIsFavourite(req.params.id);\n    const article = promise[1];\n    if (req.file) {\n      var size = 0;\n      var data = \"\";\n      _minio.minioClient.getObject('mybucket', article.photo, (err, dataStream) => {\n        if (err) {\n          return console.log(err);\n        }\n        dataStream.on('data', chunk => {\n          size += chunk.length;\n          data += chunk;\n        });\n        dataStream.on('end', () => {\n          console.log('End. Total size = ' + size);\n          article.photo = data;\n          return res.status(_httpStatus2.default.OK).json(Object.assign({}, article.toJSON(), {\n            favourite\n          }));\n        });\n      });\n    }\n    return res.status(_httpStatus2.default.OK).json(Object.assign({}, article.toJSON(), {\n      favourite\n    }));\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function getArticlesList(req, res) {\n  try {\n    const promise = await Promise.all([_user2.default.findById(req.user._id), _article2.default.list({\n      limit: parseInt(req.query.limit, 0),\n      skip: parseInt(req.query.skip, 0)\n    })]);\n\n    const articles = promise[1].reduce((arr, article) => {\n      const favourite = promise[0]._favourites.isArticleIsFavourite(article._id);\n      /*\n            var size = 0\n            var data = \"\"\n            minioClient.getObject('europetrip', article.photo, (err, dataStream) => {\n              if (err) {\n                return console.log(err)\n              }\n              dataStream.on('data', (chunk) => {\n                size += chunk.length\n                data += chunk\n              })\n              dataStream.on('end', () => {\n                console.log('End. Total size = ' + size)\n                article.photo = data\n              })\n            });\n      */\n      arr.push(Object.assign({}, article.toJSON(), {\n        favourite\n      }));\n\n      return arr;\n    }, []);\n\n    return res.status(_httpStatus2.default.OK).json(articles);\n  } catch (e) {\n    res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function updateArticle(req, res) {\n  try {\n    const article = await _article2.default.findById(req.params.id);\n    if (!article.user.equals(req.user._id)) {\n      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);\n    }\n    Object.keys(req.body).forEach(key => {\n      article[key] = req.body[key];\n    });\n    if (req.file) {\n      //TODO make sure that the original file name is unique\n      await article.savePhoto(req.file);\n      return res.status(_httpStatus2.default.OK).json(article);\n    }\n    return res.status(_httpStatus2.default.OK).json((await article.save()));\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function deleteArticle(req, res) {\n  try {\n    const article = await _article2.default.findById(req.params.id);\n    if (!article.user.equals(req.user._id)) {\n      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);\n    }\n    await article.remove();\n    return res.sendStatus(_httpStatus2.default.OK);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function favouriteArticle(req, res) {\n  try {\n    const user = await _user2.default.findById(req.user._id);\n    await user._favourites.articles(req.params.id);\n    return res.sendStatus(_httpStatus2.default.OK);\n  } catch (e) {\n    res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function toReadArticle(req, res) {\n  try {\n    const user = await _user2.default.findById(req.user._id);\n    await user._toRead.articles(req.params.id);\n    return res.sendStatus(_httpStatus2.default.OK);\n  } catch (e) {\n    res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\n//# sourceURL=webpack:///./src/modules/articles/article.controllers.js?");

/***/ }),

/***/ "./src/modules/articles/article.model.js":
/*!***********************************************!*\
  !*** ./src/modules/articles/article.model.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _slug = __webpack_require__(/*! slug */ \"slug\");\n\nvar _slug2 = _interopRequireDefault(_slug);\n\nvar _mongooseUniqueValidator = __webpack_require__(/*! mongoose-unique-validator */ \"mongoose-unique-validator\");\n\nvar _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);\n\nvar _pythonShell = __webpack_require__(/*! python-shell */ \"python-shell\");\n\nvar _pythonShell2 = _interopRequireDefault(_pythonShell);\n\nvar _minio = __webpack_require__(/*! ../../services/minio.services */ \"./src/services/minio.services.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst ArticleSchema = new _mongoose.Schema({\n  title: {\n    type: String,\n    trim: true,\n    required: [true, 'Title is required'],\n    minlength: [3, 'Title need to be longer'],\n    maxlength: [24, 'Title need to be shorter'],\n    unique: true\n  },\n  text: {\n    type: String,\n    trim: true,\n    required: [true, 'Text is required'],\n    minlength: [10, 'Text need to be longer']\n  },\n  summary: {\n    type: String,\n    trim: true,\n    minLength: [10, 'Summary need to be longer']\n  },\n  photo: {\n    type: String,\n    trim: true\n  },\n  slug: {\n    type: String,\n    trim: true,\n    lowercase: true\n  },\n  user: {\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'User'\n  },\n  favouriteCount: {\n    type: Number,\n    default: 0\n  },\n  toReadFlag: {\n    type: Boolean,\n    default: false\n  }\n}, {\n  timestamps: true\n});\n\nArticleSchema.plugin(_mongooseUniqueValidator2.default, {\n  message: '{VALUE} already taken!'\n});\n\nArticleSchema.pre('validate', function (next) {\n  this._slugify();\n  next();\n});\n\nArticleSchema.methods = {\n  _slugify() {\n    this.slug = (0, _slug2.default)(this.title);\n  },\n  toJSON() {\n    return {\n      _id: this._id,\n      title: this.title,\n      text: this.text,\n      summary: this.summary,\n      createdAt: this.createdAt,\n      user: this.user,\n      favoriteCount: this.favoriteCount,\n      photo: this.photo\n    };\n  },\n  savePhoto(photo) {\n    _minio.minioClient.putObject('mybucket', photo.originalname, photo.buffer, \"application/octet-stream\", function (error, etag) {\n      if (error) {\n        return console.log(error);\n      }\n      console.log('File uploaded successfully.');\n    });\n    this.photo = photo.originalname;\n    this.save();\n  }\n};\n\nArticleSchema.statics = {\n  createArticle(args, user) {\n    return this.create(Object.assign({}, args, {\n      user\n    }));\n  },\n  list({\n    skip = 0,\n    limit = 5\n  } = {}) {\n    return this.find().sort({\n      createdAt: -1\n    }).skip(skip).limit(limit).populate('user');\n  },\n  summarizeText(post, title, text) {\n    console.log('inside summarizeText');\n    const shellOptions = {\n      pythonPath: '/usr/bin/python3',\n      pythonOptions: ['-u'],\n      args: [title, text]\n    };\n    const shell = new _pythonShell2.default('/Summarization/Engine/predicter.py', shellOptions);\n    shell.on('message', summary => {\n      console.log(summary);\n      post.summary = summary;\n      post.save();\n    });\n    shell.end((err, code, signal) => {\n      if (err) throw err;\n      console.log('The exit code was: ', code);\n      console.log('The exit signal was: ', signal);\n      console.log('python-shell has finished excuting');\n    });\n  },\n  incFavourite(articleId) {\n    return this.findByIdAndUpdate(articleId, { $inc: { favouriteCount: 1 } });\n  },\n  decFavourite(articleId) {\n    return this.findByIdAndUpdate(articleId, { $inc: { favouriteCount: -1 } });\n  },\n  addToRead(articleId) {\n    return this.findByIdAndUpdate(articleId, { toReadFlag: true });\n  },\n  removeToRead(articleId) {\n    return this.findByIdAndUpdate(articleId, { toReadFlag: false });\n  }\n};\n\nexports.default = _mongoose2.default.model('Article', ArticleSchema);\n\n//# sourceURL=webpack:///./src/modules/articles/article.model.js?");

/***/ }),

/***/ "./src/modules/articles/article.routes.js":
/*!************************************************!*\
  !*** ./src/modules/articles/article.routes.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _expressValidation = __webpack_require__(/*! express-validation */ \"express-validation\");\n\nvar _expressValidation2 = _interopRequireDefault(_expressValidation);\n\nvar _multer = __webpack_require__(/*! multer */ \"multer\");\n\nvar _multer2 = _interopRequireDefault(_multer);\n\nvar _article = __webpack_require__(/*! ./article.validations */ \"./src/modules/articles/article.validations.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nvar _article3 = __webpack_require__(/*! ./article.controllers */ \"./src/modules/articles/article.controllers.js\");\n\nvar articleController = _interopRequireWildcard(_article3);\n\nvar _auth = __webpack_require__(/*! ../../services/auth.services */ \"./src/services/auth.services.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst routes = new _express.Router();\n\nroutes.post('/', _auth.authJwt, (0, _multer2.default)({ storage: _multer2.default.memoryStorage() }).single(\"photo\"), (0, _expressValidation2.default)(_article2.default.createArticle), articleController.createArticle);\nroutes.get('/:id', _auth.authJwt, articleController.getArticleById);\nroutes.get('/', _auth.authJwt, articleController.getArticlesList);\nroutes.patch('/:id', _auth.authJwt, (0, _multer2.default)({ storage: _multer2.default.memoryStorage() }).single(\"photo\"), (0, _expressValidation2.default)(_article2.default.updateArticle), articleController.updateArticle);\nroutes.delete('/:id', _auth.authJwt, articleController.deleteArticle);\nroutes.post('/:id/favourite', _auth.authJwt, articleController.favouriteArticle);\nroutes.post('/:id/toread', _auth.authJwt, articleController.toReadArticle);\n\nexports.default = routes;\n\n//# sourceURL=webpack:///./src/modules/articles/article.routes.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createCollection = createCollection;\nexports.updateCollection = updateCollection;\nexports.getCollectionById = getCollectionById;\nexports.addArticleToCollection = addArticleToCollection;\nexports.deleteCollection = deleteCollection;\nexports.getUserCollections = getUserCollections;\n\nvar _httpStatus = __webpack_require__(/*! http-status */ \"http-status\");\n\nvar _httpStatus2 = _interopRequireDefault(_httpStatus);\n\nvar _collection = __webpack_require__(/*! ./collection.model */ \"./src/modules/collections/collection.model.js\");\n\nvar _collection2 = _interopRequireDefault(_collection);\n\nvar _user = __webpack_require__(/*! ../users/user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _minio = __webpack_require__(/*! ../../services/minio.services */ \"./src/services/minio.services.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nasync function createCollection(req, res) {\n  try {\n    const collection = await _collection2.default.createCollection(req.body, req.user._id);\n    if (req.file)\n      //TODO make sure that the original file name is unique\n      await collection.savePhoto(req.file);\n    return res.status(_httpStatus2.default.CREATED).json(collection);\n  } catch (e) {\n    res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function updateCollection(req, res) {\n  try {\n    const collection = await _collection2.default.findById(req.params.id);\n    if (!collection.user.equals(req.user._id)) {\n      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);\n    }\n    Object.keys(req.body).forEach(key => {\n      collection[key] = req.body[key];\n    });\n    if (req.file)\n      //TODO make sure that the original file name is unique\n      await collection.savePhoto(req.file);\n    return res.status(_httpStatus2.default.OK).json((await collection.save()));\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function getCollectionById(req, res, next) {\n  try {\n    const collection = await _collection2.default.findById(req.params.id).populate('articles').populate('user');\n    if (collection.photo) {\n      var size = 0;\n      var data = \"\";\n      _minio.minioClient.getObject('europetrip', collection.photo, (err, dataStream) => {\n        if (err) {\n          return console.log(err);\n        }\n        dataStream.on('data', chunk => {\n          size += chunk.length;\n          data += chunk;\n        });\n        dataStream.on('end', () => {\n          console.log('End. Total size = ' + size);\n          collection.photo = data;\n          res.status(_httpStatus2.default.OK).json(collection);\n          return next();\n        });\n      });\n    } else {\n      res.status(_httpStatus2.default.OK).json(collection);\n      return next();\n    }\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function addArticleToCollection(req, res) {\n  try {\n    const collection = await _collection2.default.findById(req.params.cid);\n    console.log(collection);\n    await collection._articles.add(req.params.aid);\n    return res.sendStatus(_httpStatus2.default.OK);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function deleteCollection(req, res) {\n  try {\n    const collection = await _collection2.default.findById(req.params.id);\n    if (!collection.user.equals(req.user._id)) {\n      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);\n    }\n    await collection.remove();\n    return res.sendStatus(_httpStatus2.default.OK);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function getUserCollections(req, res) {\n  try {\n    const collections = await _collection2.default.find({ user: req.params.uid }).populate('articles');\n    return res.status(_httpStatus2.default.OK).json(collections);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\n//# sourceURL=webpack:///./src/modules/collections/collection.controllers.js?");

/***/ }),

/***/ "./src/modules/collections/collection.model.js":
/*!*****************************************************!*\
  !*** ./src/modules/collections/collection.model.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _slug = __webpack_require__(/*! slug */ \"slug\");\n\nvar _slug2 = _interopRequireDefault(_slug);\n\nvar _minio = __webpack_require__(/*! ../../services/minio.services */ \"./src/services/minio.services.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst CollectionSchema = new _mongoose.Schema({\n  title: {\n    type: String,\n    trim: true,\n    required: [true, 'Collection title is requires'],\n    minlength: [3, 'Title need to be longer'],\n    maxlength: [24, 'Title need to be shorter'],\n    unique: true\n  },\n  description: {\n    type: String,\n    trim: true,\n    required: false,\n    minlength: [5, 'Description need to be longer'],\n    maxlength: [48, 'Description need to be shorter']\n  },\n  photo: {\n    type: String,\n    trim: true\n  },\n  user: {\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'User'\n  },\n  articles: [{\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'Article'\n  }]\n}, {\n  timestamps: true\n});\n\nCollectionSchema.methods = {\n  toJSON() {\n    return {\n      _id: this._id,\n      title: this.title,\n      description: this.description,\n      photo: this.photo,\n      user: this.user,\n      articles: this.articles,\n      createdAt: this.createdAt\n    };\n  },\n  savePhoto(photo) {\n    _minio.minioClient.putObject('europetrip', photo.originalname, photo.buffer, \"application/octet-stream\", function (error, etag) {\n      if (error) {\n        return console.log(error);\n      }\n      console.log('File uploaded successfully.');\n    });\n    this.photo = photo.originalname;\n    this.save();\n  },\n  _articles: {\n    add(articleId) {\n      if (this.articles.indexOf(articleId) >= 0) {\n        console.log('removing article from collection');\n        this.articles.remove(articleId);\n      } else {\n        console.log('adding article to collection');\n        this.articles.push(articleId);\n      }\n      this.save();\n    }\n  }\n};\n\nCollectionSchema.statics = {\n  createCollection(args, user) {\n    return this.create(Object.assign({}, args, {\n      user\n    }));\n  }\n};\n\nexports.default = _mongoose2.default.model('Collection', CollectionSchema);\n\n//# sourceURL=webpack:///./src/modules/collections/collection.model.js?");

/***/ }),

/***/ "./src/modules/collections/collection.routes.js":
/*!******************************************************!*\
  !*** ./src/modules/collections/collection.routes.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _expressValidation = __webpack_require__(/*! express-validation */ \"express-validation\");\n\nvar _expressValidation2 = _interopRequireDefault(_expressValidation);\n\nvar _multer = __webpack_require__(/*! multer */ \"multer\");\n\nvar _multer2 = _interopRequireDefault(_multer);\n\nvar _collection = __webpack_require__(/*! ./collection.validations */ \"./src/modules/collections/collection.validations.js\");\n\nvar _collection2 = _interopRequireDefault(_collection);\n\nvar _collection3 = __webpack_require__(/*! ./collection.controllers */ \"./src/modules/collections/collection.controllers.js\");\n\nvar collectionController = _interopRequireWildcard(_collection3);\n\nvar _auth = __webpack_require__(/*! ../../services/auth.services */ \"./src/services/auth.services.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst routes = new _express.Router();\n\nroutes.post('/', _auth.authJwt, (0, _multer2.default)({ storage: _multer2.default.memoryStorage() }).single(\"photo\"), (0, _expressValidation2.default)(_collection2.default.createCollection), collectionController.createCollection);\nroutes.patch('/:id', _auth.authJwt, (0, _multer2.default)({ storage: _multer2.default.memoryStorage() }).single(\"photo\"), (0, _expressValidation2.default)(_collection2.default.updateCollection), collectionController.updateCollection);\nroutes.get('/:id', _auth.authJwt, collectionController.getCollectionById);\nroutes.post('/:cid/:aid', _auth.authJwt, collectionController.addArticleToCollection); // performs the add and delete (if the requested article already exists it got deleted)\nroutes.delete('/:id', _auth.authJwt, collectionController.deleteCollection);\nroutes.get('/user/:uid', _auth.authJwt, collectionController.getUserCollections);\n\nexports.default = routes;\n\n//# sourceURL=webpack:///./src/modules/collections/collection.routes.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.signup = signup;\nexports.twitterSignup = twitterSignup;\nexports.login = login;\nexports.follow = follow;\nexports.update = update;\nexports.findUserById = findUserById;\n\nvar _httpStatus = __webpack_require__(/*! http-status */ \"http-status\");\n\nvar _httpStatus2 = _interopRequireDefault(_httpStatus);\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _user = __webpack_require__(/*! ./user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _minio = __webpack_require__(/*! ../../services/minio.services */ \"./src/services/minio.services.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nasync function signup(req, res) {\n  try {\n    const user = await _user2.default.create(req.body);\n    return res.status(_httpStatus2.default.CREATED).json(user.toAuthJSON());\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nfunction upsertUser(profile, res) {\n  return _user2.default.findOne({ 'twitter.id': profile.id }, (err, user) => {\n    if (!user) {\n      const twitterInfo = {\n        id: profile.id,\n        fullName: profile.displayName,\n        screenName: profile.username\n      };\n\n      var newUser = new _user2.default({\n        userName: twitterInfo.screenName,\n        photo: profile.photos[0].value,\n        twitter: twitterInfo\n      });\n\n      newUser.save((error, savedUser) => {\n        if (error) {\n          return res.status(_httpStatus2.default.BAD_REQUEST);\n        }\n        return res.status(_httpStatus2.default.OK).json(savedUser.toAuthJSON());\n      });\n    } else {\n      return res.status(_httpStatus2.default.OK).json(user.toAuthJSON());\n    }\n  });\n}\n\nasync function twitterSignup(req, res) {\n  try {\n    upsertUser(req.user, res);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nfunction login(req, res, next) {\n  try {\n    const user = req.user.toAuthJSON();\n    if (user.photo) {\n      var size = 0;\n      var data = \"\";\n      _minio.minioClient.getObject('mybucket', user.photo, (err, dataStream) => {\n        if (err) {\n          return console.log(err);\n        }\n        dataStream.on('data', chunk => {\n          size += chunk.length;\n          data += chunk;\n        });\n        dataStream.on('end', () => {\n          console.log('End. Total size = ' + size);\n          user.photo = data;\n          res.status(_httpStatus2.default.OK).json(user);\n          return next();\n        });\n      });\n    } else {\n      res.status(_httpStatus2.default.OK).json(user);\n      return next();\n    }\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function follow(req, res) {\n  try {\n    const user = await _user2.default.findById(req.user._id);\n    if (req.user._id.equals(req.params.id)) {\n      return res.sendStatus(_httpStatus2.default.BAD_REQUEST);\n    }\n    await user._followings.add(req.params.id);\n    await _user2.default.checkFollower(req.params.id, req.user.id);\n    return res.sendStatus(_httpStatus2.default.OK);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function update(req, res) {\n  try {\n    const user = await _user2.default.findById(req.user._id);\n    Object.keys(req.body).forEach(key => {\n      user[key] = req.body[key];\n    });\n    if (req.file) {\n      //TODO make sure that the original file name is unique\n      await user.savePhoto(req.file);\n      return res.status(_httpStatus2.default.OK).json(user);\n    }\n    return res.status(_httpStatus2.default.OK).json((await user.save()));\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function findUserById(req, res) {\n  try {\n    const user = await _user2.default.findById(req.params.id);\n    if (!user) {\n      return res.status(_httpStatus2.default.BAD_REQUEST).json({ message: 'User not found!' });\n    }\n    return res.status(_httpStatus2.default.OK).json(user.toJSON());\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).josn(e);\n  }\n}\n\n//# sourceURL=webpack:///./src/modules/users/user.controllers.js?");

/***/ }),

/***/ "./src/modules/users/user.model.js":
/*!*****************************************!*\
  !*** ./src/modules/users/user.model.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _validator = __webpack_require__(/*! validator */ \"validator\");\n\nvar _validator2 = _interopRequireDefault(_validator);\n\nvar _bcryptNodejs = __webpack_require__(/*! bcrypt-nodejs */ \"bcrypt-nodejs\");\n\nvar _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nvar _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);\n\nvar _mongooseUniqueValidator = __webpack_require__(/*! mongoose-unique-validator */ \"mongoose-unique-validator\");\n\nvar _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);\n\nvar _minio = __webpack_require__(/*! ../../services/minio.services */ \"./src/services/minio.services.js\");\n\nvar _constants = __webpack_require__(/*! ../../config/constants */ \"./src/config/constants.js\");\n\nvar _constants2 = _interopRequireDefault(_constants);\n\nvar _article = __webpack_require__(/*! ../articles/article.model */ \"./src/modules/articles/article.model.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst UserSchema = new _mongoose.Schema({\n  email: {\n    type: String,\n    unique: true,\n    trim: true,\n    validate: {\n      validator(email) {\n        return _validator2.default.isEmail(email);\n      },\n      message: '{VALUE} is not a valid email!'\n    }\n  },\n  firstName: {\n    type: String,\n    trim: true\n  },\n  lastName: {\n    type: String,\n    trim: true\n  },\n  userName: {\n    type: String,\n    required: [true, 'User name is required'],\n    trim: true,\n    unique: true\n  },\n  photo: {\n    type: String,\n    trim: true\n  },\n  password: {\n    type: String,\n    trim: true,\n    minlength: [6, 'Password need to be longer']\n  },\n  twitter: {\n    id: String,\n    fullName: String,\n    screenName: String\n  },\n  favourites: {\n    articles: [{\n      type: _mongoose.Schema.Types.ObjectId,\n      ref: 'Article'\n    }]\n  },\n  toRead: {\n    articles: [{\n      type: _mongoose.Schema.Types.ObjectId,\n      ref: 'Article'\n    }]\n  },\n  followings: [{\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'User'\n  }],\n  followers: [{\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'User'\n  }]\n}, {\n  timestamps: true\n});\n\nUserSchema.plugin(_mongooseUniqueValidator2.default, {\n  message: '{VALUE} already taken!'\n});\n\nUserSchema.pre('save', function (next) {\n  if (this.isModified('password')) {\n    this.password = this._hashPassword(this.password);\n  }\n  return next();\n});\n\nUserSchema.methods = {\n  _hashPassword(password) {\n    return (0, _bcryptNodejs.hashSync)(password);\n  },\n  authenticateUser(password) {\n    return (0, _bcryptNodejs.compareSync)(password, this.password);\n  },\n  createToken() {\n    return _jsonwebtoken2.default.sign({\n      _id: this._id\n    }, _constants2.default.JWT_SECRET);\n  },\n  toAuthJSON() {\n    return {\n      _id: this._id,\n      userName: this.userName,\n      photo: this.photo,\n      twitter: this.twitter,\n      token: `JWT ${this.createToken()}`\n    };\n  },\n  toJSON() {\n    return {\n      _id: this._id,\n      userName: this.userName,\n      firstName: this.firstName,\n      lastName: this.lastName,\n      favourites: this.favourites,\n      toRead: this.toRead,\n      followings: this.followings,\n      followers: this.followers,\n      photo: this.photo\n    };\n  },\n  savePhoto(photo) {\n    _minio.minioClient.putObject('mybucket', photo.originalname, photo.buffer, \"application/octet-stream\", function (error, etag) {\n      if (error) {\n        return console.log(error);\n      }\n      console.log('File uploaded successfully.');\n    });\n    this.photo = photo.originalname;\n    this.save();\n  },\n  _favourites: {\n    async articles(articleId) {\n      if (this.favourites.articles.indexOf(articleId) >= 0) {\n        this.favourites.articles.remove(articleId);\n        await _article2.default.decFavourite(articleId);\n      } else {\n        this.favourites.articles.push(articleId);\n        await _article2.default.incFavourite(articleId);\n      }\n      return this.save();\n    },\n    isArticleIsFavourite(articleId) {\n      if (this.favourites.articles.indexOf(articleId) >= 0) {\n        return true;\n      }\n      return false;\n    }\n  },\n  _toRead: {\n    async articles(articleId) {\n      if (this.toRead.articles.indexOf(articleId) >= 0) {\n        this.toRead.articles.remove(articleId);\n        await _article2.default.removeToRead(articleId);\n      } else {\n        this.toRead.articles.push(articleId);\n        await _article2.default.addToRead(articleId);\n      }\n      return this.save();\n    }\n  },\n  _followings: {\n    async add(userId) {\n      if (this.followings.indexOf(userId) >= 0) {\n        console.log('removing user from following list');\n        this.followings.remove(userId);\n      } else {\n        console.log('adding new user to following list');\n        this.followings.push(userId);\n      }\n      this.save();\n    }\n  },\n  _followers: {\n    async add(userId) {\n      if (this.followers.indexOf(userId) >= 0) {\n        console.log('removing user from followers list');\n        this.followers.remove(userId);\n      } else {\n        console.log('adding new user to followers list');\n        this.followers.push(userId);\n      }\n      this.save();\n    }\n  }\n};\n\nUserSchema.statics = {\n  async checkFollower(currentId, followerId) {\n    const user = await this.findById(currentId);\n    user._followers.add(followerId);\n  }\n};\n\nexports.default = _mongoose2.default.model('User', UserSchema);\n\n//# sourceURL=webpack:///./src/modules/users/user.model.js?");

/***/ }),

/***/ "./src/modules/users/user.routes.js":
/*!******************************************!*\
  !*** ./src/modules/users/user.routes.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _multer = __webpack_require__(/*! multer */ \"multer\");\n\nvar _multer2 = _interopRequireDefault(_multer);\n\nvar _minio = __webpack_require__(/*! minio */ \"minio\");\n\nvar _minio2 = _interopRequireDefault(_minio);\n\nvar _passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _passportFacebook = __webpack_require__(/*! passport-facebook */ \"passport-facebook\");\n\nvar _passportFacebook2 = _interopRequireDefault(_passportFacebook);\n\nvar _auth = __webpack_require__(/*! ../../services/auth.services */ \"./src/services/auth.services.js\");\n\nvar _twitter = __webpack_require__(/*! ../../services/twitter.services */ \"./src/services/twitter.services.js\");\n\nvar _user = __webpack_require__(/*! ./user.controllers */ \"./src/modules/users/user.controllers.js\");\n\nvar userController = _interopRequireWildcard(_user);\n\nvar _minio3 = __webpack_require__(/*! ../../services/minio.services */ \"./src/services/minio.services.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst routes = new _express.Router();\n\nroutes.get('/:id', userController.findUserById);\nroutes.post('/signup', userController.signup);\nroutes.post('/login', _auth.authLocal, userController.login);\nroutes.post('/:id/follow', _auth.authJwt, userController.follow);\nroutes.patch('/update', _auth.authJwt, (0, _multer2.default)({ storage: _multer2.default.memoryStorage() }).single(\"photo\"), userController.update);\nroutes.get('/login/twitter', _twitter.authTwitter);\nroutes.get('/auth/twitter/callback', _twitter.authTwitterCallback, userController.twitterSignup);\n\nexports.default = routes;\n\n//# sourceURL=webpack:///./src/modules/users/user.routes.js?");

/***/ }),

/***/ "./src/services/auth.services.js":
/*!***************************************!*\
  !*** ./src/services/auth.services.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.authJwt = exports.authLocal = undefined;\n\nvar _passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _passportLocal = __webpack_require__(/*! passport-local */ \"passport-local\");\n\nvar _passportLocal2 = _interopRequireDefault(_passportLocal);\n\nvar _passportJwt = __webpack_require__(/*! passport-jwt */ \"passport-jwt\");\n\nvar _user = __webpack_require__(/*! ../modules/users/user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _constants = __webpack_require__(/*! ../config/constants */ \"./src/config/constants.js\");\n\nvar _constants2 = _interopRequireDefault(_constants);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Local strategy\nconst localOpts = {\n  usernameField: 'email'\n};\n\nconst localStrategy = new _passportLocal2.default(localOpts, async (email, password, done) => {\n  try {\n    const user = await _user2.default.findOne({ email });\n    if (!user) {\n      return done(null, false);\n    } else if (!user.authenticateUser(password)) {\n      return done(null, false);\n    }\n    return done(null, user);\n  } catch (e) {\n    return done(e, false);\n  }\n});\n\n// Jwt strategy\nconst jwtOpts = {\n  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),\n  secretOrKey: _constants2.default.JWT_SECRET\n};\n\nconst jwtStrategy = new _passportJwt.Strategy(jwtOpts, async (payload, done) => {\n  try {\n    const user = await _user2.default.findById(payload._id);\n\n    if (!user) {\n      return done(null, false);\n    }\n\n    return done(null, user);\n  } catch (e) {\n    return done(e, false);\n  }\n});\n\n_passport2.default.use(localStrategy);\n_passport2.default.use(jwtStrategy);\n\nconst authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });\nconst authJwt = exports.authJwt = _passport2.default.authenticate('jwt', { session: false });\n\n//# sourceURL=webpack:///./src/services/auth.services.js?");

/***/ }),

/***/ "./src/services/minio.services.js":
/*!****************************************!*\
  !*** ./src/services/minio.services.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.minioClient = undefined;\n\nvar _minio = __webpack_require__(/*! minio */ \"minio\");\n\nconst minioClient = exports.minioClient = new _minio.Client({\n    endPoint: 'play.minio.io',\n    port: 9000,\n    secure: true,\n    accessKey: 'Q3AM3UQ867SPQQA43P2F',\n    secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'\n});\n\n//# sourceURL=webpack:///./src/services/minio.services.js?");

/***/ }),

/***/ "./src/services/twitter.services.js":
/*!******************************************!*\
  !*** ./src/services/twitter.services.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.authTwitterCallback = exports.authTwitter = undefined;\n\nvar _passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _passportTwitter = __webpack_require__(/*! passport-twitter */ \"passport-twitter\");\n\nvar _user = __webpack_require__(/*! ../modules/users/user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _constants = __webpack_require__(/*! ../config/constants */ \"./src/config/constants.js\");\n\nvar _constants2 = _interopRequireDefault(_constants);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst twitterOpts = {\n  consumerKey: \"EGLoBrQWNNtCDLYQKh6pupRO1\",\n  consumerSecret: \"9FNzG4LlhCOhnNOf9VGS2SHQXAILjiLXTWfOrr9MT7W6nV05ww\",\n  callbackURL: \"http://127.0.0.1:3000/api/v1/users/auth/twitter/callback\"\n};\n\nconst twitterStrategy = new _passportTwitter.Strategy(twitterOpts, async (accessToken, refreshToken, profile, done) => {\n  try {\n    return done(null, profile);\n  } catch (err) {\n    return done(err, false);\n  }\n});\n\n_passport2.default.use(twitterStrategy);\n\nconst authTwitter = exports.authTwitter = _passport2.default.authenticate('twitter', { session: false });\nconst authTwitterCallback = exports.authTwitterCallback = _passport2.default.authenticate('twitter', { session: false, failureRedirect: '/' });\n\n//# sourceURL=webpack:///./src/services/twitter.services.js?");

/***/ }),

/***/ "./test/app_test.js":
/*!**************************!*\
  !*** ./test/app_test.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _user = __webpack_require__(/*! ../src/modules/users/user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet sinon = __webpack_require__(/*! sinon */ \"sinon\");\nlet chai = __webpack_require__(/*! chai */ \"chai\");\nlet mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nlet assert = __webpack_require__(/*! assert */ \"assert\");\nlet expect = chai.expect;\nlet faker = __webpack_require__(/*! faker */ \"faker\");\nvar request = __webpack_require__(/*! supertest */ \"supertest\")('http://localhost:3000/api/v1/users');\nlet app = __webpack_require__(/*! ../src/index */ \"./src/index.js\");\nlet models = __webpack_require__(/*! ./user_model_test.js */ \"./test/user_model_test.js\");\nlet routes = __webpack_require__(/*! ./user_routes_test.js */ \"./test/user_routes_test.js\");\nlet mocks = __webpack_require__(/*! ./user_mock.js */ \"./test/user_mock.js\");\nlet articleModel = __webpack_require__(/*! ./article_model_test.js */ \"./test/article_model_test.js\");\nlet articleRoutes = __webpack_require__(/*! ./article_routes_test.js */ \"./test/article_routes_test.js\");\n\nbefore('Connecting to DB', function (done) {\n  mongoose.connect('mongodb://localhost:27017/supreme-posts-test');\n  mongoose.connection.once('open', () => {\n    console.log('connected to mongoDB');\n    mongoose.connection.collections.users.drop();\n    done();\n  }).on('error', err => {\n    throw err;\n  });\n});\n\nroutes.testRoutes();\nmodels.testModels();\nmocks.mockDB();\narticleModel.testArticleModel();\narticleRoutes.testArticleRoutes();\n\n//# sourceURL=webpack:///./test/app_test.js?");

/***/ }),

/***/ "./test/article_model_test.js":
/*!************************************!*\
  !*** ./test/article_model_test.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.testArticleModel = testArticleModel;\n\nvar _article = __webpack_require__(/*! ../src/modules/articles/article.model */ \"./src/modules/articles/article.model.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet sinon = __webpack_require__(/*! sinon */ \"sinon\");\nlet chai = __webpack_require__(/*! chai */ \"chai\");\nlet mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nlet assert = __webpack_require__(/*! assert */ \"assert\");\nlet expect = chai.expect;\nlet faker = __webpack_require__(/*! faker */ \"faker\");\nvar request = __webpack_require__(/*! supertest */ \"supertest\")('http://localhost:3000/api/v1/users');\nlet app = __webpack_require__(/*! ../src/index */ \"./src/index.js\");\n\nfunction testArticleModel() {\n  describe('Testing Article Model', function () {\n\n    var ObjectID = __webpack_require__(/*! mongodb */ \"mongodb\").ObjectID;\n    var objectId = new ObjectID();\n    var article;\n\n    faker.seed(801);\n    const fakeArticle = {\n      title: faker.lorem.words(),\n      slug: faker.lorem.slug(),\n      text: faker.lorem.paragraphs(),\n      summary: faker.lorem.paragraph(),\n      user: objectId\n    };\n\n    before('should create a new article', done => {\n      article = new _article2.default(fakeArticle);\n      console.log(article);\n      article.save().then(() => {\n        assert(!article.isNew);\n        done();\n      });\n    });\n\n    it('Modifies the title of the created article', function (done) {\n      faker.seed(200);\n      _article2.default.findOneAndUpdate({ _id: article._id }, { title: faker.lorem.words() }, (err, record) => {\n        expect(record).to.not.be.undefined;\n        expect(record._id).to.not.be.undefined;\n        expect(record.text).to.not.be.undefined;\n        expect(record.title).to.not.be.undefined;\n        expect(record.slug).to.not.be.undefined;\n        expect(record.summary).to.not.be.undefined;\n        expect(err).to.be.null;\n        done();\n      });\n    });\n\n    it('Modifies the text of the created article', function (done) {\n      faker.seed(300);\n      _article2.default.findOneAndUpdate({ _id: article._id }, { text: faker.lorem.paragraphs() }, (err, record) => {\n        expect(record).to.not.be.undefined;\n        expect(record).to.not.be.undefined;\n        expect(record._id).to.not.be.undefined;\n        expect(record.text).to.not.be.undefined;\n        expect(record.title).to.not.be.undefined;\n        expect(record.slug).to.not.be.undefined;\n        expect(record.summary).to.not.be.undefined;\n        expect(err).to.be.null;\n        done();\n      });\n    });\n\n    it('Finds the created article', function (done) {\n      _article2.default.findOne({ _id: article._id }, (err, record) => {\n        expect(record).to.not.be.undefined;\n        expect(record).to.not.be.undefined;\n        expect(record._id).to.not.be.undefined;\n        expect(record.text).to.not.be.undefined;\n        expect(record.title).to.not.be.undefined;\n        expect(record.slug).to.not.be.undefined;\n        expect(record.summary).to.not.be.undefined;\n        expect(err).to.be.null;\n        done();\n      });\n    });\n\n    it('Deletes the created article', function (done) {\n      _article2.default.findOneAndRemove({ _id: article._id }, (err, record) => {\n        expect(record).to.not.be.undefined;\n        expect(record).to.be.an('object');\n        expect(err).to.be.null;\n        done();\n      });\n    });\n  });\n}\n\n//# sourceURL=webpack:///./test/article_model_test.js?");

/***/ }),

/***/ "./test/article_routes_test.js":
/*!*************************************!*\
  !*** ./test/article_routes_test.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.testArticleRoutes = testArticleRoutes;\n\nvar _user = __webpack_require__(/*! ../src/modules/users/user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _article = __webpack_require__(/*! ../src/modules/articles/article.model */ \"./src/modules/articles/article.model.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet sinon = __webpack_require__(/*! sinon */ \"sinon\");\nlet chai = __webpack_require__(/*! chai */ \"chai\");\nlet mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nlet assert = __webpack_require__(/*! assert */ \"assert\");\nlet expect = chai.expect;\nlet faker = __webpack_require__(/*! faker */ \"faker\");\nlet requestUser = __webpack_require__(/*! supertest */ \"supertest\")('http://localhost:3000/api/v1/users');\nlet requestArticle = __webpack_require__(/*! supertest */ \"supertest\")('http://localhost:3000/api/v1/articles');\nlet app = __webpack_require__(/*! ../src/index */ \"./src/index.js\");\n\nfunction testArticleRoutes() {\n  describe.only('Testing Article routes', function () {\n    let user;\n    let article;\n    var ObjectID = __webpack_require__(/*! mongodb */ \"mongodb\").ObjectID;\n    var objectId = new ObjectID();\n    var token;\n\n    faker.seed(30);\n    const fakeUser = {\n      irstName: faker.name.firstName(),\n      lastName: faker.name.lastName(),\n      email: faker.internet.email(),\n      password: faker.internet.password(),\n      userName: faker.internet.userName()\n    };\n    const fakeArticle = {\n      title: faker.lorem.words(),\n      text: faker.lorem.paragraphs()\n    };\n\n    before('should create new user', done => {\n      requestUser.post('/signup').send(fakeUser).expect(201).end(function (err, res) {\n        token = res.body.token;\n        user = res.body;\n        expect(201);\n        done();\n      });\n    });\n\n    it('should create new article', done => {\n      requestArticle.post('/').set({ authorization: token }).send(fakeArticle).expect(201).end((err, res) => {\n        article = res.body;\n        expect(err).to.be.null;\n        expect(201);\n        done();\n      });\n    });\n\n    it('should get an article by its id', done => {\n      requestArticle.get(`/${article._id}`).set({ authorization: token }).expect(200).end((err, res) => {\n        expect(err).to.be.null;\n        expect(200);\n        done();\n      });\n    });\n\n    it('should modify the article', done => {\n      requestArticle.patch(`/${article._id}`).set({ authorization: token }).send({ title: 'this is a new title' }).expect(200).end((err, res) => {\n        expect(err).to.be.null;\n        expect(res.body).to.be.an('object');\n        done();\n      });\n    });\n\n    it('should add a pic to the article', done => {\n      requestArticle.patch(`/${article._id}`).set({ authorization: token }).attach('photo', '/home/dania/Octave/cartoon.jpeg').expect(200).end((err, res) => {\n        expect(err).to.be.null;\n        expect(res.body).to.be.an('object');\n        done();\n      });\n    });\n\n    it('should favourite an article', done => {\n      requestArticle.post(`/${article._id}/favourite`).set({ authorization: token }).expect(200).end((err, res) => {\n        expect(err).to.be.null;\n        expect(res.body).to.be.an('object');\n        done();\n      });\n    });\n\n    it('should favourite an article', done => {\n      requestArticle.post(`/${article._id}/toread`).set({ authorization: token }).expect(200).end((err, res) => {\n        expect(err).to.be.null;\n        expect(res.body).to.be.an('object');\n        done();\n      });\n    });\n\n    it('should delete an article', done => {\n      requestArticle.delete(`/${article._id}`).set({ authorization: token }).expect(200).end((err, res) => {\n        expect(err).to.be.null;\n        expect(res.body).to.be.an('object');\n        done();\n      });\n    });\n  });\n}\n\n//# sourceURL=webpack:///./test/article_routes_test.js?");

/***/ }),

/***/ "./test/user_mock.js":
/*!***************************!*\
  !*** ./test/user_mock.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.mockDB = mockDB;\n\nvar _user = __webpack_require__(/*! ../src/modules/users/user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet sinon = __webpack_require__(/*! sinon */ \"sinon\");\nlet chai = __webpack_require__(/*! chai */ \"chai\");\nlet mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nlet assert = __webpack_require__(/*! assert */ \"assert\");\nlet expect = chai.expect;\nlet faker = __webpack_require__(/*! faker */ \"faker\");\nvar request = __webpack_require__(/*! supertest */ \"supertest\")('http://localhost:3000/api/v1/users');\nlet app = __webpack_require__(/*! ../src/index */ \"./src/index.js\");\n\nfunction mockDB() {\n  describe('User Mocks', function () {\n\n    faker.seed(99);\n    const fakeUser = {\n      firstName: faker.name.firstName(),\n      lastName: faker.name.lastName(),\n      email: faker.internet.email(),\n      password: faker.internet.password(),\n      userName: faker.internet.userName()\n    };\n\n    it('Should create a new user', function (done) {\n      const user = new _user2.default(fakeUser);\n      const userMock = sinon.mock(user);\n      const theUser = userMock.object;\n\n      userMock.expects('save').yields(null);\n\n      theUser.save(err => {\n        userMock.verify();\n        userMock.restore();\n        expect(err).to.be.null;\n        done();\n      });\n    });\n\n    it('Should return error if user isn\\'t created', function (done) {\n      const user = new _user2.default(fakeUser);\n      const userMock = sinon.mock(user);\n      const theUser = userMock.object;\n      const expectedError = {\n        name: 'ValidationError'\n      };\n\n      userMock.expects('save').yields(expectedError);\n\n      theUser.save((err, result) => {\n        userMock.verify();\n        userMock.restore();\n        expect(err.name).to.equal('ValidationError');\n        expect(result).to.be.undefined;\n        done();\n      });\n    });\n\n    it('Should find user by email', function (done) {\n      const userMock = sinon.mock(_user2.default);\n      const expectedUser = fakeUser;\n\n      userMock.expects('findOne').withArgs({ email: fakeUser.email }).yields(null, expectedUser);\n\n      _user2.default.findOne({ email: fakeUser.email }, (err, result) => {\n        userMock.verify();\n        userMock.restore();\n        expect(result.email).to.equal(fakeUser.email);\n        done();\n      });\n    });\n\n    it('Should remove a user', function (done) {\n      const userMock = sinon.mock(_user2.default);\n      const expectedResult = {\n        nRemoved: 1\n      };\n\n      userMock.expects('remove').withArgs({ email: fakeUser.email }).yields(null, expectedResult);\n\n      _user2.default.remove({ email: fakeUser.email }, (err, result) => {\n        userMock.verify();\n        userMock.restore();\n        expect(err).to.be.null;\n        expect(result.nRemoved).to.equal(1);\n        done();\n      });\n    });\n  });\n}\n\n//# sourceURL=webpack:///./test/user_mock.js?");

/***/ }),

/***/ "./test/user_model_test.js":
/*!*********************************!*\
  !*** ./test/user_model_test.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.testModels = testModels;\n\nvar _user = __webpack_require__(/*! ../src/modules/users/user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet sinon = __webpack_require__(/*! sinon */ \"sinon\");\nlet chai = __webpack_require__(/*! chai */ \"chai\");\nlet mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nlet assert = __webpack_require__(/*! assert */ \"assert\");\nlet expect = chai.expect;\nlet faker = __webpack_require__(/*! faker */ \"faker\");\nvar request = __webpack_require__(/*! supertest */ \"supertest\")('http://localhost:3000/api/v1/users');\nlet app = __webpack_require__(/*! ../src/index */ \"./src/index.js\");\n\nfunction testModels() {\n  describe('Testing User Model', function () {\n    let user;\n    faker.seed(1000);\n    const fakeUser = {\n      firstName: faker.name.firstName(),\n      lastName: faker.name.lastName(),\n      email: faker.internet.email(),\n      password: faker.internet.password(),\n      userName: faker.internet.userName()\n    };\n    const missedUserName = {\n      firstName: faker.name.firstName(),\n      lastName: faker.name.lastName(),\n      email: faker.internet.email(),\n      password: faker.internet.password()\n    };\n\n    before('Creates a new user to test it', function (done) {\n      user = new _user2.default(fakeUser);\n      user.save().then(() => {\n        assert(!user.isNew);\n        done();\n      });\n    });\n\n    it('Modifies the created user', function (done) {\n      _user2.default.findOneAndUpdate({ _id: user._id }, { lastName: 'Ref' }, (err, record) => {\n        expect(record).to.not.be.undefined;\n        expect(record).to.be.an('object');\n        expect(record._id).to.not.be.undefined;\n        expect(record.userName).to.not.be.undefined;\n        expect(record.lastName).to.not.be.undefined;\n        expect(record.email).to.not.be.undefined;\n        expect(record.password).to.not.be.undefined;\n        expect(record.userName).to.not.be.undefined;\n        expect(record.email).to.match(/^.+@.+\\..+$/);\n        expect(record.password).to.be.a('string');\n        expect(record.firstName).to.be.a('string');\n        expect(record.lastName).to.be.a('string');\n        expect(record.userName).to.be.a('string');\n        expect(record.email).to.be.a('string');\n        expect(err).to.be.null;\n        done();\n      });\n    });\n\n    it('Finds the created user', function (done) {\n      _user2.default.findOne({ _id: user._id }, (err, record) => {\n        expect(record).to.not.be.undefined;\n        expect(record).to.be.an('object');\n        expect(record._id).to.not.be.undefined;\n        expect(record.userName).to.not.be.undefined;\n        expect(record.lastName).to.not.be.undefined;\n        expect(record.email).to.not.be.undefined;\n        expect(record.password).to.not.be.undefined;\n        expect(record.userName).to.not.be.undefined;\n        expect(record.email).to.match(/^.+@.+\\..+$/);\n        expect(record.password).to.be.a('string');\n        expect(record.firstName).to.be.a('string');\n        expect(record.lastName).to.be.a('string');\n        expect(record.userName).to.be.a('string');\n        expect(record.email).to.be.a('string');\n        expect(err).to.be.null;\n        done();\n      });\n    });\n\n    it('Deletes the created user', function (done) {\n      _user2.default.findOneAndRemove({ _id: user._id }, (err, record) => {\n        expect(record).to.not.be.undefined;\n        expect(record).to.be.an('object');\n        expect(err).to.be.null;\n        done();\n      });\n    });\n\n    it('Missing userName', function (done) {\n      user = new _user2.default(missedUserName);\n      user.save().then(() => {\n        assert(user.isNew);\n      });\n      done();\n    });\n\n    it('Invalid email', function (done) {\n      user = new _user2.default({\n        firstName: fakeUser.firstName,\n        lastName: fakeUser.lastName,\n        email: 'poldi1234@.com',\n        password: fakeUser.password,\n        userName: fakeUser.userName\n      });\n      user.save().then(() => {\n        assert(user.isNew);\n      });\n      done();\n    });\n\n    it('Weak password', function (done) {\n      user = new _user2.default({\n        firstName: fakeUser.firstName,\n        lastName: fakeUser.lastName,\n        email: fakeUser.email,\n        password: 'aaaaa123',\n        userName: fakeUser.userName\n      });\n      user.save().then(() => {\n        assert(user.isNew);\n      });\n      done();\n    });\n\n    it('Short password', function (done) {\n      user = new _user2.default({\n        firstName: fakeUser.firstName,\n        lastName: fakeUser.lastName,\n        email: fakeUser.email,\n        password: 'aa23',\n        userName: fakeUser.userName\n      });\n      user.save().then(() => {\n        assert(user.isNew);\n      });\n      done();\n    });\n  });\n}\n\n//# sourceURL=webpack:///./test/user_model_test.js?");

/***/ }),

/***/ "./test/user_routes_test.js":
/*!**********************************!*\
  !*** ./test/user_routes_test.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.testRoutes = testRoutes;\n\nvar _user = __webpack_require__(/*! ../src/modules/users/user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet sinon = __webpack_require__(/*! sinon */ \"sinon\");\nlet chai = __webpack_require__(/*! chai */ \"chai\");\nlet mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nlet assert = __webpack_require__(/*! assert */ \"assert\");\nlet expect = chai.expect;\nlet faker = __webpack_require__(/*! faker */ \"faker\");\nlet request = __webpack_require__(/*! supertest */ \"supertest\")('http://localhost:3000/api/v1/users');\nlet app = __webpack_require__(/*! ../src/index */ \"./src/index.js\");\n\nfunction testRoutes() {\n  describe('Testing User routes', function () {\n    let user1;\n    let user2;\n    let token1;\n    let id2;\n    let cookies;\n\n    faker.seed(99);\n    const fakeUser = {\n      irstName: faker.name.firstName(),\n      lastName: faker.name.lastName(),\n      email: faker.internet.email(),\n      password: faker.internet.password(),\n      userName: faker.internet.userName()\n    };\n    faker.seed(100);\n    const fakeUser2 = {\n      irstName: faker.name.firstName(),\n      lastName: faker.name.lastName(),\n      email: faker.internet.email(),\n      password: faker.internet.password(),\n      userName: faker.internet.userName()\n    };\n\n    it('should create new user', done => {\n      request.post('/signup').send(fakeUser).end(function (err, res) {\n        token1 = res.body.token;\n        expect(res.body._id).to.not.be.undefined;\n        expect(res.body.userName).to.not.be.undefined;\n        expect(res.body.token).to.not.be.undefined;\n        expect(res.body._id).to.be.a('string');\n        expect(res.body.userName).to.be.a('string');\n        expect(res.body.token).to.be.a('string');\n        expect(res.statusCode).to.be.eq(201);\n        expect(err).to.be.null;\n        expect(201);\n        done();\n      });\n    });\n\n    it('should login', done => {\n      request.post('/login').send({ email: fakeUser.email, password: fakeUser.password }).query(token1).expect(200).end((err, res) => {\n        expect(res.body._id).to.not.be.undefined;\n        expect(res.body.userName).to.not.be.undefined;\n        expect(res.body.token).to.not.be.undefined;\n        expect(res.body._id).to.be.a('string');\n        expect(res.body.userName).to.be.a('string');\n        expect(res.body.token).to.be.a('string');\n        expect(res.statusCode).to.be.eq(200);\n        expect(err).to.be.null;\n        expect(200);\n        done();\n      });\n    });\n\n    it('should create new user2', done => {\n      request.post('/signup').send(fakeUser2).end(function (err, res) {\n        id2 = res.body._id;\n        expect(201);\n        expect(res.body._id).to.not.be.undefined;\n        expect(res.body.userName).to.not.be.undefined;\n        expect(res.body.token).to.not.be.undefined;\n        expect(res.body._id).to.be.a('string');\n        expect(res.body.userName).to.be.a('string');\n        expect(res.body.token).to.be.a('string');\n        expect(res.statusCode).to.be.eq(201);\n        expect(err).to.be.null;\n        expect(201);\n        done();\n      });\n    });\n\n    it('user1 should follow user2', done => {\n      request.post(`/${id2}/follow`).set({ authorization: token1 }).expect(200).end((err, res) => {\n        expect(err).to.be.null;\n        expect(res.body).to.be.an('object');\n        done();\n      });\n    });\n\n    it('should update user photo', done => {\n      request.patch('/update').set({ authorization: token1 }).attach('photo', '/home/dania/Octave/cartoon.jpeg').expect(200).end((err, res) => {\n        expect(err).to.be.null;\n        expect(res.body).to.be.an('object');\n        done();\n      });\n    });\n\n    it('should change user\\'s last name', done => {\n      request.patch('/update').set({ authorization: token1 }).send({ lastName: 'XXX' }).expect(200).end((err, res) => {\n        expect(err).to.be.null;\n        expect(res.body).to.be.an('object');\n        done();\n      });\n    });\n\n    it('should change user\\'s password', done => {\n      request.patch('/update').set({ authorization: token1 }).send({ password: 'newpass' }).expect(200).end((err, res) => {\n        expect(err).to.be.null;\n        expect(res.body).to.be.an('object');\n        done();\n      });\n    });\n\n    it('try login with old password', done => {\n      request.post('/login').send({ email: fakeUser.email, password: fakeUser.password }).query(token1).expect(401).end((err, res) => {\n        expect(err).to.be.null;\n        expect(res.body).to.be.an('object');\n        done();\n      });\n    });\n\n    it('should login with the new password', done => {\n      request.post('/login').send({ email: fakeUser.email, password: 'newpass' }).query(token1).expect(200).end((err, res) => {\n        expect(res.body._id).to.not.be.undefined;\n        expect(res.body.userName).to.not.be.undefined;\n        expect(res.body.token).to.not.be.undefined;\n        expect(res.body._id).to.be.a('string');\n        expect(res.body.userName).to.be.a('string');\n        expect(res.body.token).to.be.a('string');\n        expect(res.statusCode).to.be.eq(200);\n        expect(err).to.be.null;\n        expect(200);\n        done();\n      });\n    });\n  });\n}\n\n//# sourceURL=webpack:///./test/user_routes_test.js?");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"assert\");\n\n//# sourceURL=webpack:///external_%22assert%22?");

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

/***/ "chai":
/*!***********************!*\
  !*** external "chai" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chai\");\n\n//# sourceURL=webpack:///external_%22chai%22?");

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

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "express-validation":
/*!*************************************!*\
  !*** external "express-validation" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-validation\");\n\n//# sourceURL=webpack:///external_%22express-validation%22?");

/***/ }),

/***/ "faker":
/*!************************!*\
  !*** external "faker" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"faker\");\n\n//# sourceURL=webpack:///external_%22faker%22?");

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

/***/ "minio":
/*!************************!*\
  !*** external "minio" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"minio\");\n\n//# sourceURL=webpack:///external_%22minio%22?");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongodb\");\n\n//# sourceURL=webpack:///external_%22mongodb%22?");

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

/***/ "passport-facebook":
/*!************************************!*\
  !*** external "passport-facebook" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-facebook\");\n\n//# sourceURL=webpack:///external_%22passport-facebook%22?");

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

/***/ "passport-twitter":
/*!***********************************!*\
  !*** external "passport-twitter" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-twitter\");\n\n//# sourceURL=webpack:///external_%22passport-twitter%22?");

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

/***/ "sinon":
/*!************************!*\
  !*** external "sinon" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sinon\");\n\n//# sourceURL=webpack:///external_%22sinon%22?");

/***/ }),

/***/ "slug":
/*!***********************!*\
  !*** external "slug" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"slug\");\n\n//# sourceURL=webpack:///external_%22slug%22?");

/***/ }),

/***/ "supertest":
/*!****************************!*\
  !*** external "supertest" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"supertest\");\n\n//# sourceURL=webpack:///external_%22supertest%22?");

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