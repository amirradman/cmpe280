var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var index = require('./server-files/routes/index.js');

var app = express();
var port = 3000;
//view engine template
app.set('views',path.join(__dirname,'server-files','views'));
app.set('view engine','jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session( {secret: "String for encrypting cookies."} ));

app.use('/',index);

app.listen(port);
console.log("Server is listening on port:" + port);

module.exports = app;