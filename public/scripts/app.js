$(document).ready(function () {
  $('.input-group').on('click', 'button', function (event) {
    var $quantity = $(this).closest('.input-group').find('.input-number');
    var $foodItem = $(this).closest('.food-item');
    var foodName = $foodItem.find('.dish-name').text();
    var foodPrice = $foodItem.find('.dish-price').text();
    var needRender = true;
    if ($(this).hasClass('btn-danger')) {
      if (+$quantity.val() == 0) {
        $quantity.val(0);
        needRender = false;
      }
      else $quantity.val(+$quantity.val()-1);
    }
    else {
      if (+$quantity.val() == 10) {
        $quantity.val(10);
        needRender = false;
      }
      else $quantity.val(+$quantity.val()+1);
    }

    if (needRender) {
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
    }
  });

  function renderCart() {
    $.ajax({
      url: '/users/restaurants/:id/cart',
      method: 'GET',
      success: function (data) {
        var $cartContent = $('#cart').find('.jumbotron ul');
        $cartContent.html('');
        var total = 0;
        for (item in data) {
          var curTotal = Math.round(data[item].price * data[item].quantity * 100) / 100;
          total += curTotal;
          var $new = $('<li>').text(`${data[item].name} X ${data[item].quantity} = ${curTotal}` );
          $cartContent.append($new);
        }
        if (!$cartContent.html()) {
          $('#cart').find('#checkout-button').prop('disabled', true);
        }
        else {
          $('#cart').find('#checkout-button').prop('disabled', false);
        }
        $('#cart').find('.lead').html(`Total : <i class="fa fa-usd" aria-hidden="true"></i> ${Math.round(total * 100) / 100}`);
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
