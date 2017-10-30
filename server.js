var express = require('express');
var app = express();


app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');  
});

app.get("/:date", function (req, res) {
  var date = req.params.date;
  var resObj = testDate(date);
   
  res.json(resObj);
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


function testDate(str) {
  var ans;
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 
               'July', 'August', 'September', 'October', 'November', 'December'];
  if (Date.parse(str)){
    var timestamp = Date.parse(str);
    ans = {
      unix: timestamp,
      natural: str
    } 
  }
  else if (Number(str)){
    var timestamp = Number(str);
    var dateStr = new Date(timestamp);
    var month = dateStr.getMonth(),
        day = dateStr.getDate(),
        year = dateStr.getFullYear();
    ans = {
      unix: timestamp,
      natural: `${months[month]} ${day}, ${year}`
    }
  }
  else {
    ans = {
      unix: null,
      natural: null
    }
  }
  return ans;
}