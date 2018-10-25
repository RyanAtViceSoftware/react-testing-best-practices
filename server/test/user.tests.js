const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require("sinon");
const userRepository = require("../data/usersRepository");
const { getDummyUsers } = require("../data/dummyData")

const { expect } = chai;


chai.use(chaiHttp);

describe("Given we GET /users ", () => {
  describe("When we have users", () => {
    it("Then we are returned users array in response json", done => {
      userRepository.getAll = () => Promise.resolve(getDummyUsers());

      const app = require('../app');

      chai.request(app)
        .get('/users')
        .then(r => {
          if (r.error) {
            done(r.text)
          }

          expect(r.body).to.deep.equal(getDummyUsers());
        })
        .then(() => done())
        .catch(done);

    });
  });

  describe("When we pass a username for a user we have on query string", () => {
    it("Then we are returned the associated user in response json", done => {
      userRepository.getAll = sinon.stub();

      const expectedUsername = 'Bret';

      const expectedUser = getDummyUsers().filter(u => u.username === expectedUsername);

      userRepository.getAll
        .withArgs({username: expectedUsername})
        .returns(Promise.resolve(expectedUser));

      const app = require('../app');

      chai.request(app)
        .get('/users')
        .query({username: expectedUsername})
        .then(r => {
          if (r.error) {
            done(r.text)
          }

          expect(r.body).to.deep.equal(expectedUser);
        })
        .then(() => done())
        .catch(done);

    });
  });

  describe("When we pass a username for a user we don't have on query string", () => {
    it("Then we empty array in json", done => {
      userRepository.getAll = sinon.stub();

      const expectedUsername = 'foo';

      const dummyResponse = getDummyUsers().filter(u => u.username === expectedUsername);

      const expectedUser = [];

      userRepository.getAll
        .withArgs({username: expectedUsername})
        .returns(Promise.resolve(dummyResponse));

      const app = require('../app');

      chai.request(app)
        .get('/users')
        .query({username: expectedUsername})
        .then(r => {
          if (r.error) {
            done(r.text)
          }

          expect(r.body).to.deep.equal(expectedUser);
        })
        .then(() => done())
        .catch(done);

    });
  });
});