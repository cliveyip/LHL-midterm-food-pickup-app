"use strict";

const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();

module.exports = (knex) => {

  // Authorization Middleware
  router.use((req, res, next) => {
    if (req.session && req.session.user) {
      console.log(req.session);
    }
    next();
  });

  router.get("/login", (req, res) => {
    res.render("login", { message: req.flash('loginMsg')});
  });

  // send login form
  router.post("/login", (req, res) => {
    console.log('login');
    const email = req.body.email;
    const password = req.body.password;

    knex.select('*')
    .from('users')
    .where('email', email)
    .then((result) => {
      if (result.length == 0) {
        req.flash('loginMsg', "you don't have an account. Please sign up");
        return res.redirect('login');
      }
      else if (!bcrypt.compareSync(password, result[0].password)){
        req.flash('loginMsg', "Incorrect password. Please try again");
        return res.redirect('login');
      }
      else{
        req.session.user = result[0];
        res.redirect(`/users/${result[0].id}/restaurants/1/menu`);
      }
    })
  });

  // see register page
  router.get("/register", (req, res) => {
    res.render("register", { message: req.flash('registerMsg')});
  });

  // send register form
  router.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;

    knex.select('*')
    .from('users')
    .where('email', email)
    .then((results) => {
      if(results.length == 0) {
        const hashedPassword = bcrypt.hashSync(password);
        // add new user info -> alex
        const newUser = {
          id:6,
          name: name, username:'something',
          password: hashedPassword, email: email,
          is_owner: false, phone_numb: phone
        };
        knex('users')
        .insert(newUser)
        .then(() => {
          req.session.user = newUser;
          res.redirect(`/users/6/restaurants/`);
        });



        // set the session
        // redirect to /users/:id/restaurants
      }
      else {
        req.flash('registerMsg', 'You already have an account. Please Sign In');
        res.redirect('register');
      }
    })
  });

  // logout
  router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      console.log('cannot destroy session');
    })
    res.redirect('/');
  });

  return router;
}
