var express = require('express');
var path    = require('path');
var _       = require('underscore');

var data = require('./data.js');

var dialplanFollowDefault = data.dialplanFollowDefault;
var dialplans = data.dialplans;
var dialplansOnlyPersonal = data.dialplansOnlyPersonal;
var dialplansList = data.dialplansList;
var mailboxes = data.mailboxes;
var settingsOn = data.settingsOn;
var Permissions = data.Permissions;
var isAuthorize = data.isAuthorize;
var isNotAuthorize = data.isNotAuthorize;
var connectsPin = data.connectsPin;
var connectsPinBad = data.connectsPinBad;
var extensions = data.extensions;

var app = express();
var port = 8030;
var root = path.resolve(__dirname, '../build');


app.configure(() => {

	// app.use(express.static('build', root));
	app.use(express.static(root));
	app.use(express.bodyParser());
	app.use(express.logger('dev'));
	app.use(app.router);
});
/**
 * List of contacts from user mobile, only for development needs
 */
app.get('/contacts', function (req, res) {
	res.send({
		"contacts": null
	});
});

/**
 * Session data
 */
app.get('/session', function (req, res) {
	res.send(isAuthorize);
});

/**
 * List of company mailboxes
 */
app.get('/mailboxes', function (req, res) {
	res.send({
		"mailboxes": mailboxes
	});
});

/**
 * List of company mailboxes
 */
app.get('/mailboxes/:mailboxId', function (req, res) {
	res.send({
		"mailbox": mailboxes[_.indexOf(_.pluck(mailboxes, '_id'), req.params.mailboxId)]
	});
});

/**
 * List of company dialplans
 */
app.get('/dialplans', function (req, res) {
	res.send({
		"dialplans": dialplansList
	});
});

/**
 * Detail info about dialplan
 */
app.get('/dialplans/:dialplanId', function (req, res) {
	res.send({
		"dialplan": dialplansList[_.indexOf(_.pluck(dialplansList, '_id'), req.params.dialplanId)]
	});
});

/**
 * Save detail info about dialplan
 */
app.put('/dialplans/:dialplanId', function (req, res) {
	var activeDialplan = dialplansList[_.indexOf(_.pluck(dialplansList, '_id'), req.params.dialplanId)];

	if (req.body.dialplan.follow) {
		Object.keys(activeDialplan.follow).forEach(function (path) {
			activeDialplan.follow[path].selected = false;
		});

		activeDialplan.follow = _.extend({}, dialplanFollowDefault.follow, req.body.dialplan.follow);
	} else if (req.body.dialplan.actions) {
		activeDialplan.actions = req.body.dialplan.actions;
	}

	res.send({
		"dialplan": activeDialplan
	});
});

app.get('/extensions', function (req, res) {
	res.send(data.extensions);
});

app.put('/connects/pin', (req, res) => {
	if (Number(req.body.connects.pin.value) === 11111) {
		return res.send(connectsPin);
	}
	return res.send(connectsPinBad);
});

/**
 * Save pin code for authorization
 */
app.put('/pin', function (req, res) {
	res.send({
		'pin': Number(req.body.pin.value) === Number(settingsOn.settings.pin.active)
	});
});

app.get('*', function (req, res) {
	// res.sendfile('index.html');
	res.sendfile(root + '/index.html');
});

app.listen(port, "0.0.0.0");

console.log('server has been started on localhost:' + port);
console.log('server root:', root);
