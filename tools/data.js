
// Local data =================================== //

var activeActionsPossibleValues = {
	"active_action_key": {
		"name": "original",
		"value": {

		},

		"name": "mailbox",
		"value": {
			"_id": "jthrhrthh89h8rt7hr7th"
		},

		"name": "transfer",
		"value": {
			"number": "934589038459435"
		}
	}
};

var dialplanFollowDefault = {
	"follow": {
		"original": {
			"selected": false
		},
		"mobile": {
			"selected": false,
			"value": {
				"number": ""
			}
		},
		"mailbox": {
			"is_on": true,
			"selected": false,
			"value": {
				"_id": "",
				"name": "",
				"number": ""
			}
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
};

var dialplans = [{
	"_id": "hrththy56y5yh",
	"actions": [],
	"title": "Your personal",
	"personal": true,
	"ex_number": "+32 1 234 56 78",
	"active_action_key": {
		"name": "original",
		"value": {}
	}
}, {
	"_id": "thrty56y56ryr5",
	"title": "Elisa Doe",
	"actions": [{
		"label": "Department Closed",
		"short_code": "4",
		"is_on": true
	}, {
		"label": "Lunch Break",
		"short_code": "3",
		"is_on": true
	}, {
		"short_code": "2",
		"is_on": false
	}],
	"active_action_key": {
		"name": "original",
		"value": {}
	},
	"in_number": "2134",
	"ex_number": 31152026029,
	"personal": false
}, {
	"_id": "5h656h65h5r6h56h",
	"actions": [],
	"in_number": "+38 050 414 41 51",
	"title": "Karpenko Liliia",
	"personal": false,
	"active_action_key": {
		"name": "original",
		"value": {}
	}
}, {
	"_id": "h46yh4hy6hh",
	"in_number": "1234",
	"ex_number": 31152026029,
	"title": "Studenyak Nastia",
	"personal": false,
	"actions": [],
	"active_action_key": {
		"name": "original",
		"value": {}
	}
}, {
	"_id": "h5r6hy46hh4h66h",
	"actions": [],
	"in_number": "+38 093 403 23 79",
	"title": "Kebal Ivan",
	"personal": false,
	"active_action_key": {
		"name": "original",
		"value": {}
	}
}, {
	"_id": "6",
	"actions": [],
	"in_number": "+38 093 403 23 79",
	"title": "Rybachok Oleksandr",
	"personal": false,
	"active_action_key": {
		"name": "original",
		"value": {}
	}
}, {
	"_id": "7",
	"actions": [],
	"in_number": "+38 093 403 23 79",
	"title": "Saiko Iryna",
	"personal": false,
	"active_action_key": {
		"name": "original",
		"value": {}
	}
}, {
	"_id": "8",
	"actions": [],
	"in_number": "+38 093 403 23 79",
	"title": "Berladin Ewgeny",
	"personal": false,
	"active_action_key": {
		"name": "original",
		"value": {}
	}
}, {
	"_id": "9",
	"actions": [],
	"in_number": "+38 093 403 23 79",
	"title": "Yurch Yuriy",
	"personal": false,
	"active_action_key": {
		"name": "original",
		"value": {}
	}
}, {
	"_id": "10",
	"actions": [],
	"in_number": "+38 093 403 23 79",
	"title": "Skorohliad Ivan",
	"personal": false,
	"active_action_key": {
		"name": "original",
		"value": {}
	}
}];

var dialplansOnlyPersonal = [{
	"_id": "hrththy56y5yh",
	"actions": [],
	"title": "Your personal",
	"personal": true,
	"ex_number": "+32 1 234 56 78",
	"active_action_key": {
		"name": "original",
		"value": {}
	}
}];

var dialplansList = dialplans;

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


/**
 * Connect by pin code
 */
var connectsPin = {
   "connects": {
     "pin": {
       value: true
     }
   }
 }

var connectsPinBad = {
   "connects": {
     "pin": {
       value: false
     }
   }
 }

/**
 * List of company extensions
 */
var extensions = {
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
			"in_number": "6533"
		}]
	}

var contacts = {
	"contacts": [
		{
			image: true,
			displayName: "Lily",
			name: "Lily",
			phoneNumbers: [
				{
					normalizedNumber: "380504144151"
				}
			]
		},
		{
			image: true,
			displayName: "Lily",
			name: "Lily",
			phoneNumbers: [
				{
					normalizedNumber: "380934032379"
				}
			]
		}
	]
};

var active_action_key = "active_action_key";

module.exports = {
	active_action_key,
	activeActionsPossibleValues,
  dialplanFollowDefault,
  dialplans,
  dialplansOnlyPersonal,
  dialplansList,
  mailboxes,
  settingsOn,
  Permissions,
  isAuthorize,
  isNotAuthorize,
  connectsPin,
  connectsPinBad,
  extensions,
	contacts
}
