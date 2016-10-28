"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // see all users
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  // see specified user
  router.get("/:id", (req, res) => {

  });

  return router;
}
