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

/***/ "./node_modules/python-shell/index.js":
/*!********************************************!*\
  !*** ./node_modules/python-shell/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var EventEmitter = __webpack_require__(/*! events */ \"events\").EventEmitter;\r\nvar path = __webpack_require__(/*! path */ \"path\");\r\nvar util = __webpack_require__(/*! util */ \"util\");\r\nvar spawn = __webpack_require__(/*! child_process */ \"child_process\").spawn;\r\n\r\nfunction toArray(source) {\r\n    if (typeof source === 'undefined' || source === null) {\r\n        return [];\r\n    } else if (!Array.isArray(source)) {\r\n        return [source];\r\n    }\r\n    return source;\r\n}\r\n\r\nfunction extend(obj) {\r\n    Array.prototype.slice.call(arguments, 1).forEach(function (source) {\r\n        if (source) {\r\n            for (var key in source) {\r\n                obj[key] = source[key];\r\n            }\r\n        }\r\n    });\r\n    return obj;\r\n}\r\n\r\n/**\r\n * An interactive Python shell exchanging data through stdio\r\n * @param {string} script    The python script to execute\r\n * @param {object} [options] The launch options (also passed to child_process.spawn)\r\n * @constructor\r\n */\r\nvar PythonShell = function (script, options) {\r\n\r\n    function resolve(type, val) {\r\n        if (typeof val === 'string') {\r\n            // use a built-in function using its name\r\n            return PythonShell[type][val];\r\n        } else if (typeof val === 'function') {\r\n            // use a custom function\r\n            return val;\r\n        }\r\n    }\r\n\r\n    var self = this;\r\n    var errorData = '';\r\n    EventEmitter.call(this);\r\n\r\n    options = extend({}, PythonShell.defaultOptions, options);\r\n    var pythonPath = options.pythonPath || 'python';\r\n    var pythonOptions = toArray(options.pythonOptions);\r\n    var scriptArgs = toArray(options.args);\r\n\r\n    this.script = path.join(options.scriptPath || './', script);\r\n    this.command = pythonOptions.concat(this.script, scriptArgs);\r\n    this.mode = options.mode || 'text';\r\n    this.formatter = resolve('format', options.formatter || this.mode);\r\n    this.parser = resolve('parse', options.parser || this.mode);\r\n    this.terminated = false;\r\n    this.childProcess = spawn(pythonPath, this.command, options);\r\n\r\n    ['stdout', 'stdin', 'stderr'].forEach(function (name) {\r\n        self[name] = self.childProcess[name];\r\n        self.parser && self[name].setEncoding(options.encoding || 'utf8');\r\n    });\r\n\r\n    // parse incoming data on stdout\r\n    if (this.parser) {\r\n        this.stdout.on('data', PythonShell.prototype.receive.bind(this));\r\n    }\r\n\r\n    // listen to stderr and emit errors for incoming data\r\n    this.stderr.on('data', function (data) {\r\n        errorData += ''+data;\r\n    });\r\n\r\n    this.stderr.on('end', function(){\r\n        self.stderrHasEnded = true\r\n        terminateIfNeeded();\r\n    })\r\n\r\n    this.stdout.on('end', function(){\r\n        self.stdoutHasEnded = true\r\n        terminateIfNeeded();\r\n    })\r\n\r\n    this.childProcess.on('exit', function (code,signal) {\r\n        self.exitCode = code;\r\n        self.exitSignal = signal;\r\n        terminateIfNeeded();\r\n    });\r\n\r\n    function terminateIfNeeded() {\r\n        if(!self.stderrHasEnded || !self.stdoutHasEnded || (self.exitCode == null && self.exitSignal == null)) return;\r\n\r\n        var err;\r\n        if (errorData || (self.exitCode && self.exitCode !== 0)) {\r\n            if (errorData) {\r\n                err = self.parseError(errorData);\r\n            } else {\r\n                err = new Error('process exited with code ' + self.exitCode);\r\n            }\r\n            err = extend(err, {\r\n                executable: pythonPath,\r\n                options: pythonOptions.length ? pythonOptions : null,\r\n                script: self.script,\r\n                args: scriptArgs.length ? scriptArgs : null,\r\n                exitCode: self.exitCode\r\n            });\r\n            // do not emit error if only a callback is used\r\n            if (self.listeners('error').length || !self._endCallback) {\r\n                self.emit('error', err);\r\n            }\r\n        }\r\n\r\n        self.terminated = true;\r\n        self.emit('close');\r\n        self._endCallback && self._endCallback(err,self.exitCode,self.exitSignal);\r\n    };\r\n};\r\nutil.inherits(PythonShell, EventEmitter);\r\n\r\n// allow global overrides for options\r\nPythonShell.defaultOptions = {};\r\n\r\n// built-in formatters\r\nPythonShell.format = {\r\n    text: function toText(data) {\r\n        if (!data) return '';\r\n        else if (typeof data !== 'string') return data.toString();\r\n        return data;\r\n    },\r\n    json: function toJson(data) {\r\n        return JSON.stringify(data);\r\n    }\r\n};\r\n\r\n// built-in parsers\r\nPythonShell.parse = {\r\n    text: function asText(data) {\r\n        return data;\r\n    },\r\n    json: function asJson(data) {\r\n        return JSON.parse(data);\r\n    }\r\n};\r\n\r\n/**\r\n * Runs a Python script and returns collected messages\r\n * @param  {string}   script   The script to execute\r\n * @param  {Object}   options  The execution options\r\n * @param  {Function} callback The callback function to invoke with the script results\r\n * @return {PythonShell}       The PythonShell instance\r\n */\r\nPythonShell.run = function (script, options, callback) {\r\n    if (typeof options === 'function') {\r\n        callback = options;\r\n        options = null;\r\n    }\r\n\r\n    var pyshell = new PythonShell(script, options);\r\n    var output = [];\r\n\r\n    return pyshell.on('message', function (message) {\r\n        output.push(message);\r\n    }).end(function (err) {\r\n        if (err) return callback(err);\r\n        return callback(null, output.length ? output : null);\r\n    });\r\n};\r\n\r\n/**\r\n * Parses an error thrown from the Python process through stderr\r\n * @param  {string|Buffer} data The stderr contents to parse\r\n * @return {Error} The parsed error with extended stack trace when traceback is available\r\n */\r\nPythonShell.prototype.parseError = function (data) {\r\n    var text = ''+data;\r\n    var error;\r\n\r\n    if (/^Traceback/.test(text)) {\r\n        // traceback data is available\r\n        var lines = (''+data).trim().split(/\\n/g);\r\n        var exception = lines.pop();\r\n        error = new Error(exception);\r\n        error.traceback = data;\r\n        // extend stack trace\r\n        error.stack += '\\n    ----- Python Traceback -----\\n  ';\r\n        error.stack += lines.slice(1).join('\\n  ');\r\n    } else {\r\n        // otherwise, create a simpler error with stderr contents\r\n        error = new Error(text);\r\n    }\r\n\r\n    return error;\r\n};\r\n\r\n/**\r\n * Sends a message to the Python shell through stdin\r\n * Override this method to format data to be sent to the Python process\r\n * @param {string|Object} data The message to send\r\n * @returns {PythonShell} The same instance for chaining calls\r\n */\r\nPythonShell.prototype.send = function (message) {\r\n    var data = this.formatter ? this.formatter(message) : message;\r\n    if (this.mode !== 'binary') data += '\\n';\r\n    this.stdin.write(data);\r\n    return this;\r\n};\r\n\r\n/**\r\n * Parses data received from the Python shell stdout stream and emits \"message\" events\r\n * This method is not used in binary mode\r\n * Override this method to parse incoming data from the Python process into messages\r\n * @param {string|Buffer} data The data to parse into messages\r\n */\r\nPythonShell.prototype.receive = function (data) {\r\n    var self = this;\r\n    var parts = (''+data).split(/\\n/g);\r\n\r\n    if (parts.length === 1) {\r\n        // an incomplete record, keep buffering\r\n        this._remaining = (this._remaining || '') + parts[0];\r\n        return this;\r\n    }\r\n\r\n    var lastLine = parts.pop();\r\n    // fix the first line with the remaining from the previous iteration of 'receive'\r\n    parts[0] = (this._remaining || '') + parts[0];\r\n    // keep the remaining for the next iteration of 'receive'\r\n    this._remaining = lastLine;\r\n\r\n    parts.forEach(function (part) {\r\n        self.emit('message', self.parser(part));\r\n    });\r\n\r\n    return this;\r\n};\r\n\r\n/**\r\n * Closes the stdin stream, which should cause the process to finish its work and close\r\n * @returns {PythonShell} The same instance for chaining calls\r\n */\r\nPythonShell.prototype.end = function (callback) {\r\n    this.childProcess.stdin.end();\r\n    this._endCallback = callback;\r\n    return this;\r\n};\r\n\r\n/**\r\n * Closes the stdin stream, which should cause the process to finish its work and close\r\n * @returns {PythonShell} The same instance for chaining calls\r\n */\r\nPythonShell.prototype.terminate = function (signal) {\r\n    this.childProcess.kill(signal);\r\n    this.terminated = true;\r\n    return this;\r\n};\r\n\r\nmodule.exports = PythonShell;\r\n\n\n//# sourceURL=webpack:///./node_modules/python-shell/index.js?");

