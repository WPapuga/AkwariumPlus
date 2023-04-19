const express = require('express');
const mysql = require('mysql');

var app = express();
const port = 3030;
app.use(cors()) 

var con = mysql.createConnection({
    host: "nazwa_hosta",
    user: "nazwa_uzytkownika",
    password: "haslo",
    database: "nazwa_bazy"
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port);

app.post('/auth/signin', function(req, res, next) {

});
app.post('/auth/signup', function(req, res, next) {
   
});
