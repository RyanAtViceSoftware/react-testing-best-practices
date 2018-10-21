const express = require("express");
const UsersRepository = require("../data/usersRepository");

const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  new UsersRepository().getAll({...req.query}).then(users => res.json(users));
});

module.exports = router;
