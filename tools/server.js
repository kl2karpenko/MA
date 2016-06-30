var
	express = require('express'),
	path = require('path'),
	_ = require('underscore');

var app = express();
var port = 8030;

// Local data =================================== //

var dialplans = [{
	"_id": "hrththy56y5yh",
	"actions": [],
	"title": "Your personal",
	"personal": true,
	"ex_number": "+32 1 234 56 78",
	"follow": {
		"original": {
			"selected": false
		},
		"mobile": {
			"selected": false,
			"value": ""
		},
		"voicemail": {
			"selected": true
		},
		"contact": {
			"selected": false,
			"value": {
				"_id": "",
				"name": "",
				"number": "",
				"type": ""
			}
		}
	}
}, {
	"_id": "thrty56y56ryr5",
	"title": "Elisa Doe",
	"actions": [{
		"action_id": "2678d8e9db15becc3397a47500dac7e0",
		"value": {
			"label": "Department Closed",
			"short_code": "4",
			"is_on": true
		}
	}, {
		"action_id": "2678d8e9db15becc3397a47500dac7e0",
		"items": [{"action_id": "2678d8e9db15becc3397a47500dac7e0", "items": [], "value": {"short_code": "5"}}],
		"value": {
			"label": "Lunch Break",
			"short_code": "4",
			"is_on": true
		}
	}, {
		"action_id": "2678d8e9db15becc3397a47500dac7e0",
		"items": [{
			"action_id": "2678d8e9db15becc3397a47500dac7e0",
			"items": [{"action_id": "2678d8e9db15becc3397a47500dac7e0", "items": [], "value": {"short_code": "3"}}],
			"value": {"short_code": "2"}
		}],
		"value": {"short_code": "1"}
	}],
	"in_number": "+32 1 456 78 98",
	"ex_number": 31152026029,
	"personal": false,
	"follow": {
		"original": {
			"selected": true
		},
		"mobile": {
			"selected": false,
			"value": ""
		},
		"voicemail": {
			"selected": false,
			"value": {
				"_id": "",
				"name": ""
			}
		},
		"contact": {
			"selected": false,
			"value": {
				"_id": "",
				"name": "",
				"type": ""
			}
		}
	}
}, {
	"_id": "5h656h65h5r6h56h",
	"actions": [],
	"in_number": "+38 050 414 41 51",
	"title": "Karpenko Liliia",
	"personal": false,
	"follow": {
		"original": {
			"selected": true
		},
		"mobile": {
			"selected": false,
			"value": ""
		},
		"voicemail": {
			"selected": false,
			"value": {
				"_id": "",
				"name": ""
			}
		},
		"contact": {
			"selected": false,
			"value": {
				"_id": "",
				"name": "",
				"type": ""
			}
		}
	}
}, {
	"_id": "h46yh4hy6hh",
	"in_number": "1234",
	"ex_number": 31152026029,
	"title": "Studenyak Nastia",
	"personal": false,
	"actions": [],
	"follow": {
		"original": {
			"selected": false
		},
		"mobile": {
			"selected": false,
			"value": ""
		},
		"voicemail": {
			"selected": false,
			"value": {
				"_id": "",
				"name": ""
			}
		},
		"contact": {
			"selected": true,
			"value": {
				"_id": "95c50c4e05cf7993ea326f813f007385",
				"name": "36368 555888 (5223)",
				"type": "extension"
			}
		}
	}
}, {
	"_id": "h5r6hy46hh4h66h",
	"actions": [],
	"in_number": "+38 093 403 23 79",
	"title": "Kebal Ivan",
	"personal": false,
	"follow": {
		"original": {
			"selected": true
		},
		"mobile": {
			"selected": false,
			"value": ""
		},
		"voicemail": {
			"selected": false,
			"value": {
				"_id": "",
				"name": ""
			}
		},
		"contact": {
			"selected": false,
			"value": {
				"_id": "",
				"name": "",
				"type": ""
			}
		}
	}
}, {
	"_id": "6",
	"actions": [],
	"in_number": "+38 093 403 23 79",
	"title": "Rybachok Oleksandr",
	"personal": false,
	"follow": {
		"original": {
			"selected": true
		},
		"mobile": {
			"selected": false,
			"value": ""
		},
		"voicemail": {
			"selected": false,
			"value": {
				"_id": "",
				"name": ""
			}
		},
		"contact": {
			"selected": false,
			"value": {
				"_id": "",
				"name": "",
				"type": ""
			}
		}
	}
}, {
	"_id": "7",
	"actions": [],
	"in_number": "+38 093 403 23 79",
	"title": "Saiko Iryna",
	"personal": false,
	"follow": {
		"original": {
			"selected": true
		},
		"mobile": {
			"selected": false,
			"value": ""
		},
		"voicemail": {
			"selected": false,
			"value": {
				"_id": "",
				"name": ""
			}
		},
		"contact": {
			"selected": false,
			"value": {
				"_id": "",
				"name": "",
				"type": ""
			}
		}
	}
}, {
	"_id": "8",
	"actions": [],
	"in_number": "+38 093 403 23 79",
	"title": "Berladin Ewgeny",
	"personal": false,
	"follow": {
		"original": {
			"selected": true
		},
		"mobile": {
			"selected": false,
			"value": ""
		},
		"voicemail": {
			"selected": false,
			"value": {
				"_id": "",
				"name": ""
			}
		},
		"contact": {
			"selected": false,
			"value": {
				"_id": "",
				"name": "",
				"type": ""
			}
		}
	}
}, {
	"_id": "9",
	"actions": [],
	"in_number": "+38 093 403 23 79",
	"title": "Yurch Yuriy",
	"personal": false,
	"follow": {
		"original": {
			"selected": true
		},
		"mobile": {
			"selected": false,
			"value": ""
		},
		"voicemail": {
			"selected": false,
			"value": {
				"_id": "",
				"name": ""
			}
		},
		"contact": {
			"selected": false,
			"value": {
				"_id": "",
				"name": "",
				"type": ""
			}
		}
	}
}, {
	"_id": "10",
	"actions": [],
	"in_number": "+38 093 403 23 79",
	"title": "Skorohliad Ivan",
	"personal": false,
	"follow": {
		"original": {
			"selected": true
		},
		"mobile": {
			"selected": false,
			"value": ""
		},
		"voicemail": {
			"selected": false,
			"value": {
				"_id": "",
				"name": ""
			}
		},
		"contact": {
			"selected": false,
			"value": {
				"_id": "",
				"name": "",
				"type": ""
			}
		}
	}
}];

