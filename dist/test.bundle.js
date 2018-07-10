module.exports=function(e){var t={};function o(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o.w={},o(o.s=55)}([function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(2),a=f(n),s=f(o(36)),i=o(35),r=f(o(34)),u=f(o(19)),l=o(1),d=f(o(3)),c=f(o(4));function f(e){return e&&e.__esModule?e:{default:e}}const p=new n.Schema({email:{type:String,unique:!0,trim:!0,validate:{validator:e=>s.default.isEmail(e),message:"{VALUE} is not a valid email!"}},firstName:{type:String,trim:!0},lastName:{type:String,trim:!0},userName:{type:String,required:[!0,"User name is required"],trim:!0,unique:!0},photo:{type:String,trim:!0},password:{type:String,trim:!0,minlength:[6,"Password need to be longer"]},twitter:{id:String,fullName:String,screenName:String},favourites:{articles:[{type:n.Schema.Types.ObjectId,ref:"Article"}]},toRead:{articles:[{type:n.Schema.Types.ObjectId,ref:"Article"}]},followings:[{type:n.Schema.Types.ObjectId,ref:"User"}],followers:[{type:n.Schema.Types.ObjectId,ref:"User"}]},{timestamps:!0});p.plugin(u.default,{message:"{VALUE} already taken!"}),p.pre("save",function(e){return this.isModified("password")&&(this.password=this._hashPassword(this.password)),e()}),p.methods={_hashPassword:e=>(0,i.hashSync)(e),authenticateUser(e){return(0,i.compareSync)(e,this.password)},createToken(){return r.default.sign({_id:this._id},d.default.JWT_SECRET)},toAuthJSON(){return{_id:this._id,userName:this.userName,photo:this.photo,twitter:this.twitter,token:`JWT ${this.createToken()}`,favourites:this.favourites,toRead:this.toRead,followings:this.followings,followers:this.followers,photo:this.photo}},toJSON(){return{_id:this._id,userName:this.userName,firstName:this.firstName,lastName:this.lastName,favourites:this.favourites,toRead:this.toRead,followings:this.followings,followers:this.followers,photo:this.photo}},savePhoto(e){l.minioClient.putObject("mybucket",e.originalname,e.buffer,"application/octet-stream",function(e,t){if(e)return console.log(e);console.log("File uploaded successfully.")}),this.photo=e.originalname,this.save()},_favourites:{async articles(e){return this.favourites.articles.indexOf(e)>=0?(this.favourites.articles.remove(e),await c.default.decFavourite(e)):(this.favourites.articles.push(e),await c.default.incFavourite(e)),this.save()},isArticleIsFavourite(e){return this.favourites.articles.indexOf(e)>=0}},_toRead:{async articles(e){return this.toRead.articles.indexOf(e)>=0?(this.toRead.articles.remove(e),await c.default.removeToRead(e)):(this.toRead.articles.push(e),await c.default.addToRead(e)),this.save()}},_followings:{async add(e){this.followings.indexOf(e)>=0?(console.log("removing user from following list"),this.followings.remove(e)):(console.log("adding new user to following list"),this.followings.push(e)),this.save()}},_followers:{async add(e){this.followers.indexOf(e)>=0?(console.log("removing user from followers list"),this.followers.remove(e)):(console.log("adding new user to followers list"),this.followers.push(e)),this.save()}}},p.statics={async checkFollower(e,t){(await this.findById(e))._followers.add(t)},async isFollowed(e,t){const o=await this.findById(e);let n=!1;return n=await o.followers.indexOf(t)>=0}},t.default=a.default.model("User",p)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.minioClient=void 0;var n=o(20);t.minioClient=new n.Client({endPoint:"play.minio.io",port:9e3,secure:!0,accessKey:"Q3AM3UQ867SPQQA43P2F",secretKey:"zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG"})},function(e,t){e.exports=require("mongoose")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n={MONGO_URL:"mongodb://admin:admin@ds251518.mlab.com:51518/likerss"},a={PORT:process.env.PORT||3e3,JWT_SECRET:"thisIsASecret"};t.default=Object.assign({},a,n)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(2),a=l(n),s=l(o(18)),i=l(o(19)),r=l(o(33)),u=o(1);function l(e){return e&&e.__esModule?e:{default:e}}const d=new n.Schema({title:{type:String,trim:!0,required:[!0,"Title is required"],minlength:[3,"Title need to be longer"],maxlength:[24,"Title need to be shorter"],unique:!0},text:{type:String,trim:!0,required:[!0,"Text is required"],minlength:[10,"Text need to be longer"]},summary:{type:String,trim:!0,minLength:[10,"Summary need to be longer"]},photo:{type:String,trim:!0},slug:{type:String,trim:!0,lowercase:!0},user:{type:n.Schema.Types.ObjectId,ref:"User"},favouriteCount:{type:Number,default:0},toReadFlag:{type:Boolean,default:!1}},{timestamps:!0});d.plugin(i.default,{message:"{VALUE} already taken!"}),d.pre("validate",function(e){this._slugify(),e()}),d.methods={_slugify(){this.slug=(0,s.default)(this.title)},toJSON(){return{_id:this._id,title:this.title,text:this.text,summary:this.summary,createdAt:this.createdAt,user:this.user,favoriteCount:this.favoriteCount,photo:this.photo}},savePhoto(e){u.minioClient.putObject("mybucket",e.originalname,e.buffer,"application/octet-stream",function(e,t){if(e)return console.log(e);console.log("File uploaded successfully.")}),this.photo=e.originalname,this.save()}},d.statics={createArticle(e,t){return this.create(Object.assign({},e,{user:t}))},list({skip:e=0,limit:t=5}={}){return this.find().sort({createdAt:-1}).skip(e).limit(t).populate("user")},summarizeText(e,t,o){console.log("inside summarizeText");const n={pythonPath:"/usr/bin/python3",pythonOptions:["-u"],args:[t,o]},a=new r.default("/Summarization/Engine/predicter.py",n);a.on("message",t=>{console.log(t),e.summary=t,e.save()}),a.end((e,t,o)=>{if(e)throw e;console.log("The exit code was: ",t),console.log("The exit signal was: ",o),console.log("python-shell has finished excuting")})},incFavourite(e){return this.findByIdAndUpdate(e,{$inc:{favouriteCount:1}})},decFavourite(e){return this.findByIdAndUpdate(e,{$inc:{favouriteCount:-1}})},addToRead(e){return this.findByIdAndUpdate(e,{toReadFlag:!0})},removeToRead(e){return this.findByIdAndUpdate(e,{toReadFlag:!1})}},t.default=a.default.model("Article",d)},function(e,t){e.exports=require("passport")},function(e,t){e.exports=require("express")},function(e,t,o){"use strict";var n=u(o(6)),a=u(o(3));o(48);var s=u(o(47)),i=u(o(42)),r=u(o(21));function u(e){return e&&e.__esModule?e:{default:e}}const l=(0,n.default)();l.use((0,r.default)({secret:"this is my secret session"})),(0,s.default)(l),l.get("/",(e,t)=>{t.status(200).send("Hello World!")}),(0,i.default)(l),l.listen(a.default.PORT,e=>{if(e)throw e;console.log(`\n       Server running on port: ${a.default.PORT}\n       ---\n       Running on: production\n       ---\n       Make something great\n       `)}),e.exports=l},function(e,t){e.exports=require("supertest")},function(e,t){e.exports=require("http-status")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.authJwt=t.authLocal=void 0;var n=u(o(5)),a=u(o(38)),s=o(37),i=u(o(0)),r=u(o(3));function u(e){return e&&e.__esModule?e:{default:e}}const l=new a.default({usernameField:"email"},async(e,t,o)=>{try{const n=await i.default.findOne({email:e});return n&&n.authenticateUser(t)?o(null,n):o(null,!1)}catch(e){return o(e,!1)}}),d={jwtFromRequest:s.ExtractJwt.fromAuthHeaderWithScheme("jwt"),secretOrKey:r.default.JWT_SECRET},c=new s.Strategy(d,async(e,t)=>{try{const o=await i.default.findById(e._id);return t(null,o?o:!1)}catch(e){return t(e,!1)}});n.default.use(l),n.default.use(c);t.authLocal=n.default.authenticate("local",{session:!1}),t.authJwt=n.default.authenticate("jwt",{session:!1})},function(e,t){e.exports=require("multer")},function(e,t){e.exports=require("faker")},function(e,t){e.exports=require("assert")},function(e,t){e.exports=require("chai")},function(e,t){e.exports=require("sinon")},function(e,t){e.exports=require("joi")},function(e,t){e.exports=require("express-validation")},function(e,t){e.exports=require("slug")},function(e,t){e.exports=require("mongoose-unique-validator")},function(e,t){e.exports=require("minio")},function(e,t){e.exports=require("express-session")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(2),a=i(n),s=(i(o(18)),o(1));function i(e){return e&&e.__esModule?e:{default:e}}const r=new n.Schema({title:{type:String,trim:!0,required:[!0,"Collection title is requires"],minlength:[3,"Title need to be longer"],maxlength:[24,"Title need to be shorter"],unique:!0},description:{type:String,trim:!0,required:!1,minlength:[5,"Description need to be longer"],maxlength:[48,"Description need to be shorter"]},photo:{type:String,trim:!0},user:{type:n.Schema.Types.ObjectId,ref:"User"},articles:[{type:n.Schema.Types.ObjectId,ref:"Article"}]},{timestamps:!0});r.methods={toJSON(){return{_id:this._id,title:this.title,description:this.description,photo:this.photo,user:this.user,articles:this.articles,createdAt:this.createdAt}},savePhoto(e){s.minioClient.putObject("mybucket",e.originalname,e.buffer,"application/octet-stream",function(e,t){if(e)return console.log(e);console.log("File uploaded successfully.")}),this.photo=e.originalname,this.save()},_articles:{add(e){this.articles.indexOf(e)>=0?(console.log("removing article from collection"),this.articles.remove(e)):(console.log("adding article to collection"),this.articles.push(e)),this.save()}}},r.statics={createCollection(e,t){return this.create(Object.assign({},e,{user:t}))},list(){return this.find().sort({createdAt:-1}).populate("user")}},t.default=a.default.model("Collection",r)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createCollection=async function(e,t){try{const o=await a.default.createCollection(e.body,e.user._id);return e.file&&await o.savePhoto(e.file),t.status(n.default.CREATED).json(o)}catch(e){t.status(n.default.BAD_REQUEST).json(e)}},t.updateCollection=async function(e,t){try{const o=await a.default.findById(e.params.id);return o.user.equals(e.user._id)?(Object.keys(e.body).forEach(t=>{o[t]=e.body[t]}),e.file&&await o.savePhoto(e.file),t.status(n.default.OK).json(await o.save())):t.sendStatus(n.default.UNAUTHORIZED)}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.getCollectionById=async function(e,t,o){try{const u=await a.default.findById(e.params.id).populate("articles").populate("user");if(!u.photo)return t.status(n.default.OK).json(u),o();var i=0,r="";s.minioClient.getObject("mybucket",u.photo,(e,a)=>{if(e)return console.log(e);a.on("data",e=>{i+=e.length,r+=e}),a.on("end",()=>(console.log("End. Total size = "+i),u.photo=r,t.status(n.default.OK).json(u),o()))})}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.addArticleToCollection=async function(e,t){try{const o=await a.default.findById(e.params.cid);return console.log(o),await o._articles.add(e.params.aid),t.sendStatus(n.default.OK)}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.deleteCollection=async function(e,t){try{const o=await a.default.findById(e.params.id);return o.user.equals(e.user._id)?(await o.remove(),t.sendStatus(n.default.OK)):t.sendStatus(n.default.UNAUTHORIZED)}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.getUserCollections=async function(e,t){try{const o=await a.default.find({user:e.params.uid}).populate("articles");return t.status(n.default.OK).json({data:o})}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}};var n=i(o(9)),a=i(o(22)),s=(i(o(0)),o(1));function i(e){return e&&e.__esModule?e:{default:e}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,a=o(16),s=(n=a)&&n.__esModule?n:{default:n};t.default={createCollection:{body:{title:s.default.string().min(3).max(24).required(),description:s.default.string().min(10).max(48)}},updateCollection:{body:{title:s.default.string().min(5).max(24),description:s.default.string().min(10).max(48)}}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(6),a=l(o(17)),s=l(o(11)),i=l(o(24)),r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t.default=e,t}(o(23)),u=o(10);function l(e){return e&&e.__esModule?e:{default:e}}const d=new n.Router;d.post("/",u.authJwt,(0,s.default)({storage:s.default.memoryStorage()}).single("photo"),(0,a.default)(i.default.createCollection),r.createCollection),d.patch("/:id",u.authJwt,(0,s.default)({storage:s.default.memoryStorage()}).single("photo"),(0,a.default)(i.default.updateCollection),r.updateCollection),d.get("/:id",u.authJwt,r.getCollectionById),d.post("/:cid/:aid",u.authJwt,r.addArticleToCollection),d.delete("/:id",u.authJwt,r.deleteCollection),d.get("/user/:uid",u.authJwt,r.getUserCollections),t.default=d},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createArticle=async function(e,t){console.log("inside the controller");try{const o=await i.default.createArticle(e.body,e.user._id);return await i.default.summarizeText(o,e.body.title,e.body.text),e.file&&await o.savePhoto(e.file),t.status(n.default.CREATED).json(o)}catch(e){t.status(n.default.BAD_REQUEST).json(e)}},t.getArticleById=async function(e,t){try{const u=await Promise.all([s.default.findById(e.user._id),i.default.findById(e.params.id).populate("user")]),l=u[0]._favourites.isArticleIsFavourite(e.params.id),d=u[1];if(e.file){var o=0,r="";a.minioClient.getObject("mybucket",d.photo,(e,a)=>{if(e)return console.log(e);a.on("data",e=>{o+=e.length,r+=e}),a.on("end",()=>(console.log("End. Total size = "+o),d.photo=r,t.status(n.default.OK).json(Object.assign({},d.toJSON(),{favourite:l}))))})}return t.status(n.default.OK).json(Object.assign({},d.toJSON(),{favourite:l}))}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.getArticlesList=async function(e,t){try{const o=await Promise.all([s.default.findById(e.user._id),i.default.list({limit:parseInt(e.query.limit,0),skip:parseInt(e.query.skip,0)})]),a=o[1].reduce((e,t)=>{const n=o[0]._favourites.isArticleIsFavourite(t._id);return e.push(Object.assign({},t.toJSON(),{favourite:n})),e},[]);return t.status(n.default.OK).json({data:a})}catch(e){t.status(n.default.BAD_REQUEST).json(e)}},t.updateArticle=async function(e,t){try{const o=await i.default.findById(e.params.id);return o.user.equals(e.user._id)?(Object.keys(e.body).forEach(t=>{o[t]=e.body[t]}),e.file?(await o.savePhoto(e.file),t.status(n.default.OK).json(o)):t.status(n.default.OK).json(await o.save())):t.sendStatus(n.default.UNAUTHORIZED)}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.deleteArticle=async function(e,t){try{const o=await i.default.findById(e.params.id);return o.user.equals(e.user._id)?(await o.remove(),t.sendStatus(n.default.OK)):t.sendStatus(n.default.UNAUTHORIZED)}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.favouriteArticle=async function(e,t){try{const o=await s.default.findById(e.user._id);await o._favourites.articles(e.params.id);const a=o._favourites.isArticleIsFavourite(e.params.id);return t.status(n.default.OK).json({isFavourited:a})}catch(e){t.status(n.default.BAD_REQUEST).json(e)}},t.toReadArticle=async function(e,t){try{const o=await s.default.findById(e.user._id);return await o._toRead.articles(e.params.id),t.sendStatus(n.default.OK)}catch(e){t.status(n.default.BAD_REQUEST).json(e)}};var n=r(o(9)),a=o(1),s=r(o(0)),i=r(o(4));function r(e){return e&&e.__esModule?e:{default:e}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,a=o(16),s=(n=a)&&n.__esModule?n:{default:n};t.default={createArticle:{body:{title:s.default.string().min(3).max(24).required(),text:s.default.string().min(10).required()}},updateArticle:{body:{title:s.default.string().min(3).max(24),text:s.default.string().min(10)}}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(6),a=l(o(17)),s=l(o(11)),i=l(o(27)),r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t.default=e,t}(o(26)),u=o(10);function l(e){return e&&e.__esModule?e:{default:e}}const d=new n.Router;d.post("/",u.authJwt,(0,s.default)({storage:s.default.memoryStorage()}).single("photo"),(0,a.default)(i.default.createArticle),r.createArticle),d.get("/:id",u.authJwt,r.getArticleById),d.get("/",u.authJwt,r.getArticlesList),d.patch("/:id",u.authJwt,(0,s.default)({storage:s.default.memoryStorage()}).single("photo"),(0,a.default)(i.default.updateArticle),r.updateArticle),d.delete("/:id",u.authJwt,r.deleteArticle),d.post("/:id/favourite",u.authJwt,r.favouriteArticle),d.post("/:id/toread",u.authJwt,r.toReadArticle),t.default=d},function(e,t){e.exports=require("fs")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.signup=async function(e,t){try{const o=await a.default.create(e.body);return t.status(n.default.CREATED).json(o.toAuthJSON())}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.twitterSignup=async function(e,t){try{!function(e,t){a.default.findOne({"twitter.id":e.id},(o,s)=>{if(s)return t.status(n.default.OK).json(s.toAuthJSON());{const o={id:e.id,fullName:e.displayName,screenName:e.username};var i=new a.default({userName:o.screenName,photo:e.photos[0].value,twitter:o});i.save((e,o)=>e?t.status(n.default.BAD_REQUEST):t.status(n.default.OK).json(o.toAuthJSON()))}})}(e.user,t)}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.login=function(e,t,o){try{const r=e.user;if(!r.photo)return t.status(n.default.OK).json(r.toAuthJSON()),o();var a=0,s="";i.minioClient.getObject("mybucket",r.photo,(e,i)=>{if(e)return console.log(e);i.on("data",e=>{a+=e.length,s+=e}),i.on("end",()=>(console.log("End. Total size = "+a),r.photo=s,t.status(n.default.OK).json(r),o()))})}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.follow=async function(e,t){try{const s=await a.default.findById(e.user._id);if(e.user._id.equals(e.params.id))return t.sendStatus(n.default.BAD_REQUEST);await s._followings.add(e.params.id),await a.default.checkFollower(e.params.id,e.user.id);var o=await a.default.isFollowed(e.params.id,e.user.id);return t.status(n.default.OK).json({isFollowed:o})}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.update=async function(e,t){try{const o=await a.default.findById(e.user._id);return Object.keys(e.body).forEach(t=>{o[t]=e.body[t]}),e.file?(await o.savePhoto(e.file),t.status(n.default.OK).json(o)):t.status(n.default.OK).json(await o.save())}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.findUserById=async function(e,t){try{const o=await a.default.findById(e.params.id);return o?t.status(n.default.OK).json(o.toJSON()):t.status(n.default.BAD_REQUEST).json({message:"User not found!"})}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.getFavouritesList=async function(e,t){try{a.default.findById(e.params.id,(e,o)=>{s.default.find({_id:{$in:o.favourites.articles}},(e,o)=>t.status(n.default.OK).json(o))})}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}},t.getToreadsList=function(e,t,o){try{a.default.findById(e.params.id,(e,o)=>{s.default.find({_id:{$in:o.toRead.articles}},(e,o)=>t.status(n.default.OK).json(o))})}catch(e){return t.status(n.default.BAD_REQUEST).json(e)}};var n=r(o(9)),a=(r(o(29)),r(o(0))),s=r(o(4)),i=o(1);function r(e){return e&&e.__esModule?e:{default:e}}},function(e,t){e.exports=require("passport-twitter")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.authTwitterCallback=t.authTwitter=void 0;var n=s(o(5)),a=o(31);s(o(0)),s(o(3));function s(e){return e&&e.__esModule?e:{default:e}}const i=new a.Strategy({consumerKey:"EGLoBrQWNNtCDLYQKh6pupRO1",consumerSecret:"9FNzG4LlhCOhnNOf9VGS2SHQXAILjiLXTWfOrr9MT7W6nV05ww",callbackURL:"http://127.0.0.1:3000/api/v1/users/auth/twitter/callback"},async(e,t,o,n)=>{try{return n(null,o)}catch(e){return n(e,!1)}});n.default.use(i);t.authTwitter=n.default.authenticate("twitter",{session:!1}),t.authTwitterCallback=n.default.authenticate("twitter",{session:!1,failureRedirect:"/"})},function(e,t){e.exports=require("python-shell")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("bcrypt-nodejs")},function(e,t){e.exports=require("validator")},function(e,t){e.exports=require("passport-jwt")},function(e,t){e.exports=require("passport-local")},function(e,t){e.exports=require("passport-facebook")},function(e,t){e.exports=require("path")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(6),a=(u(o(40)),u(o(11))),s=(u(o(20)),u(o(5)),u(o(39)),o(10)),i=o(32),r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t.default=e,t}(o(30));o(1);function u(e){return e&&e.__esModule?e:{default:e}}const l=new n.Router;l.get("/:id",r.findUserById),l.post("/signup",r.signup),l.post("/login",s.authLocal,r.login),l.post("/:id/follow",s.authJwt,r.follow),l.patch("/update",s.authJwt,(0,a.default)({storage:a.default.memoryStorage()}).single("photo"),r.update),l.get("/login/twitter",i.authTwitter),l.get("/auth/twitter/callback",i.authTwitterCallback,r.twitterSignup),l.get("/:id/favourites",s.authJwt,r.getFavouritesList),l.get("/:id/toread",s.authJwt,r.getToreadsList),t.default=l},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(o(41)),a=i(o(28)),s=i(o(25));function i(e){return e&&e.__esModule?e:{default:e}}t.default=(e=>{e.use("/api/v1/users",n.default),e.use("/api/v1/articles",a.default),e.use("/api/v1/collections",s.default)})},function(e,t){e.exports=require("helmet")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("morgan")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=u(o(46)),a=u(o(45)),s=u(o(44)),i=u(o(43)),r=u(o(5));function u(e){return e&&e.__esModule?e:{default:e}}t.default=(e=>{e.use((0,s.default)()),e.use((0,i.default)()),e.use(a.default.json()),e.use(a.default.urlencoded({extended:!0})),e.use(r.default.initialize()),e.use((0,n.default)("combined"))})},function(e,t,o){"use strict";var n=s(o(2)),a=s(o(3));function s(e){return e&&e.__esModule?e:{default:e}}n.default.Promise=global.Promise;try{n.default.connect(a.default.MONGO_URL)}catch(e){n.default.createConnection(a.default.MONGO_URL)}n.default.connection.once("open",()=>console.log("MongodDB Running")).on("error",e=>{throw e})},function(e,t){e.exports=require("mongodb")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.testArticleRoutes=function(){describe.only("Testing Article routes",function(){let e,t;var n,a=o(49).ObjectID;new a;i.seed(30);const l={irstName:i.name.firstName(),lastName:i.name.lastName(),email:i.internet.email(),password:i.internet.password(),userName:i.internet.userName()},d={title:i.lorem.words(),text:i.lorem.paragraphs()};before("should create new user",t=>{r.post("/signup").send(l).expect(201).end(function(o,a){n=a.body.token,e=a.body,s(201),t()})}),it("should create new article",e=>{u.post("/").set({authorization:n}).send(d).expect(201).end((o,n)=>{t=n.body,s(o).to.be.null,s(201),e()})}),it("should get an article by its id",e=>{u.get(`/${t._id}`).set({authorization:n}).expect(200).end((t,o)=>{s(t).to.be.null,s(200),e()})}),it("should modify the article",e=>{u.patch(`/${t._id}`).set({authorization:n}).send({title:"this is a new title"}).expect(200).end((t,o)=>{s(t).to.be.null,s(o.body).to.be.an("object"),e()})}),it("should add a pic to the article",e=>{u.patch(`/${t._id}`).set({authorization:n}).attach("photo","/home/dania/Octave/cartoon.jpeg").expect(200).end((t,o)=>{s(t).to.be.null,s(o.body).to.be.an("object"),e()})}),it("should favourite an article",e=>{u.post(`/${t._id}/favourite`).set({authorization:n}).expect(200).end((t,o)=>{s(t).to.be.null,s(o.body).to.be.an("object"),e()})}),it("should favourite an article",e=>{u.post(`/${t._id}/toread`).set({authorization:n}).expect(200).end((t,o)=>{s(t).to.be.null,s(o.body).to.be.an("object"),e()})}),it("should delete an article",e=>{u.delete(`/${t._id}`).set({authorization:n}).expect(200).end((t,o)=>{s(t).to.be.null,s(o.body).to.be.an("object"),e()})})})};n(o(0)),n(o(4));function n(e){return e&&e.__esModule?e:{default:e}}o(15);let a=o(14),s=(o(2),o(13),a.expect),i=o(12),r=o(8)("http://localhost:3000/api/v1/users"),u=o(8)("http://localhost:3000/api/v1/articles");o(7)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.testArticleModel=function(){describe("Testing Article Model",function(){var e,t=o(49).ObjectID,n=new t;l.seed(801);const a={title:l.lorem.words(),slug:l.lorem.slug(),text:l.lorem.paragraphs(),summary:l.lorem.paragraph(),user:n};before("should create a new article",t=>{e=new s.default(a),console.log(e),e.save().then(()=>{r(!e.isNew),t()})}),it("Modifies the title of the created article",function(t){l.seed(200),s.default.findOneAndUpdate({_id:e._id},{title:l.lorem.words()},(e,o)=>{u(o).to.not.be.undefined,u(o._id).to.not.be.undefined,u(o.text).to.not.be.undefined,u(o.title).to.not.be.undefined,u(o.slug).to.not.be.undefined,u(o.summary).to.not.be.undefined,u(e).to.be.null,t()})}),it("Modifies the text of the created article",function(t){l.seed(300),s.default.findOneAndUpdate({_id:e._id},{text:l.lorem.paragraphs()},(e,o)=>{u(o).to.not.be.undefined,u(o).to.not.be.undefined,u(o._id).to.not.be.undefined,u(o.text).to.not.be.undefined,u(o.title).to.not.be.undefined,u(o.slug).to.not.be.undefined,u(o.summary).to.not.be.undefined,u(e).to.be.null,t()})}),it("Finds the created article",function(t){s.default.findOne({_id:e._id},(e,o)=>{u(o).to.not.be.undefined,u(o).to.not.be.undefined,u(o._id).to.not.be.undefined,u(o.text).to.not.be.undefined,u(o.title).to.not.be.undefined,u(o.slug).to.not.be.undefined,u(o.summary).to.not.be.undefined,u(e).to.be.null,t()})}),it("Deletes the created article",function(t){s.default.findOneAndRemove({_id:e._id},(e,o)=>{u(o).to.not.be.undefined,u(o).to.be.an("object"),u(e).to.be.null,t()})})})};var n,a=o(4),s=(n=a)&&n.__esModule?n:{default:n};o(15);let i=o(14),r=(o(2),o(13)),u=i.expect,l=o(12);o(8)("http://localhost:3000/api/v1/users");o(7)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.mockDB=function(){describe("User Mocks",function(){l.seed(99);const e={firstName:l.name.firstName(),lastName:l.name.lastName(),email:l.internet.email(),password:l.internet.password(),userName:l.internet.userName()};it("Should create a new user",function(t){const o=new s.default(e),n=i.mock(o),a=n.object;n.expects("save").yields(null),a.save(e=>{n.verify(),n.restore(),u(e).to.be.null,t()})}),it("Should return error if user isn't created",function(t){const o=new s.default(e),n=i.mock(o),a=n.object;n.expects("save").yields({name:"ValidationError"}),a.save((e,o)=>{n.verify(),n.restore(),u(e.name).to.equal("ValidationError"),u(o).to.be.undefined,t()})}),it("Should find user by email",function(t){const o=i.mock(s.default),n=e;o.expects("findOne").withArgs({email:e.email}).yields(null,n),s.default.findOne({email:e.email},(n,a)=>{o.verify(),o.restore(),u(a.email).to.equal(e.email),t()})}),it("Should remove a user",function(t){const o=i.mock(s.default);o.expects("remove").withArgs({email:e.email}).yields(null,{nRemoved:1}),s.default.remove({email:e.email},(e,n)=>{o.verify(),o.restore(),u(e).to.be.null,u(n.nRemoved).to.equal(1),t()})})})};var n,a=o(0),s=(n=a)&&n.__esModule?n:{default:n};let i=o(15),r=o(14),u=(o(2),o(13),r.expect),l=o(12);o(8)("http://localhost:3000/api/v1/users");o(7)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.testRoutes=function(){describe("Testing User routes",function(){let e,t;r.seed(99);const o={irstName:r.name.firstName(),lastName:r.name.lastName(),email:r.internet.email(),password:r.internet.password(),userName:r.internet.userName()};r.seed(100);const n={irstName:r.name.firstName(),lastName:r.name.lastName(),email:r.internet.email(),password:r.internet.password(),userName:r.internet.userName()};it("should create new user",t=>{u.post("/signup").send(o).end(function(o,n){e=n.body.token,i(n.body._id).to.not.be.undefined,i(n.body.userName).to.not.be.undefined,i(n.body.token).to.not.be.undefined,i(n.body._id).to.be.a("string"),i(n.body.userName).to.be.a("string"),i(n.body.token).to.be.a("string"),i(n.statusCode).to.be.eq(201),i(o).to.be.null,i(201),t()})}),it("should login",t=>{u.post("/login").send({email:o.email,password:o.password}).query(e).expect(200).end((e,o)=>{i(o.body._id).to.not.be.undefined,i(o.body.userName).to.not.be.undefined,i(o.body.token).to.not.be.undefined,i(o.body._id).to.be.a("string"),i(o.body.userName).to.be.a("string"),i(o.body.token).to.be.a("string"),i(o.statusCode).to.be.eq(200),i(e).to.be.null,i(200),t()})}),it("should create new user2",e=>{u.post("/signup").send(n).end(function(o,n){t=n.body._id,i(201),i(n.body._id).to.not.be.undefined,i(n.body.userName).to.not.be.undefined,i(n.body.token).to.not.be.undefined,i(n.body._id).to.be.a("string"),i(n.body.userName).to.be.a("string"),i(n.body.token).to.be.a("string"),i(n.statusCode).to.be.eq(201),i(o).to.be.null,i(201),e()})}),it("user1 should follow user2",o=>{u.post(`/${t}/follow`).set({authorization:e}).expect(200).end((e,t)=>{i(e).to.be.null,i(t.body).to.be.an("object"),o()})}),it("should update user photo",t=>{u.patch("/update").set({authorization:e}).attach("photo","/home/dania/Octave/cartoon.jpeg").expect(200).end((e,o)=>{i(e).to.be.null,i(o.body).to.be.an("object"),t()})}),it("should change user's last name",t=>{u.patch("/update").set({authorization:e}).send({lastName:"XXX"}).expect(200).end((e,o)=>{i(e).to.be.null,i(o.body).to.be.an("object"),t()})}),it("should change user's password",t=>{u.patch("/update").set({authorization:e}).send({password:"newpass"}).expect(200).end((e,o)=>{i(e).to.be.null,i(o.body).to.be.an("object"),t()})}),it("try login with old password",t=>{u.post("/login").send({email:o.email,password:o.password}).query(e).expect(401).end((e,o)=>{i(e).to.be.null,i(o.body).to.be.an("object"),t()})}),it("should login with the new password",t=>{u.post("/login").send({email:o.email,password:"newpass"}).query(e).expect(200).end((e,o)=>{i(o.body._id).to.not.be.undefined,i(o.body.userName).to.not.be.undefined,i(o.body.token).to.not.be.undefined,i(o.body._id).to.be.a("string"),i(o.body.userName).to.be.a("string"),i(o.body.token).to.be.a("string"),i(o.statusCode).to.be.eq(200),i(e).to.be.null,i(200),t()})})})};var n,a=o(0);(n=a)&&n.__esModule;o(15);let s=o(14),i=(o(2),o(13),s.expect),r=o(12),u=o(8)("http://localhost:3000/api/v1/users");o(7)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.testModels=function(){describe("Testing User Model",function(){let e;l.seed(1e3);const t={firstName:l.name.firstName(),lastName:l.name.lastName(),email:l.internet.email(),password:l.internet.password(),userName:l.internet.userName()},o={firstName:l.name.firstName(),lastName:l.name.lastName(),email:l.internet.email(),password:l.internet.password()};before("Creates a new user to test it",function(o){(e=new s.default(t)).save().then(()=>{r(!e.isNew),o()})}),it("Modifies the created user",function(t){s.default.findOneAndUpdate({_id:e._id},{lastName:"Ref"},(e,o)=>{u(o).to.not.be.undefined,u(o).to.be.an("object"),u(o._id).to.not.be.undefined,u(o.userName).to.not.be.undefined,u(o.lastName).to.not.be.undefined,u(o.email).to.not.be.undefined,u(o.password).to.not.be.undefined,u(o.userName).to.not.be.undefined,u(o.email).to.match(/^.+@.+\..+$/),u(o.password).to.be.a("string"),u(o.firstName).to.be.a("string"),u(o.lastName).to.be.a("string"),u(o.userName).to.be.a("string"),u(o.email).to.be.a("string"),u(e).to.be.null,t()})}),it("Finds the created user",function(t){s.default.findOne({_id:e._id},(e,o)=>{u(o).to.not.be.undefined,u(o).to.be.an("object"),u(o._id).to.not.be.undefined,u(o.userName).to.not.be.undefined,u(o.lastName).to.not.be.undefined,u(o.email).to.not.be.undefined,u(o.password).to.not.be.undefined,u(o.userName).to.not.be.undefined,u(o.email).to.match(/^.+@.+\..+$/),u(o.password).to.be.a("string"),u(o.firstName).to.be.a("string"),u(o.lastName).to.be.a("string"),u(o.userName).to.be.a("string"),u(o.email).to.be.a("string"),u(e).to.be.null,t()})}),it("Deletes the created user",function(t){s.default.findOneAndRemove({_id:e._id},(e,o)=>{u(o).to.not.be.undefined,u(o).to.be.an("object"),u(e).to.be.null,t()})}),it("Missing userName",function(t){(e=new s.default(o)).save().then(()=>{r(e.isNew)}),t()}),it("Invalid email",function(o){(e=new s.default({firstName:t.firstName,lastName:t.lastName,email:"poldi1234@.com",password:t.password,userName:t.userName})).save().then(()=>{r(e.isNew)}),o()}),it("Weak password",function(o){(e=new s.default({firstName:t.firstName,lastName:t.lastName,email:t.email,password:"aaaaa123",userName:t.userName})).save().then(()=>{r(e.isNew)}),o()}),it("Short password",function(o){(e=new s.default({firstName:t.firstName,lastName:t.lastName,email:t.email,password:"aa23",userName:t.userName})).save().then(()=>{r(e.isNew)}),o()})})};var n,a=o(0),s=(n=a)&&n.__esModule?n:{default:n};o(15);let i=o(14),r=(o(2),o(13)),u=i.expect,l=o(12);o(8)("http://localhost:3000/api/v1/users");o(7)},function(e,t,o){"use strict";var n,a=o(0);(n=a)&&n.__esModule;o(15);let s=o(14),i=o(2);o(13),s.expect,o(12);o(8)("http://localhost:3000/api/v1/users");o(7);let r=o(54),u=o(53),l=o(52),d=o(51),c=o(50);before("Connecting to DB",function(e){i.connect("mongodb://localhost:27017/supreme-posts-test"),i.connection.once("open",()=>{console.log("connected to mongoDB"),i.connection.collections.users.drop(),e()}).on("error",e=>{throw e})}),u.testRoutes(),r.testModels(),l.mockDB(),d.testArticleModel(),c.testArticleRoutes()}]);