var express = require('express');
var router = express.Router();
let uporabniki = require("../data/uporabniki.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(uporabniki);
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  res.json(uporabniki[id]);
});

router.post('/', function (req, res, next) {
    if (!req.body.uIme ||
        !req.body.uGeslo) {
        res.status(400);
        res.json({ message: "Bad Request" });
    } else {
        const newId = uporabniki[uporabniki.length - 1].id + 1;
        uporabniki.push({
            id: newId,
            uIme: req.body.uIme,
            uGeslo: req.body.uGeslo
        });
        res.json(uporabniki);
    }
});



module.exports = router;