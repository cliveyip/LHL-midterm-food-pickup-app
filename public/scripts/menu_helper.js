/*
input: [{}, {}, {}, {}]
Object {food_name: "Chips", food_price: "$4.99", quantity: 1}
app.js:35 Object {food_name: "Cheeseburger", food_price: "$12.99", quantity: 1}
app.js:35 Object {food_name: "Cheeseburger", food_price: "$12.99", quantity: 2}
app.js:35 Object {food_name: "Cheeseburger", food_price: "$12.99", quantity: 1}
output:
Chips: 1
Cheeseburger: 1
*/
var orders = [{food_name: "Chips", food_price: "$4.99", quantity: 1},
{food_name: "Cheeseburger", food_price: "$12.99", quantity: 1},
{food_name: "Cheeseburger", food_price: "$12.99", quantity: 2},
{food_name: "Cheeseburger", food_price: "$12.99", quantity: 1}];

aggregate_food(orders);

function aggregate_food(orders){
  var food_names = [];
  for (var i in orders){
    for (var j in food_names){
      if (i['food_name'])
    }
  }
}


/*
Object {food_name: "Chips", food_price: "$4.99", quantity: 1}
app.js:35 Object {food_name: "Chips", food_price: "$4.99", quantity: 2}
app.js:35 Object {food_name: "Chips", food_price: "$4.99", quantity: 3}
app.js:35 Object {food_name: "Chips", food_price: "$4.99", quantity: 2}
app.js:35 Object {food_name: "Cheeseburger", food_price: "$12.99", quantity: 1}
app.js:35 Object {food_name: "Cheeseburger", food_price: "$12.99", quantity: 0}
app.js:35 Object {food_name: "Chocolate Cake", food_price: "$3.99", quantity: 1}
app.js:35 Object {food_name: "Chocolate Cake", food_price: "$3.99", quantity: 2}
app.js:35 Object {food_name: "Coke", food_price: "$1.00", quantity: 1}
app.js:35 Object {food_name: "Chocolate Cake", food_price: "$3.99", quantity: 1}
*/
