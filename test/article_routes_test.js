let sinon = require('sinon');
let chai = require('chai');
let mongoose = require('mongoose');
let assert = require('assert');
let expect = chai.expect;
let faker = require('faker');
let requestUser = require('supertest')('http://localhost:3000/api/v1/users');
let requestArticle = require('supertest')('http://localhost:3000/api/v1/articles');
let app = require('../src/index');

import User from '../src/modules/users/user.model';
import Article from '../src/modules/articles/article.model';

export function testArticleRoutes() {
  describe.only('Testing Article routes', function() {
    let user;
    let article;
    var ObjectID = require('mongodb').ObjectID;
    var objectId = new ObjectID();
    var token;

    faker.seed(30);
    const fakeUser = {
      irstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      userName: faker.internet.userName()
    }
    const fakeArticle = {
      title: faker.lorem.words(),
      text: faker.lorem.paragraphs(),
    }

    before('should create new user', (done) => {
      requestUser
        .post('/signup')
        .send(fakeUser)
        .expect(201)
        .end(function (err, res) {
          token = res.body.token;
          user = res.body;
          expect(201);
          done();
        });
    });

    it('should create new article', (done) => {
      requestArticle
        .post('/')
        .set({ authorization: token })
        .send(fakeArticle)
        .expect(201)
        .end((err, res) => {
          article = res.body;
          expect(err).to.be.null;
          expect(201);
          done();
        })
    });

    it('should get an article by its id', (done) => {
      requestArticle
        .get(`/${article._id}`)
        .set({ authorization: token })
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(200);
          done();
        });
    });

    it('should modify the article', (done) => {
      requestArticle
        .patch(`/${article._id}`)
        .set({ authorization: token })
        .send({ title: 'this is a new title' })
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should add a pic to the article', (done) => {
      requestArticle
        .patch(`/${article._id}`)
        .set({ authorization: token })
        .attach('photo', '/home/dania/Octave/cartoon.jpeg')
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should favourite an article', (done) => {
      requestArticle
        .post(`/${article._id}/favourite`)
        .set({ authorization: token })
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.be.an('object');
          done();
        })
    });

    it('should favourite an article', (done) => {
      requestArticle
        .post(`/${article._id}/toread`)
        .set({ authorization: token })
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.be.an('object');
          done();
        })
    });

    it('should delete an article', (done) => {
      requestArticle
        .delete(`/${article._id}`)
        .set({ authorization: token })
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.be.an('object');
          done();
        })
    });

  });
}
