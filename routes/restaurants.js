"use strict";

const express = require('express');
const router  = express.Router();


var accountSid = 'AC4982007c746ac9894fa245eedb675219';
var authToken = '5b33845fd992c0d3c8e5eba8ed5c0c53';
//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

module.exports = (knex) => {
  router.get("/", (req, res) => {
    const name = req.session.user.name;
    knex
      .select("*")
      .from("restaurants")
      .then((results) => {
        res.render("restaurants", { data: results, name: name });
    });
  });

  router.get("/:id/menu", (req, res) => {
    knex.select('*')
    .from('dishes')
    .then((dishesData) => {
      const dishes = dishesData;
      knex.select('*')
      .from('dishes')
      .innerJoin('carts', 'dishes.id', 'carts.dish_id')
      .where('user_id', req.session.user.id)
      .then((results) => {
        let quantities = [];
        for (let i = 0; i < dishes.length; i++) {
          let quantity = 0;
          for (let j = 0; j < results.length; j++) {
            if(dishes[i].id === results[j].dish_id) {
              quantity = results[j].quantity;
            }
          }
          quantities.push(quantity);
        }
        res.render('menu', { dishes: dishes, quantities: quantities, id: req.params.id });
      });
    });
  });

  router.get("/:id/cart", (req, res) => {
    knex
    .select('*')
    .from('carts')
    .innerJoin('dishes', 'carts.dish_id', 'dishes.id')
    .where('user_id', req.session.user.id)
    .then((results) => {
      res.json(results);
    })
  });

  router.post("/:id/cart/update", (req, res) => {
    const foodName = req.body.food_name;
    const foodPrice = req.body.food_price;
    const quantity = req.body.quantity;

    knex
    .select('id')
    .from('dishes')
    .where('name', foodName)
    .then((results) => {
      let dish_id = results[0].id;
      knex
      .select('*')
      .from('carts')
      .where({
        dish_id: dish_id,
        user_id: req.session.user.id
      })
      .then((results) => {
        if (quantity === '0') {
          knex('carts')
          .where({
            dish_id: dish_id,
            user_id: req.session.user.id
          })
          .del()
          .then(() => {
            knex
            .select('*')
            .from('dishes')
            .innerJoin('carts', 'dishes.id', 'carts.dish_id')
            .then((result) => {
              res.json(result);
            });
          });
        }
        else if (results.length == 0) {
          knex('carts').insert({
            user_id: req.session.user.id,
            dish_id: dish_id,
            quantity: "1"
          })
          .then(() => {
            knex
            .select('*')
            .from('dishes')
            .innerJoin('carts', 'dishes.id', 'carts.dish_id')
            .then((result) => {
              res.json(result);
            });
          });
        }
        else {
          knex('carts')
          .where({
            dish_id: dish_id,
            user_id: req.session.user.id
          })
          .update({quantity: quantity})
          .then(() => {
            knex
            .select('*')
            .from('dishes')
            .innerJoin('carts', 'dishes.id', 'carts.dish_id')
            .then((result) => {
              res.json(result);
            });
          });
        }
      });
    });
  });

  router.get("/:id/checkout", (req, res) => {

    knex.select('*')
    .from('dishes')
    .innerJoin('carts', 'dishes.id', 'carts.dish_id')
    .where('user_id', req.session.user.id)
    .then((results) => {
      res.render('checkout', { data: results, id: req.params.id});
    })
    .catch((error) => {
      console.log(error);
    })
  });

  // ------------------------------------------------------//
  //
  // knex('carts')
  // .where('user_id', req.session.user.id)
  // .del()
  // .then(() => {
  //    console.log('deletion success');
  // })
  // .catch((error) => {
  //    console.log(error);
  // });
  //
  // -> this needs to be included somewhere after we send the
  //    order to the ownerRoutes

  router.post("/:id/checkout", (req, res) => {

    let db = {};
    let order = "";
    knex('dishes').join('carts','dishes.id', '=', 'carts.dish_id')
    .select('dishes.name','dishes.price','carts.quantity','carts.user_id').
    then((results) => {
       db = {data:results};
      console.log(results);

      results.forEach((item)=>{
       order += `${item.quantity.toString()}-${item.name}\n`
      });
      order = `User ${results[0].user_id} Order is :\n${order}`;
/*
   client.messages.create({
        to: "+16478867803",
        from: "+16477243888",
        body: order,
    }, function(err, message) {
        console.log(message.sid);
    }); */

    res.redirect(`/users/restaurants/${req.params.id}/confirmation`);
    }).catch((e)=>{
      console.log(`failed to get data ${e}`)});
  });

  router.get("/:id/confirmation", (req, res) => {
    console.log("in confirmation get request");
        let db = {};
    let order = "";
    knex('dishes').join('carts','dishes.id', '=', 'carts.dish_id')
    .select('dishes.name','dishes.price','carts.quantity','carts.user_id').
    then((results) => {
       db = {data:results};


      results.forEach((item)=>{
       order += `${item.quantity.toString()}-${item.name}\n`
      });
      order = `User ${results[0].user_id} Order is :\n${order}`;
      console.log("API sends text");

   client.messages.create({
        to: "+16478867803",
        from: "+16477243888",
        body: order,
    }, function(err, message) {
        console.log(message.sid);
    });

      res.render("confirmation");
    }).catch((e)=>{
      console.log(`failed to get data ${e}`)});

  });
  
  return router;
}
