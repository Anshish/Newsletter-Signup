const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "suscribed",
      merger_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us14.mailchimp.com/lists/252b7cb74d";

  const options = {
    method: "POST",
    auth: "anshish:5b943a83fd845227fd132a6853edfac4-us14"
  }
  const request = https.request(url, options, function(response) {

    if(response.statusCode==200){
      res.send("Successfully subscribed!");
    }
    else{
      res.send("There was an error with signing up,please try again!");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });

    request.write(jsonData);
    request.end();
  });

});


app.listen(3000, function() {
  console.log("Server is running on port 3000");
});

//api
// 60ff94cb82dd6f446eadfba5ae16219c-us14

//list
//252b7cb74d

// const data = {
//   members: [{
//     email_address: email,
//     status: "suscribed",
//     merger_fields: {
//       FNAME: firstName,
//       LNAME: lastName
//     }
//   }]
// };
// const jsonData = JSON.stringify(data);
//
// const url = "https://us14.api.mailchimp.com/3.0/lists/252b7cb74d";
//
// const options = {
//   method: "POST",
//   auth: "anshish:60ff94cb82dd6f446eadfba5ae16219c-us14"
// }
// const request = https.request(url, options, function(response) {
//   response.on("data", function(data) {
//     console.log(JSON.parse(data));
//   });
//
//   request.write(jsonData);
//   request.end();
// });
//

//apikey 2 latest
//5b943a83fd845227fd132a6853edfac4-us14

//list id 2 latest
//252b7cb74d
