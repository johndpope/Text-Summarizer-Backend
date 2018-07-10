import HTTPStatus from 'http-status';
import {minioClient} from '../../services/minio.services'
import User from '../users/user.model';
import Article from './article.model';


export async function createArticle(req, res) {
    console.log('inside the controller')
    try {
        const article = await Article.createArticle(req.body, req.user._id);
        await Article.summarizeText(article, req.body.title, req.body.text);
        if (req.file)
            await article.savePhoto(req.file);
        return res.status(HTTPStatus.CREATED).json(article);
    } catch (e) {
        res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}

export async function getArticleById(req, res) {
    try {
        const promise = await Promise.all([
            User.findById(req.user._id),
            Article.findById(req.params.id).populate('user'),
        ]);
        const favourite = promise[0]._favourites.isArticleIsFavourite(req.params.id);
        const article = promise[1];
        if (req.file) {
            var size = 0
            var data = ""
            minioClient.getObject('mybucket', article.photo, (err, dataStream) => {
                if (err) {
                    return console.log(err)
                }
                dataStream.on('data', (chunk) => {
                    size += chunk.length
                    data += chunk
                })
                dataStream.on('end', () => {
                    console.log('End. Total size = ' + size)
                    article.photo = data
                    return res.status(HTTPStatus.OK).json({
                        ...article.toJSON(),
                        favourite,
                    });
                })
            });
        }
        return res.status(HTTPStatus.OK).json({
            ...article.toJSON(),
            favourite,
        })
    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}

export async function getArticlesList(req, res) {
    try {
        const promise = await Promise.all([
            User.findById(req.user._id),
            Article.list({
                limit: parseInt(req.query.limit, 0),
                skip: parseInt(req.query.skip, 0),
            }),
        ]);

        const articles = promise[1].reduce((arr, article) => {
            const favourite = promise[0]._favourites.isArticleIsFavourite(article._id);
            /*
                  var size = 0
                  var data = ""
                  minioClient.getObject('europetrip', article.photo, (err, dataStream) => {
                    if (err) {
                      return console.log(err)
                    }
                    dataStream.on('data', (chunk) => {
                      size += chunk.length
                      data += chunk
                    })
                    dataStream.on('end', () => {
                      console.log('End. Total size = ' + size)
                      article.photo = data
                    })
                  });
            */
            arr.push({
                ...article.toJSON(),
                favourite,
            });

            return arr;
        }, []);

        return res.status(HTTPStatus.OK).json({data: articles});
    } catch (e) {
        res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}

export async function updateArticle(req, res) {
    try {
        const article = await Article.findById(req.params.id);
        if (!article.user.equals(req.user._id)) {
            return res.sendStatus(HTTPStatus.UNAUTHORIZED);
        }
        Object.keys(req.body).forEach(key => {
            article[key] = req.body[key];
        });
        if (req.file) {
            //TODO make sure that the original file name is unique
            await article.savePhoto(req.file);
            return res.status(HTTPStatus.OK).json(article);
        }
        return res.status(HTTPStatus.OK).json(await article.save());
    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}

export async function deleteArticle(req, res) {
    try {
        const article = await Article.findById(req.params.id);
        if (!article.user.equals(req.user._id)) {
            return res.sendStatus(HTTPStatus.UNAUTHORIZED);
        }
        await article.remove();
        return res.sendStatus(HTTPStatus.OK);
    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}

export async function favouriteArticle(req, res) {
    try {
        const user = await User.findById(req.user._id);
        await user._favourites.articles(req.params.id);
        const favourite = user._favourites.isArticleIsFavourite(req.params.id);
        return res.status(HTTPStatus.OK).json({isFavourited: favourite});
    } catch (e) {
        res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}

export async function toReadArticle(req, res) {
    try {
        const user = await User.findById(req.user._id);
        await user._toRead.articles(req.params.id);
        return res.sendStatus(HTTPStatus.OK);
    } catch (e) {
        res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}
