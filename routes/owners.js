"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // see orders for specified owner
  router.get("/:id/orders", (req, res) => {
    res.render("owner");
  });

  // maybe need more routes depending on twillo api

  return router;
}
