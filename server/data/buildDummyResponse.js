const {ASYNC_DELAY} = require("./constants");

const buildDummyResponse = data =>
  new Promise(resolve => {
    setTimeout(resolve(data), ASYNC_DELAY)
  });


module.exports = buildDummyResponse;
