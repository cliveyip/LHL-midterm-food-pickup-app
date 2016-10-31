"use strict";

require('dotenv').config();

const PORT         = process.env.PORT || 8080;
const ENV          = process.env.ENV || "development";
const express      = require("express");
const bodyParser   = require("body-parser");
const sass         = require("node-sass-middleware");
const app          = express();

const knexConfig   = require("./knexfile");
const knex         = require("knex")(knexConfig[ENV]);
const morgan       = require('morgan');
const knexLogger   = require('knex-logger');

const cookieParser = require('cookie-parser');
const flash        = require('connect-flash');
const session      = require('express-session');

// Seperated Routes for each Resource

//const usersRoutes = require("./routes/users");
const authRoutes  = require("./routes/auth");
const restaurantsRoutes = require("./routes/restaurants");
const ownerRoutes = require("./routes/owners");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieParser());
app.use(session({
  name: 'auth_cookie',
  secret: '}AYtBAzqBT3o)?2<l_'
}));
app.use(flash());


// Auth middleware
const authCheck = (req, res, next) => {
  if (req.session.user) {
    next();
  }
  else {
    res.redirect('/login');
  }
}

// Mount all resource routes
app.use("/", authRoutes(knex));
app.use("/users/restaurants", authCheck, restaurantsRoutes(knex));
app.use("/owners", ownerRoutes(knex));

// stores the phone call messages
app.get("/phone-call-messages/", (req, res) => {
  var xmlbuilder = require('xmlbuilder');
  var xml = xmlbuilder.create('Reponse')
                    .ele('Say', {'voice': 'woman'}, 'Customer ordered 2 pizza and 1 coke.')
                    .end({ pretty: true});
  res.set('Content-Type', 'text/xml');
  res.send(xml);
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
