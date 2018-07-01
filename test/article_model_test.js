let sinon = require('sinon');
let chai = require('chai');
let mongoose = require('mongoose');
let assert = require('assert');
let expect = chai.expect;
let faker = require('faker');
var request = require('supertest')('http://localhost:3000/api/v1/users');
let app = require('../src/index');

import Article from '../src/modules/articles/article.model';

export function testArticleModel() {
  describe('Testing Article Model', function() {

    var ObjectID = require('mongodb').ObjectID;
    var objectId = new ObjectID();
    var article;

    faker.seed(801);
    const fakeArticle = {
      title: faker.lorem.words(),
      slug: faker.lorem.slug(),
      text: faker.lorem.paragraphs(),
      summary: faker.lorem.paragraph(),
      user: objectId,
    }

    before('should create a new article', (done) => {
      article = new Article(fakeArticle);
      console.log(article)
      article.save().then(() => {
        assert(!article.isNew);
        done();
      })
    });

    it('Modifies the title of the created article', function(done) {
      faker.seed(200);
      Article.findOneAndUpdate({ _id: article._id}, { title: faker.lorem.words() }, (err, record) => {
        expect(record).to.not.be.undefined;
        expect(record._id).to.not.be.undefined;
        expect(record.text).to.not.be.undefined;
        expect(record.title).to.not.be.undefined;
        expect(record.slug).to.not.be.undefined;
        expect(record.summary).to.not.be.undefined;
        expect(err).to.be.null;
        done();
      });
    });

    it('Modifies the text of the created article', function(done) {
      faker.seed(300);
      Article.findOneAndUpdate({ _id: article._id}, { text: faker.lorem.paragraphs() }, (err, record) => {
        expect(record).to.not.be.undefined;
        expect(record).to.not.be.undefined;
        expect(record._id).to.not.be.undefined;
        expect(record.text).to.not.be.undefined;
        expect(record.title).to.not.be.undefined;
        expect(record.slug).to.not.be.undefined;
        expect(record.summary).to.not.be.undefined;
        expect(err).to.be.null;
        done();
      });
    });

    it('Finds the created article', function(done) {
      Article.findOne({ _id: article._id }, (err, record) => {
        expect(record).to.not.be.undefined;
        expect(record).to.not.be.undefined;
        expect(record._id).to.not.be.undefined;
        expect(record.text).to.not.be.undefined;
        expect(record.title).to.not.be.undefined;
        expect(record.slug).to.not.be.undefined;
        expect(record.summary).to.not.be.undefined;
        expect(err).to.be.null;
        done();
      });
    });

    it('Deletes the created article', function(done) {
      Article.findOneAndRemove({ _id: article._id }, (err, record) => {
        expect(record).to.not.be.undefined;
        expect(record).to.be.an('object');
        expect(err).to.be.null;
        done();
      });
    });
  });
}