/***/ }),

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createArticle = createArticle;\nexports.getArticleById = getArticleById;\nexports.getArticlesList = getArticlesList;\nexports.updateArticle = updateArticle;\nexports.deleteArticle = deleteArticle;\n\nvar _article = __webpack_require__(/*! ./article.model */ \"./src/modules/articles/article.model.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nvar _httpStatus = __webpack_require__(/*! http-status */ \"http-status\");\n\nvar _httpStatus2 = _interopRequireDefault(_httpStatus);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nasync function createArticle(req, res) {\n  try {\n    const article = await _article2.default.createArticle(req.body, req.user._id);\n    _article2.default.summarizeText(article, req.body.title, req.body.text);\n    return res.status(_httpStatus2.default.CREATED).json(article);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function getArticleById(req, res) {\n  try {\n    const article = await _article2.default.findById(req.params.id).populate('user');\n    return res.status(_httpStatus2.default.OK).json(article);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function getArticlesList(req, res) {\n  const limit = parseInt(req.query.limit, 0);\n  const skip = parseInt(req.query.skip, 0);\n  try {\n    const articles = await _article2.default.list({\n      limit,\n      skip\n    });\n    return res.status(_httpStatus2.default.OK).json(articles);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function updateArticle(req, res) {\n  try {\n    const article = await _article2.default.findById(req.params.id);\n\n    if (!article.user.equals(req.user._id)) {\n      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);\n    }\n\n    Object.keys(req.body).forEach(key => {\n      article[key] = req.body[key];\n    });\n\n    return res.status(_httpStatus2.default.OK).json((await article.save()));\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nasync function deleteArticle(req, res) {\n  try {\n    const article = await _article2.default.findById(req.params.id);\n\n    if (!article.user.equals(req.user._id)) {\n      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);\n    }\n\n    await article.remove();\n    return res.sendStatus(_httpStatus2.default.OK);\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\n//# sourceURL=webpack:///./src/modules/articles/article.controllers.js?");

