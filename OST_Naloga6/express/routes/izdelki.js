var express = require('express');
var router = express.Router();
let izdelki = require("../data/izdelki.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(izdelki);
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  res.json(izdelki[id]);
});

router.post('/', function(req, res, next) {
let izdelek = req.body;
izdelki.push(izdelek);
res.json({status: "added", izdelek: izdelek});
});

module.exports = router;
