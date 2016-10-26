"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // send login form
  router.post("/login", (req, res) => {

  });

  // see register page
  router.get("/register", (req, res) => {
    res.render("register");
  });

  // send register form
  router.post("/register", (req, res) => {

  });

  return router;
}
