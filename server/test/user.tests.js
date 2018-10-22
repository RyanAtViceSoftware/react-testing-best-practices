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
    it("Then we are returned users array in json", done => {
      userRepository.getAll = () => Promise.resolve(getDummyUsers());

      const app = require('../app');

      expect(true).to.equal(true);


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
});