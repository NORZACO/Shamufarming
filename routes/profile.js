
var express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/profile', function(req, res, next) {
  const context = { title: "Parts for your needs", user: req.user || null, messages: req.flash() };
  res.render('index', context);
});


/* GET home page. */
router.get('/home', function(req, res, next) {
  const context = { title: "Parts for your needs", user: req.user || null, messages: req.flash() };
  res.render('home', context);
});


module.exports = router;
