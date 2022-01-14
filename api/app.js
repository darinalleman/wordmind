// Use Express
var express = require("express");

// Create new instance of the express server
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Init the server
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.get('/api/word', function(req, res, next) {
    res.send("globe");
  });
  
app.post('/api/guess', function(req, res) {
    console.log(req.body.guess);
    res.json({ request: req.body });
});