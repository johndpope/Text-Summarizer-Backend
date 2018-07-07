module.exports=function(t){var e={};function a(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,a),r.l=!0,r.exports}return a.m=t,a.c=e,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(i,r,function(e){return t[e]}.bind(null,r));return i},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=6)}([function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(2),r=f(i),o=f(a(36)),s=a(35),n=f(a(34)),u=f(a(19)),l=a(1),d=f(a(3)),c=f(a(9));function f(t){return t&&t.__esModule?t:{default:t}}const p=new i.Schema({email:{type:String,unique:!0,trim:!0,validate:{validator:t=>o.default.isEmail(t),message:"{VALUE} is not a valid email!"}},firstName:{type:String,trim:!0},lastName:{type:String,trim:!0},userName:{type:String,required:[!0,"User name is required"],trim:!0,unique:!0},photo:{type:String,trim:!0},password:{type:String,trim:!0,minlength:[6,"Password need to be longer"]},twitter:{id:String,fullName:String,screenName:String},favourites:{articles:[{type:i.Schema.Types.ObjectId,ref:"Article"}]},toRead:{articles:[{type:i.Schema.Types.ObjectId,ref:"Article"}]},followings:[{type:i.Schema.Types.ObjectId,ref:"User"}],followers:[{type:i.Schema.Types.ObjectId,ref:"User"}]},{timestamps:!0});p.plugin(u.default,{message:"{VALUE} already taken!"}),p.pre("save",function(t){return this.isModified("password")&&(this.password=this._hashPassword(this.password)),t()}),p.methods={_hashPassword:t=>(0,s.hashSync)(t),authenticateUser(t){return(0,s.compareSync)(t,this.password)},createToken(){return n.default.sign({_id:this._id},d.default.JWT_SECRET)},toAuthJSON(){return{_id:this._id,userName:this.userName,photo:this.photo,twitter:this.twitter,token:`JWT ${this.createToken()}`,favourites:this.favourites,toRead:this.toRead,followings:this.followings,followers:this.followers,photo:this.photo}},toJSON(){return{_id:this._id,userName:this.userName,firstName:this.firstName,lastName:this.lastName,favourites:this.favourites,toRead:this.toRead,followings:this.followings,followers:this.followers,photo:this.photo}},savePhoto(t){l.minioClient.putObject("mybucket",t.originalname,t.buffer,"application/octet-stream",function(t,e){if(t)return console.log(t);console.log("File uploaded successfully.")}),this.photo=t.originalname,this.save()},_favourites:{async articles(t){return this.favourites.articles.indexOf(t)>=0?(this.favourites.articles.remove(t),await c.default.decFavourite(t)):(this.favourites.articles.push(t),await c.default.incFavourite(t)),this.save()},isArticleIsFavourite(t){return this.favourites.articles.indexOf(t)>=0}},_toRead:{async articles(t){return this.toRead.articles.indexOf(t)>=0?(this.toRead.articles.remove(t),await c.default.removeToRead(t)):(this.toRead.articles.push(t),await c.default.addToRead(t)),this.save()}},_followings:{async add(t){this.followings.indexOf(t)>=0?(console.log("removing user from following list"),this.followings.remove(t)):(console.log("adding new user to following list"),this.followings.push(t)),this.save()}},_followers:{async add(t){this.followers.indexOf(t)>=0?(console.log("removing user from followers list"),this.followers.remove(t)):(console.log("adding new user to followers list"),this.followers.push(t)),this.save()}}},p.statics={async checkFollower(t,e){(await this.findById(t))._followers.add(e)}},e.default=r.default.model("User",p)},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.minioClient=void 0;var i=a(20);e.minioClient=new i.Client({endPoint:"play.minio.io",port:9e3,secure:!0,accessKey:"Q3AM3UQ867SPQQA43P2F",secretKey:"zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG"})},function(t,e){t.exports=require("mongoose")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i={MONGO_URL:"mongodb://admin:admin@ds251518.mlab.com:51518/likerss"},r={PORT:process.env.PORT||3e3,JWT_SECRET:"thisIsASecret"};e.default=Object.assign({},r,i)},function(t,e){t.exports=require("passport")},function(t,e){t.exports=require("express")},function(t,e,a){"use strict";var i=u(a(5)),r=u(a(3));a(48);var o=u(a(47)),s=u(a(42)),n=u(a(21));function u(t){return t&&t.__esModule?t:{default:t}}const l=(0,i.default)();l.use((0,n.default)({secret:"this is my secret session"})),(0,o.default)(l),l.get("/",(t,e)=>{e.status(200).send("Hello World!")}),(0,s.default)(l),l.listen(r.default.PORT,t=>{if(t)throw t;console.log(`\n       Server running on port: ${r.default.PORT}\n       ---\n       Running on: production\n       ---\n       Make something great\n       `)}),t.exports=l},,function(t,e){t.exports=require("http-status")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(2),r=l(i),o=l(a(18)),s=l(a(19)),n=l(a(33)),u=a(1);function l(t){return t&&t.__esModule?t:{default:t}}const d=new i.Schema({title:{type:String,trim:!0,required:[!0,"Title is required"],minlength:[3,"Title need to be longer"],maxlength:[24,"Title need to be shorter"],unique:!0},text:{type:String,trim:!0,required:[!0,"Text is required"],minlength:[10,"Text need to be longer"]},summary:{type:String,trim:!0,minLength:[10,"Summary need to be longer"]},photo:{type:String,trim:!0},slug:{type:String,trim:!0,lowercase:!0},user:{type:i.Schema.Types.ObjectId,ref:"User"},favouriteCount:{type:Number,default:0},toReadFlag:{type:Boolean,default:!1}},{timestamps:!0});d.plugin(s.default,{message:"{VALUE} already taken!"}),d.pre("validate",function(t){this._slugify(),t()}),d.methods={_slugify(){this.slug=(0,o.default)(this.title)},toJSON(){return{_id:this._id,title:this.title,text:this.text,summary:this.summary,createdAt:this.createdAt,user:this.user,favoriteCount:this.favoriteCount,photo:this.photo}},savePhoto(t){u.minioClient.putObject("mybucket",t.originalname,t.buffer,"application/octet-stream",function(t,e){if(t)return console.log(t);console.log("File uploaded successfully.")}),this.photo=t.originalname,this.save()}},d.statics={createArticle(t,e){return this.create(Object.assign({},t,{user:e}))},list({skip:t=0,limit:e=5}={}){return this.find().sort({createdAt:-1}).skip(t).limit(e).populate("user")},summarizeText(t,e,a){console.log("inside summarizeText");const i={pythonPath:"/usr/bin/python3",pythonOptions:["-u"],args:[e,a]},r=new n.default("/Summarization/Engine/predicter.py",i);r.on("message",e=>{console.log(e),t.summary=e,t.save()}),r.end((t,e,a)=>{if(t)throw t;console.log("The exit code was: ",e),console.log("The exit signal was: ",a),console.log("python-shell has finished excuting")})},incFavourite(t){return this.findByIdAndUpdate(t,{$inc:{favouriteCount:1}})},decFavourite(t){return this.findByIdAndUpdate(t,{$inc:{favouriteCount:-1}})},addToRead(t){return this.findByIdAndUpdate(t,{toReadFlag:!0})},removeToRead(t){return this.findByIdAndUpdate(t,{toReadFlag:!1})}},e.default=r.default.model("Article",d)},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.authJwt=e.authLocal=void 0;var i=u(a(4)),r=u(a(38)),o=a(37),s=u(a(0)),n=u(a(3));function u(t){return t&&t.__esModule?t:{default:t}}const l=new r.default({usernameField:"email"},async(t,e,a)=>{try{const i=await s.default.findOne({email:t});return i&&i.authenticateUser(e)?a(null,i):a(null,!1)}catch(t){return a(t,!1)}}),d={jwtFromRequest:o.ExtractJwt.fromAuthHeaderWithScheme("jwt"),secretOrKey:n.default.JWT_SECRET},c=new o.Strategy(d,async(t,e)=>{try{const a=await s.default.findById(t._id);return e(null,a?a:!1)}catch(t){return e(t,!1)}});i.default.use(l),i.default.use(c);e.authLocal=i.default.authenticate("local",{session:!1}),e.authJwt=i.default.authenticate("jwt",{session:!1})},function(t,e){t.exports=require("multer")},,,,,function(t,e){t.exports=require("joi")},function(t,e){t.exports=require("express-validation")},function(t,e){t.exports=require("slug")},function(t,e){t.exports=require("mongoose-unique-validator")},function(t,e){t.exports=require("minio")},function(t,e){t.exports=require("express-session")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(2),r=s(i),o=(s(a(18)),a(1));function s(t){return t&&t.__esModule?t:{default:t}}const n=new i.Schema({title:{type:String,trim:!0,required:[!0,"Collection title is requires"],minlength:[3,"Title need to be longer"],maxlength:[24,"Title need to be shorter"],unique:!0},description:{type:String,trim:!0,required:!1,minlength:[5,"Description need to be longer"],maxlength:[48,"Description need to be shorter"]},photo:{type:String,trim:!0},user:{type:i.Schema.Types.ObjectId,ref:"User"},articles:[{type:i.Schema.Types.ObjectId,ref:"Article"}]},{timestamps:!0});n.methods={toJSON(){return{_id:this._id,title:this.title,description:this.description,photo:this.photo,user:this.user,articles:this.articles,createdAt:this.createdAt}},savePhoto(t){o.minioClient.putObject("mybucket",t.originalname,t.buffer,"application/octet-stream",function(t,e){if(t)return console.log(t);console.log("File uploaded successfully.")}),this.photo=t.originalname,this.save()},_articles:{add(t){this.articles.indexOf(t)>=0?(console.log("removing article from collection"),this.articles.remove(t)):(console.log("adding article to collection"),this.articles.push(t)),this.save()}}},n.statics={createCollection(t,e){return this.create(Object.assign({},t,{user:e}))}},e.default=r.default.model("Collection",n)},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createCollection=async function(t,e){try{const a=await r.default.createCollection(t.body,t.user._id);return t.file&&await a.savePhoto(t.file),e.status(i.default.CREATED).json(a)}catch(t){e.status(i.default.BAD_REQUEST).json(t)}},e.updateCollection=async function(t,e){try{const a=await r.default.findById(t.params.id);return a.user.equals(t.user._id)?(Object.keys(t.body).forEach(e=>{a[e]=t.body[e]}),t.file&&await a.savePhoto(t.file),e.status(i.default.OK).json(await a.save())):e.sendStatus(i.default.UNAUTHORIZED)}catch(t){return e.status(i.default.BAD_REQUEST).json(t)}},e.getCollectionById=async function(t,e,a){try{const u=await r.default.findById(t.params.id).populate("articles").populate("user");if(!u.photo)return e.status(i.default.OK).json(u),a();var s=0,n="";o.minioClient.getObject("mybucket",u.photo,(t,r)=>{if(t)return console.log(t);r.on("data",t=>{s+=t.length,n+=t}),r.on("end",()=>(console.log("End. Total size = "+s),u.photo=n,e.status(i.default.OK).json(u),a()))})}catch(t){return e.status(i.default.BAD_REQUEST).json(t)}},e.addArticleToCollection=async function(t,e){try{const a=await r.default.findById(t.params.cid);return console.log(a),await a._articles.add(t.params.aid),e.sendStatus(i.default.OK)}catch(t){return e.status(i.default.BAD_REQUEST).json(t)}},e.deleteCollection=async function(t,e){try{const a=await r.default.findById(t.params.id);return a.user.equals(t.user._id)?(await a.remove(),e.sendStatus(i.default.OK)):e.sendStatus(i.default.UNAUTHORIZED)}catch(t){return e.status(i.default.BAD_REQUEST).json(t)}},e.getUserCollections=async function(t,e){try{const a=await r.default.find({user:t.params.uid}).populate("articles");return e.status(i.default.OK).json(a)}catch(t){return e.status(i.default.BAD_REQUEST).json(t)}};var i=s(a(8)),r=s(a(22)),o=(s(a(0)),a(1));function s(t){return t&&t.__esModule?t:{default:t}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){return t&&t.__esModule?t:{default:t}}(a(16));e.default={createCollection:{body:{title:i.default.string().min(3).max(24).required(),description:i.default.string().min(10).max(48)}},updateCollection:{body:{title:i.default.string().min(5).max(24),description:i.default.string().min(10).max(48)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(5),r=l(a(17)),o=l(a(11)),s=l(a(24)),n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(23)),u=a(10);function l(t){return t&&t.__esModule?t:{default:t}}const d=new i.Router;d.post("/",u.authJwt,(0,o.default)({storage:o.default.memoryStorage()}).single("photo"),(0,r.default)(s.default.createCollection),n.createCollection),d.patch("/:id",u.authJwt,(0,o.default)({storage:o.default.memoryStorage()}).single("photo"),(0,r.default)(s.default.updateCollection),n.updateCollection),d.get("/:id",u.authJwt,n.getCollectionById),d.post("/:cid/:aid",u.authJwt,n.addArticleToCollection),d.delete("/:id",u.authJwt,n.deleteCollection),d.get("/user/:uid",u.authJwt,n.getUserCollections),e.default=d},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createArticle=async function(t,e){console.log("inside the controller");try{const a=await s.default.createArticle(t.body,t.user._id);return await s.default.summarizeText(a,t.body.title,t.body.text),t.file&&await a.savePhoto(t.file),e.status(i.default.CREATED).json(a)}catch(t){e.status(i.default.BAD_REQUEST).json(t)}},e.getArticleById=async function(t,e){try{const u=await Promise.all([o.default.findById(t.user._id),s.default.findById(t.params.id).populate("user")]),l=u[0]._favourites.isArticleIsFavourite(t.params.id),d=u[1];if(t.file){var a=0,n="";r.minioClient.getObject("mybucket",d.photo,(t,r)=>{if(t)return console.log(t);r.on("data",t=>{a+=t.length,n+=t}),r.on("end",()=>(console.log("End. Total size = "+a),d.photo=n,e.status(i.default.OK).json(Object.assign({},d.toJSON(),{favourite:l}))))})}return e.status(i.default.OK).json(Object.assign({},d.toJSON(),{favourite:l}))}catch(t){return e.status(i.default.BAD_REQUEST).json(t)}},e.getArticlesList=async function(t,e){try{const a=await Promise.all([o.default.findById(t.user._id),s.default.list({limit:parseInt(t.query.limit,0),skip:parseInt(t.query.skip,0)})]),r=a[1].reduce((t,e)=>{const i=a[0]._favourites.isArticleIsFavourite(e._id);return t.push(Object.assign({},e.toJSON(),{favourite:i})),t},[]);return e.status(i.default.OK).json(r)}catch(t){e.status(i.default.BAD_REQUEST).json(t)}},e.updateArticle=async function(t,e){try{const a=await s.default.findById(t.params.id);return a.user.equals(t.user._id)?(Object.keys(t.body).forEach(e=>{a[e]=t.body[e]}),t.file?(await a.savePhoto(t.file),e.status(i.default.OK).json(a)):e.status(i.default.OK).json(await a.save())):e.sendStatus(i.default.UNAUTHORIZED)}catch(t){return e.status(i.default.BAD_REQUEST).json(t)}},e.deleteArticle=async function(t,e){try{const a=await s.default.findById(t.params.id);return a.user.equals(t.user._id)?(await a.remove(),e.sendStatus(i.default.OK)):e.sendStatus(i.default.UNAUTHORIZED)}catch(t){return e.status(i.default.BAD_REQUEST).json(t)}},e.favouriteArticle=async function(t,e){try{const a=await o.default.findById(t.user._id);return await a._favourites.articles(t.params.id),e.sendStatus(i.default.OK)}catch(t){e.status(i.default.BAD_REQUEST).json(t)}},e.toReadArticle=async function(t,e){try{const a=await o.default.findById(t.user._id);return await a._toRead.articles(t.params.id),e.sendStatus(i.default.OK)}catch(t){e.status(i.default.BAD_REQUEST).json(t)}};var i=n(a(8)),r=a(1),o=n(a(0)),s=n(a(9));function n(t){return t&&t.__esModule?t:{default:t}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){return t&&t.__esModule?t:{default:t}}(a(16));e.default={createArticle:{body:{title:i.default.string().min(3).max(24).required(),text:i.default.string().min(10).required()}},updateArticle:{body:{title:i.default.string().min(3).max(24),text:i.default.string().min(10)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(5),r=l(a(17)),o=l(a(11)),s=l(a(27)),n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(26)),u=a(10);function l(t){return t&&t.__esModule?t:{default:t}}const d=new i.Router;d.post("/",u.authJwt,(0,o.default)({storage:o.default.memoryStorage()}).single("photo"),(0,r.default)(s.default.createArticle),n.createArticle),d.get("/:id",u.authJwt,n.getArticleById),d.get("/",u.authJwt,n.getArticlesList),d.patch("/:id",u.authJwt,(0,o.default)({storage:o.default.memoryStorage()}).single("photo"),(0,r.default)(s.default.updateArticle),n.updateArticle),d.delete("/:id",u.authJwt,n.deleteArticle),d.post("/:id/favourite",u.authJwt,n.favouriteArticle),d.post("/:id/toread",u.authJwt,n.toReadArticle),e.default=d},function(t,e){t.exports=require("fs")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.signup=async function(t,e){try{const a=await r.default.create(t.body);return e.status(i.default.CREATED).json(a.toAuthJSON())}catch(t){return e.status(i.default.BAD_REQUEST).json(t)}},e.twitterSignup=async function(t,e){try{!function(t,e){r.default.findOne({"twitter.id":t.id},(a,o)=>{if(o)return e.status(i.default.OK).json(o.toAuthJSON());{const a={id:t.id,fullName:t.displayName,screenName:t.username};var s=new r.default({userName:a.screenName,photo:t.photos[0].value,twitter:a});s.save((t,a)=>t?e.status(i.default.BAD_REQUEST):e.status(i.default.OK).json(a.toAuthJSON()))}})}(t.user,e)}catch(t){return e.status(i.default.BAD_REQUEST).json(t)}},e.login=function(t,e,a){try{const r=t.user;o.default.find({_id:{$in:r.favourites.articles}},(t,n)=>{r.favourites.articles=n,o.default.find({_id:{$in:r.toRead.articles}},(t,o)=>{if(r.toRead.articles=o,!r.photo)return e.status(i.default.OK).json(r.toAuthJSON()),a();var n=0,u="";s.minioClient.getObject("mybucket",r.photo,(t,o)=>{if(t)return console.log(t);o.on("data",t=>{n+=t.length,u+=t}),o.on("end",()=>(console.log("End. Total size = "+n),r.photo=u,e.status(i.default.OK).json(r),a()))})})})}catch(t){return e.status(i.default.BAD_REQUEST).json(t)}},e.follow=async function(t,e){try{const a=await r.default.findById(t.user._id);return t.user._id.equals(t.params.id)?e.sendStatus(i.default.BAD_REQUEST):(await a._followings.add(t.params.id),await r.default.checkFollower(t.params.id,t.user.id),e.sendStatus(i.default.OK))}catch(t){return e.status(i.default.BAD_REQUEST).json(t)}},e.update=async function(t,e){try{const a=await r.default.findById(t.user._id);return Object.keys(t.body).forEach(e=>{a[e]=t.body[e]}),t.file?(await a.savePhoto(t.file),e.status(i.default.OK).json(a)):e.status(i.default.OK).json(await a.save())}catch(t){return e.status(i.default.BAD_REQUEST).json(t)}},e.findUserById=async function(t,e){try{const a=await r.default.findById(t.params.id);return a?e.status(i.default.OK).json(a.toJSON()):e.status(i.default.BAD_REQUEST).json({message:"User not found!"})}catch(t){return e.status(i.default.BAD_REQUEST).josn(t)}};var i=n(a(8)),r=(n(a(29)),n(a(0))),o=n(a(9)),s=a(1);function n(t){return t&&t.__esModule?t:{default:t}}},function(t,e){t.exports=require("passport-twitter")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.authTwitterCallback=e.authTwitter=void 0;var i=o(a(4)),r=a(31);o(a(0)),o(a(3));function o(t){return t&&t.__esModule?t:{default:t}}const s=new r.Strategy({consumerKey:"EGLoBrQWNNtCDLYQKh6pupRO1",consumerSecret:"9FNzG4LlhCOhnNOf9VGS2SHQXAILjiLXTWfOrr9MT7W6nV05ww",callbackURL:"http://127.0.0.1:3000/api/v1/users/auth/twitter/callback"},async(t,e,a,i)=>{try{return i(null,a)}catch(t){return i(t,!1)}});i.default.use(s);e.authTwitter=i.default.authenticate("twitter",{session:!1}),e.authTwitterCallback=i.default.authenticate("twitter",{session:!1,failureRedirect:"/"})},function(t,e){t.exports=require("python-shell")},function(t,e){t.exports=require("jsonwebtoken")},function(t,e){t.exports=require("bcrypt-nodejs")},function(t,e){t.exports=require("validator")},function(t,e){t.exports=require("passport-jwt")},function(t,e){t.exports=require("passport-local")},function(t,e){t.exports=require("passport-facebook")},function(t,e){t.exports=require("path")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(5),r=(u(a(40)),u(a(11))),o=(u(a(20)),u(a(4)),u(a(39)),a(10)),s=a(32),n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(30));a(1);function u(t){return t&&t.__esModule?t:{default:t}}const l=new i.Router;l.get("/:id",n.findUserById),l.post("/signup",n.signup),l.post("/login",o.authLocal,n.login),l.post("/:id/follow",o.authJwt,n.follow),l.patch("/update",o.authJwt,(0,r.default)({storage:r.default.memoryStorage()}).single("photo"),n.update),l.get("/login/twitter",s.authTwitter),l.get("/auth/twitter/callback",s.authTwitterCallback,n.twitterSignup),e.default=l},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(a(41)),r=s(a(28)),o=s(a(25));function s(t){return t&&t.__esModule?t:{default:t}}e.default=(t=>{t.use("/api/v1/users",i.default),t.use("/api/v1/articles",r.default),t.use("/api/v1/collections",o.default)})},function(t,e){t.exports=require("helmet")},function(t,e){t.exports=require("compression")},function(t,e){t.exports=require("body-parser")},function(t,e){t.exports=require("morgan")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=u(a(46)),r=u(a(45)),o=u(a(44)),s=u(a(43)),n=u(a(4));function u(t){return t&&t.__esModule?t:{default:t}}e.default=(t=>{t.use((0,o.default)()),t.use((0,s.default)()),t.use(r.default.json()),t.use(r.default.urlencoded({extended:!0})),t.use(n.default.initialize()),t.use((0,i.default)("combined"))})},function(t,e,a){"use strict";var i=o(a(2)),r=o(a(3));function o(t){return t&&t.__esModule?t:{default:t}}i.default.Promise=global.Promise;try{i.default.connect(r.default.MONGO_URL)}catch(t){i.default.createConnection(r.default.MONGO_URL)}i.default.connection.once("open",()=>console.log("MongodDB Running")).on("error",t=>{throw t})}]);