var dialplansOnlyPersonal = [{
	"_id": "hrththy56y5yh",
	"actions": [],
	"title": "Your personal",
	"personal": true,
	"ex_number": "+32 1 234 56 78",
	"follow": {
		"original": {
			"selected": false
		},
		"mobile": {
			"selected": false,
			"value": ""
		},
		"voicemail": {
			"selected": true
		},
		"contact": {
			"selected": false,
			"value": {
				"_id": "",
				"name": "",
				"number": "",
				"type": ""
			}
		}
	}
}];

var mailboxes = [{
	"_id": "2e02c973dae6a3e0b5ff2493ff993873",
	"name": "Lily Mailbox",
	"color": "yellow",
	"number": "2006",
	"type": "mailbox"
}, {
	"_id": "3312becea0e3030a182a0a9319a99b3f",
	"name": "\u041c\u043e\u0439 \u043c\u0435\u0439\u043b\u0431\u043e\u043a\u0441",
	"color": "red",
	"number": "3123",
	"type": "mailbox"
}, {
	"_id": "4956f9ced8c37f9c9684415bc3901ad9",
	"name": "is it mine",
	"color": "blue",
	"number": "123123",
	"type": "mailbox"
}, {
	"_id": "4f098a2c089226e0d4f79be4add5beca",
	"name": "aawwrerwer",
	"color": "green",
	"number": "2342",
	"type": "mailbox"
}, {
	"_id": "4f098a2c089226e0d4f79be4add5c20d",
	"name": "aawwrerwer",
	"color": "green",
	"number": "24411",
	"type": "mailbox"
}, {
	"_id": "6073d9ea4d97274927865cc2fca49f91",
	"name": "NEW GUY",
	"color": "red",
	"number": "3423",
	"type": "mailbox"
}, {
	"_id": "6a382656ee4c57b69905348bd6eb6fb8",
	"name": "331",
	"color": "blue",
	"number": "2211",
	"type": "mailbox"
}, {
	"_id": "8f5304fd1a51e59f23e18eef1319b145",
	"name": "somename",
	"color": "turquoise",
	"number": "0944374334",
	"type": "mailbox"
}, {
	"_id": "953a9bf45242d01f47751475114f9615",
	"name": "aawwrerwer",
	"color": "green",
	"number": "244111",
	"type": "mailbox"
}, {
	"_id": "9799b9b1a1737902cedc23665d2c6409",
	"name": "MarchOk",
	"color": "turquoise",
	"number": "7894",
	"type": "mailbox"
}, {
	"_id": "9799b9b1a1737902cedc23665d2c81ad",
	"name": "UNO Ok",
	"color": "red",
	"number": "4567891",
	"type": "mailbox"
}, {
	"_id": "af2c656eb829e252c2b49144e4d0f6dc",
	"name": "test it",
	"color": "turquoise",
	"number": "3321",
	"type": "mailbox"
}, {
	"_id": "ea97d978f058a0dbf16afe697ae945c9",
	"name": "vanuwa",
	"color": "red",
	"number": "123456",
	"type": "mailbox"
}, {
	"_id": "ef5d248060b1c35ab854dbebd13e832e",
	"name": "test 23 078",
	"color": "grey",
	"number": "12777",
	"type": "mailbox"
}];

