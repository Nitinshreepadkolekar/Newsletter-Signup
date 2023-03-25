const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https")
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  const first = req.body.top;
  const second = req.body.middle;
  const bottom = req.body.bottom;
  const data = {
    members: [{
        email_address: bottom,
        status: "subscribed",
        merge_fields: {
        FNAME: first,
        LNAME: second
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us13.api.mailchimp.com/3.0/lists/ef795c4aff"
  const option = {
    method:"POST",
    auth:"Nitin:3563263e44d566ab72d45f88cf54e33c-us13"
  }
  const request=https.request(url, option, function(response) {
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }else{

        res.sendFile(__dirname+"/failure.html");

    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })

  })
  request.write(jsonData);
  request.end();

})
app.post("/failure",function(req,res){
  res.redirect("/")
})





app.listen(process.env.PORT||3000, function() {
  console.log("your server is hosted on 3000");
})

// personal
//3563263e44d566ab72d45f88cf54e33c-us13
//// ID
//ef795c4aff
