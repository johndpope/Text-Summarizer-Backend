let sinon = require('sinon');
let chai = require('chai');
let mongoose = require('mongoose');
let assert = require('assert');
let expect = chai.expect;
let faker = require('faker');
var request = require('supertest')('http://localhost:3000/api/v1/users');
let app = require('../src/index');

import User from '../src/modules/users/user.model';

export function testModels() {
  describe('Testing User Model', function() {
    let user;
    faker.seed(1000);
    const fakeUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      userName: faker.internet.userName()
    }
    const missedUserName = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    before('Creates a new user to test it', function(done) {
      user = new User(fakeUser);
      user.save().then(() => {
        assert(!user.isNew);
        done();
      });
    });

    it('Modifies the created user', function(done) {
      User.findOneAndUpdate({ _id: user._id }, { lastName: 'Ref' }, (err, record) => {
        expect(record).to.not.be.undefined;
        expect(record).to.be.an('object');
        expect(record._id).to.not.be.undefined;
        expect(record.userName).to.not.be.undefined;
        expect(record.lastName).to.not.be.undefined;
        expect(record.email).to.not.be.undefined;
        expect(record.password).to.not.be.undefined;
        expect(record.userName).to.not.be.undefined;
        expect(record.email).to.match(/^.+@.+\..+$/);
        expect(record.password).to.be.a('string');
        expect(record.firstName).to.be.a('string');
        expect(record.lastName).to.be.a('string');
        expect(record.userName).to.be.a('string');
        expect(record.email).to.be.a('string');
        expect(err).to.be.null;
        done();
      });
    });

    it('Finds the created user', function(done) {
      User.findOne({ _id: user._id }, (err, record) => {
        expect(record).to.not.be.undefined;
        expect(record).to.be.an('object');
        expect(record._id).to.not.be.undefined;
        expect(record.userName).to.not.be.undefined;
        expect(record.lastName).to.not.be.undefined;
        expect(record.email).to.not.be.undefined;
        expect(record.password).to.not.be.undefined;
        expect(record.userName).to.not.be.undefined;
        expect(record.email).to.match(/^.+@.+\..+$/);
        expect(record.password).to.be.a('string');
        expect(record.firstName).to.be.a('string');
        expect(record.lastName).to.be.a('string');
        expect(record.userName).to.be.a('string');
        expect(record.email).to.be.a('string');
        expect(err).to.be.null;
        done();
      });
    });

    it('Deletes the created user', function(done) {
      User.findOneAndRemove({ _id: user._id }, (err, record) => {
        expect(record).to.not.be.undefined;
        expect(record).to.be.an('object');
        expect(err).to.be.null;
        done();
      });
    });

    it('Missing userName', function(done) {
      user = new User(missedUserName);
      user.save().then(() => {
        assert(user.isNew);
      });
      done();
    });

    it('Invalid email', function(done) {
      user = new User({
        firstName: fakeUser.firstName,
        lastName: fakeUser.lastName,
        email: 'poldi1234@.com',
        password: fakeUser.password,
        userName: fakeUser.userName
      });
      user.save().then(() => {
        assert(user.isNew);
      });
      done();
    });

    it('Weak password', function(done) {
      user = new User({
        firstName: fakeUser.firstName,
        lastName: fakeUser.lastName,
        email: fakeUser.email,
        password: 'aaaaa123',
        userName: fakeUser.userName
      });
      user.save().then(() => {
        assert(user.isNew);
      });
      done();
    });

    it('Short password', function(done) {
      user = new User({
        firstName: fakeUser.firstName,
        lastName: fakeUser.lastName,
        email: fakeUser.email,
        password: 'aa23',
        userName: fakeUser.userName
      });
      user.save().then(() => {
        assert(user.isNew);
      });
      done();
    });
  });

}
