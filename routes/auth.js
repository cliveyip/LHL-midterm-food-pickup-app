"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/login", (req, res) => {
    res.render("login", { message: req.flash('loginMsg')});
  });

  // send login form
  router.post("/login", (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
  });

  // see register page
  router.get("/register", (req, res) => {
    res.render("register", { message: req.flash('registerMsg')});
  });

  // send register form
  router.post("/register", (req, res) => {
    const newUser = {
      //
    };

  });

  // logout
  router.post("/logout", (req, res) => {

  });

  return router;
}
