function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

var express = require("express");
var words = require("./words");
var salt = require("./environment");
var cryptoJS = require("crypto-js");

// Create new instance of the express server
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('./dist/wordmind'));

app.get('/', (req, res) =>
    res.sendFile('index.html', {root: 'dist/wordmind/'}),
);

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});


app.get('/api/word', function(req, res, next) {
    var random = Math.round(Math.random()*2315);
    var word = words.all[random];
    console.log(word);
    var encrypted = cryptoJS.AES.encrypt(word, salt.data).toString();
    res.status(200).send(encrypted);
});
  
app.post('/api/guess', function(req, res) {
    var guess = req.body.guess;
    var decrypted = cryptoJS.AES.decrypt(req.body.answer, salt.data);
    var answer = decrypted.toString(cryptoJS.enc.Utf8);

    var response = "";
    for (var i = 0; i < guess.length; i++) {
        if (guess[i] == answer[i]) {
            response += "3";
        }
        else if (answer.includes(guess[i])) {
            response += "2";
        }
        else {
            response += "1";
        }
    }
    res.send( response );
});