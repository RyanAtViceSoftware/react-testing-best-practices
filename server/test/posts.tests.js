const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require("sinon");
const postsRepository = require("../data/postsRepository");
const { getDummyPosts } = require("../data/dummyData")

const { expect } = chai;


chai.use(chaiHttp);

describe("Given we GET /posts", () => {
  describe("When we have posts", () => {
    it("Then we are returned posts array in json", done => {
      postsRepository.getAll = () => Promise.resolve(getDummyPosts());

      const app = require('../app');

      expect(true).to.equal(true);


      chai.request(app)
        .get('/posts')
        .then(r => {
          if (r.error) {
            done(r.text)
          }

          expect(r.body).to.deep.equal(getDummyPosts());
        })
        .then(() => done())
        .catch(done);

    });
  });
});