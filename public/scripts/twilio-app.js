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
@param    customer order. e.g. [{dish: pizza, quantity: 2}]
@returns  <Response>
            <Say voice="alice">Customer ordered 2 pizza</Say>
          </Response>
          use this library - https://www.npmjs.com/package/xmlbuilder
*/

/**
place the XML file in a url - e.g. http://example.com/call-messages/order1.xml
*/

// app.get("/phone-call-messages/", (req, res) => {
//   res.set('Content-Type', 'text/xml');
//   res.send(customer-order-xml);
// });

/**
makes phone call to read out the message in the xml
*/
client.calls.create({
    to: "+16478867803",
    from: "+16477243888",
    //url: "http://demo.twilio.com/docs/voice.xml"
  }, function(err, responseData) {
    console.log(responseData.from);
});


/**
send SMS to customer when dish is ready
*/
client.messages.create({
    to: "+16478867803",
    from: "+16477243888",
    body: "Your food is ready for pickup!",
}, function(err, message) {
    console.log(message.sid);
});

/*
module.exports = {
  function makePhoneCall(){

  }

  function sendSMS(){

  }
}
*/
