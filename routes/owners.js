"use strict";

const express = require('express');
const router  = express.Router();

var accountSid = 'AC4982007c746ac9894fa245eedb675219';
var authToken = '5b33845fd992c0d3c8e5eba8ed5c0c53';
//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

module.exports = (knex) => {

  // see orders for specified owner
  router.get("/orders", (req, res) => {
    console.log("Inside orders");
    let templateVars = {};

    knex('dishes').join('carts','dishes.id', '=', 'carts.dish_id')
    .select('dishes.name','dishes.price','carts.quantity','user_id').
    then((results) => {
      let templateVars = {data:results};
      console.log(results);
      res.render('owner', templateVars);
    }).catch((e)=>{
      console.log(`failed to get data ${e}`)});
  });

  router.post("/orders", (req, res) => {
      let templateVars = {};

    console.log("Notify clicked");


   const minutes = `Thank You ! \n Your order will be ready in ${req.body.minutes} minutes`;

    knex('dishes').join('carts','dishes.id', '=', 'carts.dish_id')
    .select('dishes.name','dishes.price','carts.quantity','user_id').
    then((results) => {
      let templateVars = {data:results};

      console.log("Send time to Client");
         client.messages.create({
        to: "+16478867803",
        from: "+16477243888",
        body: minutes,
    }, function(err, message) {
      console.log(err);
    });


      res.render('owner.ejs', templateVars);
    }).catch((e)=>{
      console.log(`failed to get data ${e}`)});


  });

  return router;
}
