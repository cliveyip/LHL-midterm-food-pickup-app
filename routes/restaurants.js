"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // see all restaurants
  router.get("/", (req, res) => {

  });

  // see one specified restaurant
  router.get("/:id", (req, res) => {

  });

  // see menus for specified restaurant
  router.get("/:id/menus", (req, res) => {
    res.render("menus");
  });

  // see checkout page for specified restaurant
  router.get("/:id/checkout", (req, res) => {
    res.render("checkout");
  });

  // see checkout page
  router.post("/:id/checkout", (req, res) => {

  });

  // see confirmation page
  router.get("/:id/confirmation", (req, res) => {
    res.render("confirmation");
  });

  return router;
}
