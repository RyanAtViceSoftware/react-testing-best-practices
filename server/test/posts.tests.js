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

  describe("When we pass a userId for a user we have on query string", () => {
    it("Then we are returned that users posts in response json", done => {
      postsRepository.getAll = sinon.stub();

      const userId = 1;

      const expectedPosts = getDummyPosts().filter(u => u.userId === userId);

      postsRepository.getAll
        .withArgs({userId})
        .returns(Promise.resolve(expectedPosts));

      const app = require('../app');

      chai.request(app)
        .get('/posts')
        .query({userId})
        .then(r => {
          if (r.error) {
            done(r.text)
          }

          expect(r.body).to.deep.equal(expectedPosts);
        })
        .then(() => done())
        .catch(done);

    });
  });

  describe("When we pass a userId for a user we don't have on query string", () => {
    it("Then we are returned that users posts in response json", done => {
      postsRepository.getAll = sinon.stub();

      const userId = 1;

      const expectedPosts = getDummyPosts().filter(u => u.userId === userId);

      postsRepository.getAll
        .withArgs({userId})
        .returns(Promise.resolve(expectedPosts));

      const app = require('../app');

      chai.request(app)
        .get('/posts')
        .query({userId})
        .then(r => {
          if (r.error) {
            done(r.text)
          }

          expect(r.body).to.deep.equal(expectedPosts);
        })
        .then(() => done())
        .catch(done);

    });
  });
});