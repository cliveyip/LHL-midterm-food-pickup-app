"use strict";

const express = require('express');
const router  = express.Router();


var accountSid = 'AC4982007c746ac9894fa245eedb675219';
var authToken = '5b33845fd992c0d3c8e5eba8ed5c0c53';
//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);


module.exports = (knex) => {
  router.get("/", (req, res) => {
    console.log(req.session.user);
    const name = req.session.user.name;
    knex
      .select("*")
      .from("restaurants")
      .then((results) => {
        //let templateVars = { data: results };
        let templateVars = { data: results, name: name };
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

    // console.log("in menu");
    // knex.select("*").from("dishes").then(
    //   (results)=>{
    //     res.render('menu',{data:results});
    //   })
/*
    let templateVars = {
      dishes:"",
      restaurants:"",
      carts: ""
    };

    let td = templateVars;

       knex.select("*")
       .from("restaurants").then((restaurants) => {
         return td.restaurants = restaurants;
        }).then((rest_db) => {
          knex.select('*').from('dishes')
           .then((dishes_db)=>{
              return td.dishes = dishes_db;
            }).then((carts)=>{
              knex.select('*').from('carts')
              .then((carts_db)=>{
                td.carts = carts_db;
                console.log(td);
                res.render("menu", templateVars);
              })
            })
      })
      .catch((err)=>{
          console.log(`Failed to get data ${err}`)});

  */});

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

    knex('dishes').join('carts','dishes.id', '=', 'carts.dish_id')
    .select('dishes.name','dishes.price','carts.quantity').
    then((results) => {
      let templateVars = {data:results};
      console.log(results);
      res.render('checkout', templateVars);
    }).catch((e)=>{
      console.log(`failed to get data ${e}`)});


  });

  // update payment method in database cart
  // communicate with the restaurant using twilio api (send updated cart as an order)
  // render with templateVars (w/e info we got from api)
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

    res.redirect("/users/:id/restaurants/:id/confirmation");
    }).catch((e)=>{
      console.log(`failed to get data ${e}`)});
  });





  // see confirmation page
  // maybe not needed, need to see twilio api
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



  router.get("/:id/orders", (req, res) => {
    console.log("Inside orders");
    let templateVars = {};

    knex('dishes').join('carts','dishes.id', '=', 'carts.dish_id')
    .select('dishes.name','dishes.price','carts.quantity','user_id').
    then((results) => {
      let templateVars = {data:results};
      console.log(results);
      res.render('owner.ejs', templateVars);
    }).catch((e)=>{
      console.log(`failed to get data ${e}`)});
  });



router.post("/:id/orders", (req, res) => {
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
