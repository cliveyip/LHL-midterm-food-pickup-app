// $(() => { // on page load
//   // $.ajax({
//   //   method: "GET",
//   //   url: "/users"
//   // }).done((users) => {
//   //   for(user of users) {
//   //     $("<div>").text(user.name).appendTo($("body"));
//   //   }
//   // });
// });

$(document).ready(function () {
  $('.input-group').on('click', 'button', function (event) {
    var $quantity = $(this).closest('.input-group').find('.input-number');
    var $foodItem = $(this).closest('.food-item');
    var foodName = $foodItem.find('.dish-name').text();
    var foodPrice = $foodItem.find('.dish-price').text();

    if ($(this).hasClass('btn-danger')) {
      if (+$quantity.val() == 0) $quantity.val(0);
      else $quantity.val(+$quantity.val()-1);
    }
    else {
      if (+$quantity.val() == 10) $quantity.val(10);
      else $quantity.val(+$quantity.val()+1);
    }

    var jsonData = {food_name: foodName, food_price: foodPrice, quantity: +$quantity.val()}
    $.ajax({
      url: '/users/restaurants/:id/cart/update',
      method: 'POST',
      data: jsonData,
      success: function (data) {
        console.log('updating cart success');
        renderCart();
      }
    });
  });

  function renderCart() {
    $.ajax({
      url: '/users/restaurants/:id/cart',
      method: 'GET',
      success: function (data) {
        console.log(data);
        //$('#cart').html('');
        //$('#cart').append(data);
        var $cartContent = $('#cart').find('.jumbotron ul');
        $cartContent.html('');
        for (item in data) {
          //console.log(data[item]);
          var $new = $('<li>').text(`${data[item].name}, ${data[item].quantity}`);
          $cartContent.append($new);
        }
      }
    });
  }

  $('tbody').on('click', '.restaurant', function (event) {
    const restaurantId = $(this).find('th').text();
    window.location.href = `/users/restaurants/${restaurantId}/menu`;
  })

  if (window.location.href.endsWith('menu')) {
    renderCart();
  }
});
