const express = require("express");
const PostsRepository = require("../data/postsRepository");

const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  new PostsRepository().getAll({...req.query}).then(posts => res.json(posts));
});

module.exports = router;
