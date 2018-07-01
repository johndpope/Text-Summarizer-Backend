let sinon = require('sinon');
let chai = require('chai');
let mongoose = require('mongoose');
let assert = require('assert');
let expect = chai.expect;
let faker = require('faker');
var request = require('supertest')('http://localhost:3000/api/v1/users');
let app = require('../src/index');

import User from '../src/modules/users/user.model';


export function mockDB() {
  describe('User Mocks', function() {

    faker.seed(99);
    const fakeUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      userName: faker.internet.userName()
    }

    it('Should create a new user', function(done) {
        const user = new User(fakeUser);
        const userMock = sinon.mock(user);
        const theUser = userMock.object;

        userMock
          .expects('save')
          .yields(null);

        theUser.save((err) => {
          userMock.verify();
          userMock.restore();
          expect(err).to.be.null;
          done();
        })
    });

    it('Should return error if user isn\'t created', function(done) {
      const user = new User(fakeUser);
      const userMock = sinon.mock(user);
      const theUser = userMock.object;
      const expectedError = {
        name: 'ValidationError'
      };

      userMock
        .expects('save')
        .yields(expectedError);

      theUser.save((err, result) => {
          userMock.verify();
          userMock.restore();
          expect(err.name).to.equal('ValidationError');
          expect(result).to.be.undefined;
          done();
      });
    });

    it('Should find user by email', function(done) {
      const userMock = sinon.mock(User);
      const expectedUser = fakeUser;

      userMock
        .expects('findOne')
        .withArgs({ email: fakeUser.email })
        .yields(null, expectedUser);

      User.findOne({ email: fakeUser.email }, (err, result) => {
        userMock.verify();
        userMock.restore();
        expect(result.email).to.equal(fakeUser.email);
        done();
      })
    });

    it('Should remove a user', function(done) {
      const userMock = sinon.mock(User);
      const expectedResult = {
        nRemoved: 1
      };

      userMock
      .expects('remove')
      .withArgs({ email: fakeUser.email })
      .yields(null, expectedResult);

      User.remove({ email: fakeUser.email }, (err, result) => {
        userMock.verify();
        userMock.restore();
        expect(err).to.be.null;
        expect(result.nRemoved).to.equal(1);
        done();
      });
    });

  });
}
