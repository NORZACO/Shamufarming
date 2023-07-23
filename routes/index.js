var express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const context = { title: "Parts for your needs", user: req.user || null, messages: req.flash() };
  res.render('index', context);
});

module.exports = router;
