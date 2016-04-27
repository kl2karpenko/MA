var
	express = require('express'),
	path = require('path');

var app = express();
var port = 8030;

app.configure(function () {
	app.use(express.static(path.dirname(__dirname)));
	app.use(express.bodyParser());
	app.use(express.logger('dev'));
	app.use(app.router);
});

app.get('*', function (req, res) {
	res.sendfile('index.html');
});

app.listen(port, "0.0.0.0");

console.log('server has been started on localhost:' + port);