const buildDummyResponse = require("./buildDummyResponse");
const { getDummyUsers } = require("./dummyData");

function getAll(by) {
  return buildDummyResponse(
    getDummyUsers().filter(
      u => (by.username ? u.username.toLowerCase() === by.username.toLowerCase() : u)
    )
  );
}

module.exports = {
  getAll
};

