// Twilio Credentials
var accountSid = 'AC4982007c746ac9894fa245eedb675219';
var authToken = '5b33845fd992c0d3c8e5eba8ed5c0c53';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

client.messages.create({
    to: "+16478867803",
    from: "+16477243888",
    body: "This is a message sent from server.js",
}, function(err, message) {
    console.log(message.sid);
});