var settingsOn = {
	"settings": {
		"pin": {
			is_on: true,
			active: 11111,
			created: "",
			created_copy: ""
		}
	}
};

var Permissions = {
	"admin": {
		"role": "administrator"
	},
	"not_admin": {
		"role": "user"
	}
};

var isAuthorize = {
	'session': {
		'user': {
			"_id": "8ce53381732507b4aa468efb5d3d4747",
			"id": "8ce53381732507b4aa468efb5d3d4747",
			"username": "1030.ira_company"
		},
		"permissions": Permissions.not_admin,
		"dialplan": {
			"id": "1e212b17f4c01c3bb31a9b21ff896396"
		},
		"settings": settingsOn.settings
	}
};

var isNotAuthorize = {
	'session': false
};

// Local data =================================== //

app.configure(function () {
	app.use(express.static(path.dirname(__dirname)));
	app.use(express.bodyParser());
	app.use(express.logger('dev'));
	app.use(app.router);
});

/**
 * Connect by pin code
 */
app.put('/ajax/connects/pin', function (req, res) {
	res.send({
		"connects": {
			"pin": {
				value: Number(req.body.connects.pin.value) == 11111
			}
		}
	});
});

/**
 * List of company extensions
 */
app.get('/ajax/extensions', function (req, res) {
	res.send({
		"extensions": [{
			"_id": "95c50c4e05cf7993ea326f813f007385",
			"name": "36368 555888",
			"image_id": null,
			"in_number": "5223"
		}, {
			"_id": "95c50c4e05cf7993ea326f813f09b25a",
			"name": "6666 444444",
			"image_id": null,
			"in_number": "1252",
		}, {
			"_id": "37e19b11b273af1bfe7f3e93c93e79ef",
			"name": "Aastra iDev",
			"image_id": "0919c8dd0de9331e427de8a74b9ba0b8",
			"in_number": "12",
		}, {
			"_id": "693f0e88eb877f2dbac1744ced01f879",
			"name": "adfsdf 3asda",
			"image_id": null,
			"in_number": "7789",
		}, {
			"_id": "0d6701fb8b7c4d3b6b4e0480a5a7c6c2",
			"name": "Anatolii Mykhalkiv",
			"image_id": "0919c8dd0de9331e427de8a74b9bba8d",
			"in_number": "457",
		}, {
			"_id": "70b3790208db1516cb7b84b9e7125356",
			"name": "asd asd1",
			"image_id": "0919c8dd0de9331e427de8a74b9bd601",
			"in_number": "123",
		}, {
			"_id": "c30f4b8a01dadd03b1587d97495ba7f0",
			"name": "Cucumber ext",
			"image_id": null,
			"in_number": "1234",
		}, {
			"_id": "693f0e88eb877f2dbac1744ced01193d",
			"name": "errr12 wrwerw",
			"image_id": null,
			"in_number": "7894",
		}, {
			"_id": "ef5d248060b1c35ab854dbebd11a2b47",
			"name": "ghvhj ghjhj",
			"image_id": "0919c8dd0de9331e427de8a74b9bed9c",
			"in_number": "4567",
		}, {
			"_id": "0a80d04635e082422bc2c38ae6cff1a0",
			"name": "Ivan Kebal",
			"image_id": null,
			"in_number": "11",
		}, {
			"_id": "95c50c4e05cf7993ea326f813f05fe5e",
			"name": "Karpenko Lily",
			"image_id": null,
			"in_number": "23",
		}, {
			"_id": "44c9c04590d90005796a273a238e7cf8",
			"name": "Lily Karpenko",
			"image_id": "0919c8dd0de9331e427de8a74b9c0930",
			"in_number": "2006",
		}, {
			"_id": "17469cbe0542d8c007d9f2b29e657654",
			"name": "Normal555 Name",
			"image_id": null,
			"in_number": "1231",
		}, {
			"_id": "0fa91a00f933c8c0835e79ad0d0c770d",
			"name": "Oleg Gryb",
			"image_id": null,
			"in_number": "8888",
		}, {
			"_id": "95c50c4e05cf7993ea326f813f094582",
			"name": "rert345 222222",
			"image_id": null,
			"in_number": "6533"}]
	});
});