/***/ }),

/***/ "./src/modules/articles/article.model.js":
/*!***********************************************!*\
  !*** ./src/modules/articles/article.model.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _slug = __webpack_require__(/*! slug */ \"slug\");\n\nvar _slug2 = _interopRequireDefault(_slug);\n\nvar _mongooseUniqueValidator = __webpack_require__(/*! mongoose-unique-validator */ \"mongoose-unique-validator\");\n\nvar _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);\n\nvar _pythonShell = __webpack_require__(/*! python-shell */ \"./node_modules/python-shell/index.js\");\n\nvar _pythonShell2 = _interopRequireDefault(_pythonShell);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst ArticleSchema = new _mongoose.Schema({\n  title: {\n    type: String,\n    trim: true,\n    required: [true, 'Title is required'],\n    minlength: [3, 'Title need to be longer'],\n    unique: true\n  },\n  text: {\n    type: String,\n    trim: true,\n    required: [true, 'Text is required'],\n    minlength: [10, 'Text need to be longer']\n  },\n  summary: {\n    type: String,\n    trim: true,\n    minLength: [10, 'Summary need to be longer']\n  },\n  slug: {\n    type: String,\n    trim: true,\n    lowercase: true\n  },\n  user: {\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'User'\n  },\n  favoriteCount: {\n    type: Number,\n    default: 0\n  }\n}, {\n  timestamps: true\n});\n\nArticleSchema.plugin(_mongooseUniqueValidator2.default, {\n  message: '{VALUE} already taken!'\n});\n\nArticleSchema.pre('validate', function (next) {\n  this._slugify();\n\n  next();\n});\n\nArticleSchema.methods = {\n  _slugify() {\n    this.slug = (0, _slug2.default)(this.title);\n  },\n  toJSON() {\n    return {\n      _id: this._id,\n      title: this.title,\n      text: this.text,\n      createdAt: this.createdAt,\n      slug: this.slug,\n      user: this.user,\n      favoriteCount: this.favoriteCount\n    };\n  }\n};\n\nArticleSchema.statics = {\n  createArticle(args, user) {\n    return this.create(Object.assign({}, args, {\n      user\n    }));\n  },\n  list({\n    skip = 0,\n    limit = 5\n  } = {}) {\n    return this.find().sort({\n      createdAt: -1\n    }).skip(skip).limit(limit).populate('user');\n  },\n  summarizeText(post, title, text) {\n    console.log('inside summarizeText');\n    const shellOptions = {\n      pythonPath: '/usr/bin/python3',\n      pythonOptions: ['-u'],\n      args: [title, text]\n    };\n    const shell = new _pythonShell2.default('/Summarization/Engine/predicter.py', shellOptions);\n    shell.on('message', summary => {\n      console.log(summary);\n      post.summary = summary;\n      post.save();\n    });\n    shell.end((err, code, signal) => {\n      if (err) throw err;\n      console.log('The exit code was: ', code);\n      console.log('The exit signal was: ', signal);\n      console.log('python-shell has finished excuting');\n    });\n  }\n};\n\nexports.default = _mongoose2.default.model('Article', ArticleSchema);\n\n//# sourceURL=webpack:///./src/modules/articles/article.model.js?");

