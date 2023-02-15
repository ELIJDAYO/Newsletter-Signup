const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
//MaailChimp



app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")

});

app.post("/", function(req, res) {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName
      }
    }]
  };
  var jsonData = JSON.stringify(data);

  const url = "https://us13.api.mailchimp.com/3.0/lists/c89fb2379e"
  const options = {
    method: "POST",
    auth: "elijah:" + apiKey
  }

  const request = https.request(url, options, function(response) {
    if(response.statusCode == 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});
app.post("/failure", function(req,res){
  res.redirect("/");
});

var http = require('http');
http.createServer(app).listen(80);

//change port when depolying
app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
