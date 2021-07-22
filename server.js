// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
 var accepts = require('accepts');
  //load accepts module to parse accept-language string req http header
  //.languages methods returns an array in the order of clients preferences
  
  var uaParser = require('ua-parser');
  //load ua-parser module that uses regex library to parse user agent strings in req http header
  //Added app.enable('trust proxy') to server.js app intialization code to maket this work


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



    
  app.get('/api/whoami', function(req,res){
             
    var ip = req.ip;
    //get ip address with express build-in method req.ip
    
    var language = accepts(req).languages()[0];
    //get an array of preferred languages from http req headers, and take the first one, which is most preferred language
        
    var uaHeader = req.headers['user-agent'];
    //get user-agent string 
    
    var agent = uaParser.parseOS(uaHeader).toString();
    //parse OS part of user-agent string to a string
     
     res.json({"ipaddress": ip, "language": language, "software": agent});
      
  });


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
