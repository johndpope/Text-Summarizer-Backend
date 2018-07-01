let sinon = require('sinon');
let chai = require('chai');
let mongoose = require('mongoose');
let assert = require('assert');
let expect = chai.expect;
let faker = require('faker');
let request = require('supertest')('http://localhost:3000/api/v1/users');
let app = require('../src/index');

import User from '../src/modules/users/user.model';

export function testRoutes() {
  describe('Testing User routes', function() {
    let user1;
    let user2;
    let token1;
    let id2;
    let cookies;

    faker.seed(99);
    const fakeUser = {
      irstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      userName: faker.internet.userName()
    }
    faker.seed(100);
    const fakeUser2 = {
      irstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      userName: faker.internet.userName()
    }

    it('should create new user', (done) => {
      request
        .post('/signup')
        .send(fakeUser)
        .end(function (err, res) {
          token1 = res.body.token;
          expect(res.body._id).to.not.be.undefined;
          expect(res.body.userName).to.not.be.undefined;
          expect(res.body.token).to.not.be.undefined;
          expect(res.body._id).to.be.a('string');
          expect(res.body.userName).to.be.a('string');
          expect(res.body.token).to.be.a('string');
          expect(res.statusCode).to.be.eq(201);
          expect(err).to.be.null;
          expect(201);
          done();
        });
    });

    it('should login', (done) => {
      request
        .post('/login')
        .send({ email: fakeUser.email, password: fakeUser.password})
        .query(token1)
        .expect(200)
        .end((err, res) => {
          expect(res.body._id).to.not.be.undefined;
          expect(res.body.userName).to.not.be.undefined;
          expect(res.body.token).to.not.be.undefined;
          expect(res.body._id).to.be.a('string');
          expect(res.body.userName).to.be.a('string');
          expect(res.body.token).to.be.a('string');
          expect(res.statusCode).to.be.eq(200);
          expect(err).to.be.null;
          expect(200);
          done();
        });
    });

    it('should create new user2', (done) => {
      request
        .post('/signup')
        .send(fakeUser2)
        .end(function (err, res) {
          id2 = res.body._id;
          expect(201);
          expect(res.body._id).to.not.be.undefined;
          expect(res.body.userName).to.not.be.undefined;
          expect(res.body.token).to.not.be.undefined;
          expect(res.body._id).to.be.a('string');
          expect(res.body.userName).to.be.a('string');
          expect(res.body.token).to.be.a('string');
          expect(res.statusCode).to.be.eq(201);
          expect(err).to.be.null;
          expect(201);
          done();
        });
    });

    it('user1 should follow user2', (done) => {
      request
        .post(`/${id2}/follow`)
        .set({ authorization: token1 })
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should update user photo', (done) => {
      request
        .patch('/update')
        .set({ authorization: token1 })
        .attach('photo', '/home/dania/Octave/cartoon.jpeg')
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.be.an('object');
          done();
        })
      });

      it('should change user\'s last name', (done) => {
        request
          .patch('/update')
          .set({ authorization: token1 })
          .send({ lastName: 'XXX' })
          .expect(200)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res.body).to.be.an('object');
            done();
          })
        });

        it('should change user\'s password', (done) => {
          request
            .patch('/update')
            .set({ authorization: token1 })
            .send({ password: 'newpass' })
            .expect(200)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res.body).to.be.an('object');
              done();
            });
        });

        it('try login with old password', (done) => {
          request
            .post('/login')
            .send({ email: fakeUser.email, password: fakeUser.password })
            .query(token1)
            .expect(401)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res.body).to.be.an('object');
              done();
            });
        });

        it('should login with the new password', (done) => {
          request
            .post('/login')
            .send({ email: fakeUser.email, password: 'newpass'})
            .query(token1)
            .expect(200)
            .end((err, res) => {
              expect(res.body._id).to.not.be.undefined;
              expect(res.body.userName).to.not.be.undefined;
              expect(res.body.token).to.not.be.undefined;
              expect(res.body._id).to.be.a('string');
              expect(res.body.userName).to.be.a('string');
              expect(res.body.token).to.be.a('string');
              expect(res.statusCode).to.be.eq(200);
              expect(err).to.be.null;
              expect(200);
              done();
            });
        });
  });
}
