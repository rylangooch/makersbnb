var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/users/new', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
