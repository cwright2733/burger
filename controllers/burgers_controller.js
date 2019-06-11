var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  burger.all(function(burgerData) {
    // wrapper for orm.js using MySQL query callback return burger_data, render to index with handlebar
    res.render("index", { burger_data: burgerData });
  });
});

// post route -> back to index

router.post("/burgers/create", function(req, res) {
  // request object input burger.addBurger
  burger.create(req.body.burger_name, function(result) {
    // wrapper for orm.js using MySQL insert callback return console log,
    // render back index handle
    console.log(result);
    res.redirect("/");
  });
});

// put route -> back to index

router.put("/burgers/:id", function(req, res) {
  burger.update(req.params.id, function(result) {
    // wrapper for orm.js using MySQL update callback return console log,
    // render back index handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});

module.exports = router;