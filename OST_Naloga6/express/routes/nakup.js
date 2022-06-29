var express = require('express');
var router = express.Router();
let nakup = require("../data/nakupi.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(nakup);
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  res.json(nakup[id]);
});

router.post('/', (req, res, next) => {
    let novNakup = req.body;
    nakup.push(novNakup);
    res.json(nakup);

});


module.exports = router;