/***/ }),

/***/ "./src/modules/articles/article.routes.js":
/*!************************************************!*\
  !*** ./src/modules/articles/article.routes.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _expressValidation = __webpack_require__(/*! express-validation */ \"express-validation\");\n\nvar _expressValidation2 = _interopRequireDefault(_expressValidation);\n\nvar _article = __webpack_require__(/*! ./article.validations */ \"./src/modules/articles/article.validations.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nvar _article3 = __webpack_require__(/*! ./article.controllers */ \"./src/modules/articles/article.controllers.js\");\n\nvar articleController = _interopRequireWildcard(_article3);\n\nvar _auth = __webpack_require__(/*! ../../services/auth.services */ \"./src/services/auth.services.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst routes = new _express.Router();\n\nroutes.post('/', _auth.authJwt, (0, _expressValidation2.default)(_article2.default.createArticle), articleController.createArticle);\nroutes.get('/:id', articleController.getArticleById);\nroutes.get('/', articleController.getArticlesList);\nroutes.patch('/:id', _auth.authJwt, (0, _expressValidation2.default)(_article2.default.updateArticle), articleController.updateArticle);\nroutes.delete('/:id', _auth.authJwt, articleController.deleteArticle);\n\nexports.default = routes;\n\n//# sourceURL=webpack:///./src/modules/articles/article.routes.js?");

/***/ }),

/***/ "./src/modules/articles/article.validations.js":
/*!*****************************************************!*\
  !*** ./src/modules/articles/article.validations.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _joi = __webpack_require__(/*! joi */ \"joi\");\n\nvar _joi2 = _interopRequireDefault(_joi);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = {\n  createArticle: {\n    body: {\n      title: _joi2.default.string().min(3).required(),\n      text: _joi2.default.string().min(10).required()\n    }\n  },\n  updateArticle: {\n    body: {\n      title: _joi2.default.string().min(3),\n      text: _joi2.default.string().min(10)\n    }\n  }\n};\n\n//# sourceURL=webpack:///./src/modules/articles/article.validations.js?");

/***/ }),

/***/ "./src/modules/index.js":
/*!******************************!*\
  !*** ./src/modules/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _user = __webpack_require__(/*! ./users/user.routes */ \"./src/modules/users/user.routes.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _article = __webpack_require__(/*! ./articles/article.routes */ \"./src/modules/articles/article.routes.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = app => {\n  app.use('/api/v1/users', _user2.default);\n  app.use('/api/v1/articles', _article2.default);\n};\n\n//# sourceURL=webpack:///./src/modules/index.js?");

/***/ }),

