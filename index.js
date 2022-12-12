// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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
app.get("/api/", function (req, res) {
    return res.json({unix: Math.floor(new Date().getTime()), utc: new Date().toUTCString()});
});

app.get("/api/:date", function (req, res) {
  if((new Date(parseInt(req.params.date))).toString() === "Invalid Date") {
    return res.json({error: "Invalid Date"});
  }
  if(new Date(req.params.date).getTime() > 0) {
    let dateUnix = new Date(req.params.date).getTime();
    let dateUTC = new Date(0);
    dateUTC.setUTCMilliseconds(dateUnix);
    console.log({unix: dateUnix, utc: dateUTC.toUTCString()});
    return res.json({unix: dateUnix, utc: dateUTC.toUTCString()});
  } 
    let utcMilliseconds = req.params.date;
    let date = new Date(0);
    date.setUTCMilliseconds(utcMilliseconds);
    console.log({unix: +req.params.date, utc: date.toUTCString()});
    return res.json({unix: +req.params.date, utc: date.toUTCString()});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});