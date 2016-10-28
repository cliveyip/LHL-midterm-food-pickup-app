// Twilio Credentials
var accountSid = 'AC4982007c746ac9894fa245eedb675219';
var authToken = '5b33845fd992c0d3c8e5eba8ed5c0c53';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

client.calls.create({
    to: "+16478867803",
    from: "+16477243888",
    //url: "http://demo.twilio.com/docs/voice.xml"
    //url: "https://www.dropbox.com/s/5nz3qswkc67sfhb/call_message.xml?dl=0" // dropbox doesn't work
  }, function(err, responseData) {
      //executed when the call has been initiated.
    console.log(responseData.from);
    console.log(err);
});
