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
    var guess = req.body.guess.toLowerCase();
    var decrypted = cryptoJS.AES.decrypt(req.body.answer, salt.data);
    var answer = decrypted.toString(cryptoJS.enc.Utf8);

    var response = [1,1,1,1,1];
    for (var i = 0; i < 5; i++) {
        if (guess[i] === answer[i]) {
            response[i] = 3;
        }
    }
    for (var i = 0; i < 5; i++) {
        if (response[i] == 1) { //if the guess position wasn't already marked
            var indicesInGuess = [];
            var indicesInAnswer = [];

            for(var j=0; j<5;j++) {
                if (guess[i] === guess[j]) indicesInGuess.push(j);
                if (guess[i] === answer[j]) indicesInAnswer.push(j);
            }
            if (indicesInAnswer.length > 0) {
                if (indicesInGuess.length == 1) { //if the guess occurs in the answer only once
                    response[i] = 2; //mark as half correct
                }
                else if (indicesInGuess.length > 1) { //if there are multiple occurences
                    //only mark the number of guesses as there are answers
                    for (var k=0; k < indicesInAnswer.length; k++){
                        if (response[indicesInGuess[k]] == 1) response[indicesInGuess[k]] = 2;
                    }
                }
            }
        }
    }
    res.send( response.join('') );
});