const buildDummyResponse = require("./buildDummyResponse");
const { getDummyPosts } = require("./dummyData");

class PostsRepository {
  getAll(by) {
    return buildDummyResponse(
      getDummyPosts().filter(p => by.userId ? p.userId === +by.userId : p)
    );
  }
}

module.exports = PostsRepository;


