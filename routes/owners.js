"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // see all owners
  router.get("/", (req, res) => {

  });

  // see one specified owner
  router.get("/:id", (req, res) => {

  });

  // see orders for specified owner
  router.get("/:id/orders", (req, res) => {

  });

  return router;
}