/**
 * List of contacts from user mobile, only for development needs
 */
app.get('/ajax/contacts', function (req, res) {
	res.send({
		"contacts": [
			{
				displayName: "Lily",
				name: "Lily",
				phoneNumbers: [
					{
						normalizedNumber: "+380504144151"
					}
				]
			},
			{
				displayName: "Lily",
				name: "Lily",
				phoneNumbers: [
					{
						normalizedNumber: "+380934032379"
					}
				]
			}
		]});
});

/**
 * Session data
 */
app.get('/ajax/session', function (req, res) {
	res.send(isAuthorize);
});

/**
 * List of company mailboxes
 */
app.get('/ajax/mailboxes', function (req, res) {
	res.send({
		"mailboxes": mailboxes
	});
});

/**
 * List of company mailboxes
 */
app.get('/ajax/mailboxes/:mailboxId', function (req, res) {
	res.send({
		"mailbox": mailboxes[_.indexOf(_.pluck(mailboxes, '_id'), req.params.mailboxId)]
	});
});

/**
 * List of company dialplans
 */
app.get('/ajax/dialplans', function (req, res) {
	res.send({
		"dialplans": dialplans
	});
});

/**
 * Detail info about dialplan
 */
app.get('/ajax/dialplans/:dialplanId', function (req, res) {
	res.send({
		"dialplan": dialplans[_.indexOf(_.pluck(dialplans, '_id'), req.params.dialplanId)]
	});
});

/**
 * Save detail info about dialplan
 */
app.put('/ajax/dialplans/:dialplanId', function (req, res) {
	dialplans[_.indexOf(_.pluck(dialplans, '_id'), req.params.dialplanId)] = req.body.dialplan;

	res.send({
		"dialplan": dialplans[_.indexOf(_.pluck(dialplans, '_id'), req.params.dialplanId)]
	});
});

/**
 * Get pin code info
 */
app.get('/ajax/settings/pin', function (req, res) {
	res.send({
		"settings": {
			"pin": {
				is_on: settingsOn.settings.pin.is_on,
				active: "",
				created: "",
				created_copy: ""
			}
		}
	});
});

/**
 * Save pin code info
 */
app.put('/ajax/settings/pin', function (req, res) {
	if (req.body.settings.pin.is_on) {
		if (Number(req.body.settings.pin.active) !== settingsOn.settings.pin.active) {
			res.status(400).send({
				message: "Current pin code is not match"
			});
		}

		settingsOn.settings.pin.is_on = req.body.settings.pin.is_on;
		settingsOn.settings.pin.active = Number(req.body.settings.pin.created);
	}

	res.send({
		"settings": {
			"pin": {
				is_on: settingsOn.settings.pin.is_on,
				active: "",
				created: "",
				created_copy: ""
			}
		}
	});
});

/**
 * Save pin code for authorization
 */
app.put('/ajax/pin', function (req, res) {
	res.send({
		'pin': Number(req.body.pin.value) === Number(settingsOn.settings.pin.active)
	});
});

app.get('*', function (req, res) {
	res.sendfile('index.html');
});

app.listen(port, "0.0.0.0");

console.log('server has been started on localhost:' + port);