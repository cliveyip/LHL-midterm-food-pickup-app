"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    //const name = req.session.user.name;
    knex
      .select("*")
      .from("restaurants")
      .then((results) => {
        let templateVars = { data: results };
        //let templateVars = { data: results, name: name };
        res.render("restaurants", templateVars);
    });

  });

  // see menus for specified restaurant
  // render with templatVars(cart data)
  router.get("/:id/menu", (req, res) => {
    // let templateVars = {
    //   dishes:"",
    //   restaurants:"",
    //   carts: ""
    // };
    //
    // let td = templateVars;
    //
    //    knex.select("*")
    //    .from("restaurants").then((restaurants) => {
    //      return td.restaurants = restaurants;
    //     }).then((rest_db) => {
    //       knex.select('*').from('dishes')
    //        .then((dishes_db)=>{
    //           return td.dishes = dishes_db;
    //         }).then((carts)=>{
    //           knex.select('*').from('carts')
    //           .then((carts_db)=>{
    //             td.carts = carts_db;
    //             //console.log(td);
    //             res.render("menu", templateVars);
    //           })
    //         })
    //   })
    //   .catch((err)=>{
    //       console.log(`Failed to get data ${err}`)});

    knex.select('*')
    .from('dishes')
    .orderBy('category', 'desc')
    .then((results) => {
      res.render('menu', { data: results });
    })
  });

  // get cart information for specific users
  router.get("/:id/cart", (req, res) => {
    // const userId = req.session.user.id;
    // knex
    // .select('*')
    // .from('carts')
    // .where('user_id', userId)
    // .then((results) => {
    //   res.render('menu', { data: results });
    // });
    knex
    .select('*')
    .from('carts')
    .innerJoin('dishes', 'carts.dish_id', 'dishes.id')
    .orderBy('name', 'desc')
    .then((results) => {
      res.json(results);
    })
  });

  // when +,- clicked, update database cart and response with updated cart data
  // use append to add and remove from cart view (in app.js)
  // for restful design, I changed it to cart/update
  // if we going to keep history of all carts, then "/:id/carts/:id/update"
  router.post("/:id/cart/update", (req, res) => {
    // something like this
    // db.carts.update(req.body.menuItemId, newCartData =>
    //   res.json(newCartData)
    // )
    const foodName = req.body.food_name;
    const foodPrice = req.body.food_price;
    const quantity = req.body.quantity;

    console.log(`----------------------${quantity}`);
    knex
    .select('id')
    .from('dishes')
    .where('name', foodName)
    .then((results) => {
      let dish_id = results[0].id;
      knex
      .select('*')
      .from('carts')
      .where('dish_id', dish_id)
      .then((results) => {
        if (results.length == 0) {
          knex('carts').insert({
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
          if (quantity === 0) {
            console.log('delete');
            knex('carts')
            .where('dish_id', dish_id)
            .del()
            .then(() => {
              knex
              .select('*')
              .from('dishes')
              .innerJoin('carts', 'dishes.id', 'carts.dish_id')
              .then((result) => {
                //console.log(result);
                res.json(result);
              });
            });
          }
          else {
            knex('carts')
            .where('dish_id', dish_id)
            .update({quantity: quantity})
            .then(() => {
              knex
              .select('*')
              .from('dishes')
              .innerJoin('carts', 'dishes.id', 'carts.dish_id')
              .then((result) => {
                //console.log(result);
                res.json(result);
              });
            });
          }
        }
      })
    });
  });

  // see checkout page with updated cart
  // render checkout with templatVars(cart data)
  router.get("/:id/checkout", (req, res) => {
    let templateVars = {};
    // knex
    //   .select("*")
    //   .from("cart")
    //   .then((results) => {
    //     templateVars.data = results;
    // });
    res.render("checkout");
  });

  // update payment method in database cart
  // communicate with the restaurant using twillo api (send updated cart as an order)
  // render with templateVars (w/e info we got from api)
  router.post("/:id/checkout", (req, res) => {









    res.render("confirmation");
  });

  // see confirmation page
  // maybe not needed, need to see twillo api
  router.get("/:id/confirmation", (req, res) => {
    res.render("confirmation");
  });

  return router;
}
