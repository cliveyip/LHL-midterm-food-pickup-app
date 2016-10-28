// Twilio Credentials
var accountSid = 'AC4982007c746ac9894fa245eedb675219';
var authToken = '5b33845fd992c0d3c8e5eba8ed5c0c53';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

/**
Deplpy app on Heroku
@TODO     change PORT
@TODO     change
*/

/**
@param    customer order. e.g. [{dish: "pizza", quantity: 2}, {name: "coke", quantity: 1}]
@returns  <Response>
            <Say voice="woman">Customer ordered 2 pizza and 1 coke</Say>
          </Response>
*/
function orderObjectToXML(order){
  var orderString = "Customer ordered ";
  order.forEach( (elm, index, array) => {
    orderString = orderString + elm['quantity'] + " " + elm['dish'] + " ";
  });
  var xmlbuilder = require('xmlbuilder');
  return xml = xmlbuilder.create('Reponse')
                    .ele('Say', {'voice': 'woman'}, orderString)
                    .end({ pretty: true});
}
console.log(orderObjectToXML([{dish: "pizza", quantity: 3}, {dish: "cake", quantity: 1}]));

/**
place the XML file in a url - e.g. http://example.com/call-messages/order1.xml
*/

// app.get("/phone-call-messages/", (req, res) => {
//   var builder = require('xmlbuilder');
//   var xml = builder.create('Reponse')
//                     .ele('Say', {'voice': 'woman'}, 'Customer ordered 2 pizza and 1 coke.')
//                     .end({ pretty: true});
//   res.set('Content-Type', 'text/xml');
//   res.send(xml);
// });

/**
makes phone call to read out the message in the xml
*/



/**
send SMS to customer when dish is ready
*/



module.exports = {
  callOwner: function(){
      client.calls.create({
          to: "+16478867803",
          from: "+16477243888",
          //url: "http://demo.twilio.com/docs/voice.xml"
        }, function(err, responseData) {
          console.log(responseData.from);
      });
  }

  sendSMS: function(){
    client.messages.create({
        to: "+16478867803",
        from: "+16477243888",
        body: "Your food is ready for pickup!",
    }, function(err, message) {
        console.log(message.sid);
    });
  }
}