/***/ "./src/modules/users/user.controllers.js":
/*!***********************************************!*\
  !*** ./src/modules/users/user.controllers.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.signup = signup;\nexports.login = login;\n\nvar _user = __webpack_require__(/*! ./user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _httpStatus = __webpack_require__(/*! http-status */ \"http-status\");\n\nvar _httpStatus2 = _interopRequireDefault(_httpStatus);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nasync function signup(req, res) {\n  try {\n    const user = await _user2.default.create(req.body);\n    return res.status(_httpStatus2.default.CREATED).json(user.toAuthJSON());\n  } catch (e) {\n    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);\n  }\n}\n\nfunction login(req, res, next) {\n  res.status(_httpStatus2.default.OK).json(req.user.toAuthJSON());\n  return next();\n}\n\n//# sourceURL=webpack:///./src/modules/users/user.controllers.js?");

/***/ }),

/***/ "./src/modules/users/user.model.js":
/*!*****************************************!*\
  !*** ./src/modules/users/user.model.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _validator = __webpack_require__(/*! validator */ \"validator\");\n\nvar _validator2 = _interopRequireDefault(_validator);\n\nvar _bcryptNodejs = __webpack_require__(/*! bcrypt-nodejs */ \"bcrypt-nodejs\");\n\nvar _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nvar _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);\n\nvar _constants = __webpack_require__(/*! ../../config/constants */ \"./src/config/constants.js\");\n\nvar _constants2 = _interopRequireDefault(_constants);\n\nvar _mongooseUniqueValidator = __webpack_require__(/*! mongoose-unique-validator */ \"mongoose-unique-validator\");\n\nvar _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst UserSchema = new _mongoose.Schema({\n  email: {\n    type: String,\n    unique: true,\n    required: true,\n    trim: true,\n    validate: {\n      validator(email) {\n        return _validator2.default.isEmail(email);\n      },\n      message: '{VALUE} is not a valid email!'\n    }\n  },\n  firstName: {\n    type: String,\n    required: [true, 'First name is required'],\n    trim: true\n  },\n  lastName: {\n    type: String,\n    required: [true, 'Last name is required'],\n    trim: true\n  },\n  userName: {\n    type: String,\n    required: [true, 'User name is required'],\n    trim: true,\n    unique: true\n  },\n  password: {\n    type: String,\n    required: [true, 'Password is required'],\n    trim: true,\n    minlength: [6, 'Password need to be longer']\n  }\n}, {\n  timestamps: true\n});\n\nUserSchema.plugin(_mongooseUniqueValidator2.default, {\n  message: '{VALUE} already taken!'\n});\n\nUserSchema.pre('save', function (next) {\n  if (this.isModified('password')) {\n    this.password = this._hashPassword(this.password);\n  }\n\n  return next();\n});\n\nUserSchema.methods = {\n  _hashPassword(password) {\n    return (0, _bcryptNodejs.hashSync)(password);\n  },\n  authenticateUser(password) {\n    return (0, _bcryptNodejs.compareSync)(password, this.password);\n  },\n  createToken() {\n    return _jsonwebtoken2.default.sign({\n      _id: this._id\n    }, _constants2.default.JWT_SECRET);\n  },\n  toAuthJSON() {\n    return {\n      _id: this._id,\n      userName: this.userName,\n      token: `JWT ${this.createToken()}`\n    };\n  },\n  toJSON() {\n    return {\n      _id: this._id,\n      userName: this.userName\n    };\n  }\n};\n\nexports.default = _mongoose2.default.model('User', UserSchema);\n\n//# sourceURL=webpack:///./src/modules/users/user.model.js?");

/***/ }),

/***/ "./src/modules/users/user.routes.js":
/*!******************************************!*\
  !*** ./src/modules/users/user.routes.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _auth = __webpack_require__(/*! ../../services/auth.services */ \"./src/services/auth.services.js\");\n\nvar _user = __webpack_require__(/*! ./user.controllers */ \"./src/modules/users/user.controllers.js\");\n\nvar userController = _interopRequireWildcard(_user);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nconst routes = new _express.Router();\n\nroutes.post('/signup', userController.signup);\nroutes.post('/login', _auth.authLocal, userController.login);\n\nexports.default = routes;\n\n//# sourceURL=webpack:///./src/modules/users/user.routes.js?");

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

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack:///external_%22child_process%22?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"events\");\n\n//# sourceURL=webpack:///external_%22events%22?");

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

/***/ "slug":
/*!***********************!*\
  !*** external "slug" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"slug\");\n\n//# sourceURL=webpack:///external_%22slug%22?");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=webpack:///external_%22util%22?");

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