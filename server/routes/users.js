const express = require("express");
const usersRepository = require("../data/usersRepository");

const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  usersRepository.getAll({...req.query})
    .then(users => res.json(users))
    .catch(e => {
      console.log(e);
    });
});

module.exports = router;
