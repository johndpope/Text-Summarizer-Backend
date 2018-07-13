module.exports=function(t){var e={};function a(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,a),i.l=!0,i.exports}return a.m=t,a.c=e,a.d=function(t,e,s){a.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},a.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a.w={},a(a.s=7)}([function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(2),i=f(s),o=f(a(36)),r=a(35),n=f(a(34)),u=f(a(19)),l=a(1),d=f(a(3)),c=f(a(4));function f(t){return t&&t.__esModule?t:{default:t}}const p=new s.Schema({email:{type:String,unique:!0,trim:!0,validate:{validator:t=>o.default.isEmail(t),message:"{VALUE} is not a valid email!"}},firstName:{type:String,trim:!0},lastName:{type:String,trim:!0},userName:{type:String,required:[!0,"User name is required"],trim:!0,unique:!0},photo:{type:String,trim:!0},password:{type:String,trim:!0,minlength:[6,"Password need to be longer"]},twitter:{id:String,fullName:String,screenName:String},favourites:{articles:[{type:s.Schema.Types.ObjectId,ref:"Article"}]},toRead:{articles:[{type:s.Schema.Types.ObjectId,ref:"Article"}]},followings:[{type:s.Schema.Types.ObjectId,ref:"User"}],followers:[{type:s.Schema.Types.ObjectId,ref:"User"}]},{timestamps:!0});p.plugin(u.default,{message:"{VALUE} already taken!"}),p.pre("save",function(t){return this.isModified("password")&&(this.password=this._hashPassword(this.password)),t()}),p.methods={_hashPassword:t=>(0,r.hashSync)(t),authenticateUser(t){return(0,r.compareSync)(t,this.password)},createToken(){return n.default.sign({_id:this._id},d.default.JWT_SECRET)},toAuthJSON(){return{_id:this._id,userName:this.userName,photo:this.photo,twitter:this.twitter,token:`JWT ${this.createToken()}`,favourites:this.favourites,toRead:this.toRead,followings:this.followings,followers:this.followers,photo:this.photo}},toJSON(){return{_id:this._id,userName:this.userName,firstName:this.firstName,lastName:this.lastName,favourites:this.favourites,toRead:this.toRead,followings:this.followings,followers:this.followers,photo:this.photo}},savePhoto(t){l.minioClient.putObject("mybucket",t.originalname,t.buffer,"application/octet-stream",function(t,e){if(t)return console.log(t);console.log("File uploaded successfully.")}),this.photo=t.originalname,this.save()},_favourites:{async articles(t){return this.favourites.articles.indexOf(t)>=0?(this.favourites.articles.remove(t),await c.default.decFavourite(t)):(this.favourites.articles.push(t),await c.default.incFavourite(t)),this.save()},isArticleIsFavourite(t){return this.favourites.articles.indexOf(t)>=0}},_toRead:{async articles(t){return this.toRead.articles.indexOf(t)>=0?(this.toRead.articles.remove(t),await c.default.removeToRead(t)):(this.toRead.articles.push(t),await c.default.addToRead(t)),this.save()}},_followings:{async add(t){this.followings.indexOf(t)>=0?(console.log("removing user from following list"),this.followings.remove(t)):(console.log("adding new user to following list"),this.followings.push(t)),this.save()}},_followers:{async add(t){this.followers.indexOf(t)>=0?(console.log("removing user from followers list"),this.followers.remove(t)):(console.log("adding new user to followers list"),this.followers.push(t)),this.save()}}},p.statics={async checkFollower(t,e){(await this.findById(t))._followers.add(e)},async isFollowed(t,e){const a=await this.findById(t);let s=!1;return!(s=await a.followers.indexOf(e)>=0)}},e.default=i.default.model("User",p)},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.minioClient=void 0;var s=a(20);e.minioClient=new s.Client({endPoint:"play.minio.io",port:9e3,secure:!0,accessKey:"Q3AM3UQ867SPQQA43P2F",secretKey:"zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG"})},function(t,e){t.exports=require("mongoose")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s={MONGO_URL:"mongodb://admin:admin@ds251518.mlab.com:51518/likerss"},i={PORT:process.env.PORT||3e3,JWT_SECRET:"thisIsASecret"};e.default=Object.assign({},i,s)},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(2),i=l(s),o=l(a(18)),r=l(a(19)),n=l(a(33)),u=a(1);function l(t){return t&&t.__esModule?t:{default:t}}const d=new s.Schema({title:{type:String,trim:!0,required:[!0,"Title is required"],minlength:[3,"Title need to be longer"],maxlength:[24,"Title need to be shorter"],unique:!0},text:{type:String,trim:!0,required:[!0,"Text is required"],minlength:[10,"Text need to be longer"]},summary:{type:String,trim:!0,minLength:[10,"Summary need to be longer"]},photo:{type:String,trim:!0},slug:{type:String,trim:!0,lowercase:!0},user:{type:s.Schema.Types.ObjectId,ref:"User"},favouriteCount:{type:Number,default:0},toReadFlag:{type:Boolean,default:!1}},{timestamps:!0});d.plugin(r.default,{message:"{VALUE} already taken!"}),d.pre("validate",function(t){this._slugify(),t()}),d.methods={_slugify(){this.slug=(0,o.default)(this.title)},toJSON(){return{_id:this._id,title:this.title,text:this.text,summary:this.summary,createdAt:this.createdAt,user:this.user,favoriteCount:this.favoriteCount,photo:this.photo}},savePhoto(t){u.minioClient.putObject("mybucket",t.originalname,t.buffer,"application/octet-stream",function(t,e){if(t)return console.log(t);console.log("File uploaded successfully.")}),this.photo=t.originalname,this.save()}},d.statics={createArticle(t,e){return this.create(Object.assign({},t,{user:e}))},list({skip:t=0,limit:e=5}={}){return this.find().sort({createdAt:-1}).skip(t).limit(e).populate("user")},summarizeText(t,e,a){console.log("inside summarizeText");const s={pythonPath:"/usr/bin/python3",pythonOptions:["-u"],args:[e,a]},i=new n.default("/Summarization/Engine/predicter.py",s);i.on("message",e=>{console.log(e),t.summary=e,t.save()}),i.end((t,e,a)=>{if(t)throw t;console.log("The exit code was: ",e),console.log("The exit signal was: ",a),console.log("python-shell has finished excuting")})},incFavourite(t){return this.findByIdAndUpdate(t,{$inc:{favouriteCount:1}})},decFavourite(t){return this.findByIdAndUpdate(t,{$inc:{favouriteCount:-1}})},addToRead(t){return this.findByIdAndUpdate(t,{toReadFlag:!0})},removeToRead(t){return this.findByIdAndUpdate(t,{toReadFlag:!1})}},e.default=i.default.model("Article",d)},function(t,e){t.exports=require("passport")},function(t,e){t.exports=require("express")},function(t,e,a){"use strict";var s=u(a(6)),i=u(a(3));a(48);var o=u(a(47)),r=u(a(42)),n=u(a(21));function u(t){return t&&t.__esModule?t:{default:t}}const l=(0,s.default)();l.use((0,n.default)({secret:"this is my secret session"})),(0,o.default)(l),l.get("/",(t,e)=>{e.status(200).send("Hello World!")}),(0,r.default)(l),l.listen(i.default.PORT,t=>{if(t)throw t;console.log(`\n       Server running on port: ${i.default.PORT}\n       ---\n       Running on: production\n       ---\n       Make something great\n       `)}),t.exports=l},,function(t,e){t.exports=require("http-status")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.authJwt=e.authLocal=void 0;var s=u(a(5)),i=u(a(38)),o=a(37),r=u(a(0)),n=u(a(3));function u(t){return t&&t.__esModule?t:{default:t}}const l=new i.default({usernameField:"email"},async(t,e,a)=>{try{const s=await r.default.findOne({email:t});return s&&s.authenticateUser(e)?a(null,s):a(null,!1)}catch(t){return a(t,!1)}}),d={jwtFromRequest:o.ExtractJwt.fromAuthHeaderWithScheme("jwt"),secretOrKey:n.default.JWT_SECRET},c=new o.Strategy(d,async(t,e)=>{try{const a=await r.default.findById(t._id);return e(null,a?a:!1)}catch(t){return e(t,!1)}});s.default.use(l),s.default.use(c);e.authLocal=s.default.authenticate("local",{session:!1}),e.authJwt=s.default.authenticate("jwt",{session:!1})},function(t,e){t.exports=require("multer")},,,,,function(t,e){t.exports=require("joi")},function(t,e){t.exports=require("express-validation")},function(t,e){t.exports=require("slug")},function(t,e){t.exports=require("mongoose-unique-validator")},function(t,e){t.exports=require("minio")},function(t,e){t.exports=require("express-session")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(2),i=r(s),o=(r(a(18)),a(1));function r(t){return t&&t.__esModule?t:{default:t}}const n=new s.Schema({title:{type:String,trim:!0,required:[!0,"Collection title is requires"],minlength:[3,"Title need to be longer"],maxlength:[24,"Title need to be shorter"],unique:!0},description:{type:String,trim:!0,required:!1,minlength:[5,"Description need to be longer"],maxlength:[48,"Description need to be shorter"]},photo:{type:String,trim:!0},user:{type:s.Schema.Types.ObjectId,ref:"User"},articles:[{type:s.Schema.Types.ObjectId,ref:"Article"}]},{timestamps:!0});n.methods={toJSON(){return{_id:this._id,title:this.title,description:this.description,photo:this.photo,user:this.user,articles:this.articles,createdAt:this.createdAt}},savePhoto(t){o.minioClient.putObject("mybucket",t.originalname,t.buffer,"application/octet-stream",function(t,e){if(t)return console.log(t);console.log("File uploaded successfully.")}),this.photo=t.originalname,this.save()},_articles:{add(t){this.articles.indexOf(t)>=0?(console.log("removing article from collection"),this.articles.remove(t)):(console.log("adding article to collection"),this.articles.push(t)),this.save()}}},n.statics={createCollection(t,e){return this.create(Object.assign({},t,{user:e}))},list(){return this.find().sort({createdAt:-1}).populate("user")}},e.default=i.default.model("Collection",n)},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createCollection=async function(t,e){try{const a=await i.default.createCollection(t.body,t.user._id);return t.file&&await a.savePhoto(t.file),e.status(s.default.CREATED).json(a)}catch(t){e.status(s.default.BAD_REQUEST).json(t)}},e.updateCollection=async function(t,e){try{const a=await i.default.findById(t.params.id);return a.user.equals(t.user._id)?(Object.keys(t.body).forEach(e=>{a[e]=t.body[e]}),t.file&&await a.savePhoto(t.file),e.status(s.default.OK).json(await a.save())):e.sendStatus(s.default.UNAUTHORIZED)}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.getCollectionById=async function(t,e,a){try{const u=await i.default.findById(t.params.id).populate("articles").populate("user");if(!u.photo)return e.status(s.default.OK).json(u),a();var r=0,n="";o.minioClient.getObject("mybucket",u.photo,(t,i)=>{if(t)return console.log(t);i.on("data",t=>{r+=t.length,n+=t}),i.on("end",()=>(console.log("End. Total size = "+r),u.photo=n,e.status(s.default.OK).json(u),a()))})}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.addArticleToCollection=async function(t,e){try{const a=await i.default.findById(t.params.cid);return console.log(a),await a._articles.add(t.params.aid),e.sendStatus(s.default.OK)}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.deleteCollection=async function(t,e){try{const a=await i.default.findById(t.params.id);return a.user.equals(t.user._id)?(await a.remove(),e.sendStatus(s.default.OK)):e.sendStatus(s.default.UNAUTHORIZED)}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.getUserCollections=async function(t,e){try{const a=await i.default.find({user:t.params.uid}).populate("articles").populate("user");return e.status(s.default.OK).json({data:a})}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}};var s=r(a(9)),i=r(a(22)),o=(r(a(0)),a(1));function r(t){return t&&t.__esModule?t:{default:t}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,i=a(16),o=(s=i)&&s.__esModule?s:{default:s};e.default={createCollection:{body:{title:o.default.string().min(3).max(24).required(),description:o.default.string().min(10).max(48)}},updateCollection:{body:{title:o.default.string().min(5).max(24),description:o.default.string().min(10).max(48)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(6),i=l(a(17)),o=l(a(11)),r=l(a(24)),n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(23)),u=a(10);function l(t){return t&&t.__esModule?t:{default:t}}const d=new s.Router;d.post("/",u.authJwt,(0,o.default)({storage:o.default.memoryStorage()}).single("photo"),(0,i.default)(r.default.createCollection),n.createCollection),d.patch("/:id",u.authJwt,(0,o.default)({storage:o.default.memoryStorage()}).single("photo"),(0,i.default)(r.default.updateCollection),n.updateCollection),d.get("/:id",u.authJwt,n.getCollectionById),d.post("/:cid/:aid",u.authJwt,n.addArticleToCollection),d.delete("/:id",u.authJwt,n.deleteCollection),d.get("/user/:uid",u.authJwt,n.getUserCollections),e.default=d},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createArticle=async function(t,e){console.log("inside the controller");try{const a=await r.default.createArticle(t.body,t.user._id);return await r.default.summarizeText(a,t.body.title,t.body.text),t.file&&await a.savePhoto(t.file),e.status(s.default.CREATED).json(a)}catch(t){e.status(s.default.BAD_REQUEST).json(t)}},e.getArticleById=async function(t,e){try{const u=await Promise.all([o.default.findById(t.user._id),r.default.findById(t.params.id).populate("user")]),l=u[0]._favourites.isArticleIsFavourite(t.params.id),d=u[1];if(t.file){var a=0,n="";i.minioClient.getObject("mybucket",d.photo,(t,i)=>{if(t)return console.log(t);i.on("data",t=>{a+=t.length,n+=t}),i.on("end",()=>(console.log("End. Total size = "+a),d.photo=n,e.status(s.default.OK).json(Object.assign({},d.toJSON(),{favourite:l}))))})}return e.status(s.default.OK).json(Object.assign({},d.toJSON(),{favourite:l}))}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.getArticlesList=async function(t,e){try{const a=await Promise.all([o.default.findById(t.user._id),r.default.list({limit:parseInt(t.query.limit,0),skip:parseInt(t.query.skip,0)})]),i=a[1].reduce((t,e)=>{const s=a[0]._favourites.isArticleIsFavourite(e._id);return t.push(Object.assign({},e.toJSON(),{favourite:s})),t},[]);return e.status(s.default.OK).json({data:i})}catch(t){e.status(s.default.BAD_REQUEST).json(t)}},e.updateArticle=async function(t,e){try{const a=await r.default.findById(t.params.id);return a.user.equals(t.user._id)?(Object.keys(t.body).forEach(e=>{a[e]=t.body[e]}),t.file?(await a.savePhoto(t.file),e.status(s.default.OK).json(a)):e.status(s.default.OK).json(await a.save())):e.sendStatus(s.default.UNAUTHORIZED)}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.deleteArticle=async function(t,e){try{const a=await r.default.findById(t.params.id);return a.user.equals(t.user._id)?(await a.remove(),e.sendStatus(s.default.OK)):e.sendStatus(s.default.UNAUTHORIZED)}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.favouriteArticle=async function(t,e){try{const a=await o.default.findById(t.user._id);await a._favourites.articles(t.params.id);const i=a._favourites.isArticleIsFavourite(t.params.id);return e.status(s.default.OK).json({isFavourited:i})}catch(t){e.status(s.default.BAD_REQUEST).json(t)}},e.toReadArticle=async function(t,e){try{const a=await o.default.findById(t.user._id);return await a._toRead.articles(t.params.id),e.sendStatus(s.default.OK)}catch(t){e.status(s.default.BAD_REQUEST).json(t)}};var s=n(a(9)),i=a(1),o=n(a(0)),r=n(a(4));function n(t){return t&&t.__esModule?t:{default:t}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,i=a(16),o=(s=i)&&s.__esModule?s:{default:s};e.default={createArticle:{body:{title:o.default.string().min(3).max(24).required(),text:o.default.string().min(10).required()}},updateArticle:{body:{title:o.default.string().min(3).max(24),text:o.default.string().min(10)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(6),i=l(a(17)),o=l(a(11)),r=l(a(27)),n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(26)),u=a(10);function l(t){return t&&t.__esModule?t:{default:t}}const d=new s.Router;d.post("/",u.authJwt,(0,o.default)({storage:o.default.memoryStorage()}).single("photo"),(0,i.default)(r.default.createArticle),n.createArticle),d.get("/:id",u.authJwt,n.getArticleById),d.get("/",u.authJwt,n.getArticlesList),d.patch("/:id",u.authJwt,(0,o.default)({storage:o.default.memoryStorage()}).single("photo"),(0,i.default)(r.default.updateArticle),n.updateArticle),d.delete("/:id",u.authJwt,n.deleteArticle),d.post("/:id/favourite",u.authJwt,n.favouriteArticle),d.post("/:id/toread",u.authJwt,n.toReadArticle),e.default=d},function(t,e){t.exports=require("fs")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.signup=async function(t,e){try{const a=await i.default.create(t.body);return e.status(s.default.CREATED).json(a.toAuthJSON())}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.twitterSignup=async function(t,e){try{!function(t,e){i.default.findOne({"twitter.id":t.id},(a,o)=>{if(o)return e.status(s.default.OK).json(o.toAuthJSON());{const a={id:t.id,fullName:t.displayName,screenName:t.username};var r=new i.default({userName:a.screenName,photo:t.photos[0].value,twitter:a});r.save((t,a)=>t?e.status(s.default.BAD_REQUEST):e.status(s.default.OK).json(a.toAuthJSON()))}})}(t.user,e)}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.login=function(t,e,a){try{const n=t.user;if(!n.photo)return e.status(s.default.OK).json(n.toAuthJSON()),a();var i=0,o="";r.minioClient.getObject("mybucket",n.photo,(t,r)=>{if(t)return console.log(t);r.on("data",t=>{i+=t.length,o+=t}),r.on("end",()=>(console.log("End. Total size = "+i),n.photo=o,e.status(s.default.OK).json(n),a()))})}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.follow=async function(t,e){try{const o=await i.default.findById(t.user._id);if(t.user._id.equals(t.params.id))return e.sendStatus(s.default.BAD_REQUEST);await o._followings.add(t.params.id),await i.default.checkFollower(t.params.id,t.user.id);var a=await i.default.isFollowed(t.params.id,t.user.id);return e.status(s.default.OK).json({isFollowed:a})}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.update=async function(t,e){try{const a=await i.default.findById(t.user._id);return Object.keys(t.body).forEach(e=>{a[e]=t.body[e]}),t.file?(await a.savePhoto(t.file),e.status(s.default.OK).json(a)):e.status(s.default.OK).json(await a.save())}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.findUserById=async function(t,e){try{const a=await i.default.findById(t.params.id);return a?e.status(s.default.OK).json(a.toJSON()):e.status(s.default.BAD_REQUEST).json({message:"User not found!"})}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.getFollowers=async function(t,e){try{const a=await i.default.findById(t.params.id);if(!a)return e.status(s.default.BAD_REQUEST).json({message:"User not found!"});i.default.find({_id:{$in:a.followers}},(t,a)=>e.status(s.default.OK).json({data:a}))}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.getFollowing=async function(t,e){try{const a=await i.default.findById(t.params.id);if(!a)return e.status(s.default.BAD_REQUEST).json({message:"User not found!"});i.default.find({_id:{$in:a.followings}},(t,a)=>e.status(s.default.OK).json({data:a}))}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.getUserArticles=async function(t,e){try{const a=await i.default.findById(t.params.id);if(!a)return e.status(s.default.BAD_REQUEST).json({message:"User not found!"});o.default.find({user:{$in:a.id}},(t,a)=>e.status(s.default.OK).json({data:a})).populate("user")}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.getFavouritesList=async function(t,e){try{i.default.findById(t.params.id,(t,a)=>{o.default.find({_id:{$in:a.favourites.articles}},(t,a)=>e.status(s.default.OK).json({data:a})).populate("user")})}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}},e.getToreadsList=function(t,e,a){try{i.default.findById(t.params.id,(t,a)=>{o.default.find({_id:{$in:a.toRead.articles}},(t,a)=>e.status(s.default.OK).json(a))})}catch(t){return e.status(s.default.BAD_REQUEST).json(t)}};var s=n(a(9)),i=(n(a(29)),n(a(0))),o=n(a(4)),r=a(1);function n(t){return t&&t.__esModule?t:{default:t}}},function(t,e){t.exports=require("passport-twitter")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.authTwitterCallback=e.authTwitter=void 0;var s=o(a(5)),i=a(31);o(a(0)),o(a(3));function o(t){return t&&t.__esModule?t:{default:t}}const r=new i.Strategy({consumerKey:"EGLoBrQWNNtCDLYQKh6pupRO1",consumerSecret:"9FNzG4LlhCOhnNOf9VGS2SHQXAILjiLXTWfOrr9MT7W6nV05ww",callbackURL:"http://127.0.0.1:3000/api/v1/users/auth/twitter/callback"},async(t,e,a,s)=>{try{return s(null,a)}catch(t){return s(t,!1)}});s.default.use(r);e.authTwitter=s.default.authenticate("twitter",{session:!1}),e.authTwitterCallback=s.default.authenticate("twitter",{session:!1,failureRedirect:"/"})},function(t,e){t.exports=require("python-shell")},function(t,e){t.exports=require("jsonwebtoken")},function(t,e){t.exports=require("bcrypt-nodejs")},function(t,e){t.exports=require("validator")},function(t,e){t.exports=require("passport-jwt")},function(t,e){t.exports=require("passport-local")},function(t,e){t.exports=require("passport-facebook")},function(t,e){t.exports=require("path")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(6),i=(u(a(40)),u(a(11))),o=(u(a(20)),u(a(5)),u(a(39)),a(10)),r=a(32),n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(30));a(1);function u(t){return t&&t.__esModule?t:{default:t}}const l=new s.Router;l.get("/:id",n.findUserById),l.get("/:id/followers",n.getFollowers),l.get("/:id/following",n.getFollowing),l.get("/:id/articles",n.getUserArticles),l.post("/signup",n.signup),l.post("/login",o.authLocal,n.login),l.post("/:id/follow",o.authJwt,n.follow),l.patch("/update",o.authJwt,(0,i.default)({storage:i.default.memoryStorage()}).single("photo"),n.update),l.get("/login/twitter",r.authTwitter),l.get("/auth/twitter/callback",r.authTwitterCallback,n.twitterSignup),l.get("/:id/favourites",o.authJwt,n.getFavouritesList),l.get("/:id/toread",o.authJwt,n.getToreadsList),e.default=l},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r(a(41)),i=r(a(28)),o=r(a(25));function r(t){return t&&t.__esModule?t:{default:t}}e.default=(t=>{t.use("/api/v1/users",s.default),t.use("/api/v1/articles",i.default),t.use("/api/v1/collections",o.default)})},function(t,e){t.exports=require("helmet")},function(t,e){t.exports=require("compression")},function(t,e){t.exports=require("body-parser")},function(t,e){t.exports=require("morgan")},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=u(a(46)),i=u(a(45)),o=u(a(44)),r=u(a(43)),n=u(a(5));function u(t){return t&&t.__esModule?t:{default:t}}e.default=(t=>{t.use((0,o.default)()),t.use((0,r.default)()),t.use(i.default.json()),t.use(i.default.urlencoded({extended:!0})),t.use(n.default.initialize()),t.use((0,s.default)("combined"))})},function(t,e,a){"use strict";var s=o(a(2)),i=o(a(3));function o(t){return t&&t.__esModule?t:{default:t}}s.default.Promise=global.Promise;try{s.default.connect(i.default.MONGO_URL)}catch(t){s.default.createConnection(i.default.MONGO_URL)}s.default.connection.once("open",()=>console.log("MongodDB Running")).on("error",t=>{throw t})}]);