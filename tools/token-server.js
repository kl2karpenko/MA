var express = require('express');
var path = require('path');

var app = express();
var port = 8020;
var root = path.resolve(__dirname, '../build');

var allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	next();
};

app.configure(() => {
	app.use(express.static(root));
	app.use(allowCrossDomain);
	app.use(express.bodyParser());
	app.use(express.logger('dev'));
	app.use(app.router);
});

app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

/**
 * Save pin code for authorization
 */
app.post('/token', function (req, res) {
	res.send({
		"access_token": "KPToKjEvSqW6gMLTsQj2HAMO89pShYfq",
		"refresh_token": "bY8u2Cib1lbFmGjPHlk3QwCxbYbcYEEd",
		"expires_in": 86400,
		"token_type": "bearer"
	});
});

/**
 * Save pin code for authorization
 */
app.options('/token', function (req, res) {
	res.send({
		"status": "ok"
	});
});

app.get('*', function (req, res) {
	// res.sendfile('index.html');
	res.sendfile(root + '/index.html');
});

app.listen(port, "0.0.0.0");

console.log('token server has been started on localhost:' + port);
console.log('server root:', root);
