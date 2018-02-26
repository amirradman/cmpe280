var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var index = require('./server-files/routes/index.js');

var app = express();
//view engine template
app.set('views',path.join(__dirname,'server-files','views'));
app.set('view engine','jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session( {secret: "String for encrypting cookies.",
	name: "Cookie_name",
	proxy: true,
	resave: true,
	saveUninitialized: true
}));

app.use('/',index);

app.listen(process.env.PORT || 3000);
console.log("Server is listening on port:" + process.env.PORT);

module.exports = app;