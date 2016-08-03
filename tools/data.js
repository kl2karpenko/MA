// Local data =================================== //

var activeActionsPossibleValues = {
	"actions": {
		"origin": {
			"items": [
				{
					"label": "Department Closed",
					"short_code": "4",
					"is_on": true
				},
				{
					"label": "Lunch Break",
					"short_code": "3",
					"is_on": true
				},
				{
					"short_code": "2",
					"is_on": false
				}
			]
		},
		"mailbox": {
			"items": [
				 {
						"id": "",
						"number": ""
				 }
			]
		},
		"transfer": {
			"items": [
				{
					"number": "",
					"type": ""
				}
			]
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
	"actions": {
		"origin": {
			"items": [
				{
					"label": "Department Closed",
					"short_code": "4",
					"is_on": true
				},
				{
					"label": "Lunch Break",
					"short_code": "3",
					"is_on": true
				},
				{
					"short_code": "2",
					"is_on": false
				}
			]
		},
		"mailbox": {
			"items": []
		},
		"transfer": {
			"items": []
		}
	},
	"title": "Your personal",
	"personal": true,
	"mailbox_enabled": true,
	"ex_number": "+32 1 234 56 78",
	"active_action_key": "origin"
}, {
	"_id": "thrty56y56ryr5",
	"title": "Elisa Doe",
	"actions": {
		"origin": {
			"items": [
				{
					"label": "Department Closed",
					"short_code": "4",
					"is_on": true
				},
				{
					"label": "Lunch Break",
					"short_code": "3",
					"is_on": true
				},
				{
					"short_code": "2",
					"is_on": false
				}
			]
		},
		"mailbox": {
			"items": []
		},
		"transfer": {
			"items": []
		}
	},
	"active_action_key": "origin",
	"in_number": "2134",
	"ex_number": 31152026029,
	"personal": false
}, {
	"_id": "5h656h65h5r6h56h",
	"actions": {
		"origin": {
			"items": [
				{
					"label": "Department Closed",
					"short_code": "4",
					"is_on": true
				},
				{
					"label": "Lunch Break",
					"short_code": "3",
					"is_on": true
				},
				{
					"short_code": "2",
					"is_on": false
				}
			]
		},
		"mailbox": {
			"items": []
		},
		"transfer": {
			"items": []
		}
	},
	"active_action_key": "origin",
	"in_number": "+38 050 414 41 51",
	"title": "Karpenko Liliia",
	"personal": false
}, {
	"_id": "h46yh4hy6hh",
	"in_number": "1234",
	"ex_number": 31152026029,
	"title": "Studenyak Nastia",
	"personal": false,
	"actions": {
		"origin": {
			"items": [
				{
					"label": "Department Closed",
					"short_code": "4",
					"is_on": true
				},
				{
					"label": "Lunch Break",
					"short_code": "3",
					"is_on": true
				},
				{
					"short_code": "2",
					"is_on": false
				}
			]
		},
		"mailbox": {
			"items": []
		},
		"transfer": {
			"items": []
		}
	},
	"active_action_key": "origin"
}, {
	"_id": "h5r6hy46hh4h66h",
	"in_number": "+38 093 403 23 79",
	"title": "Kebal Ivan",
	"personal": false,
	"actions": {
		"origin": {
			"items": [
				{
					"label": "Department Closed",
					"short_code": "4",
					"is_on": true
				},
				{
					"label": "Lunch Break",
					"short_code": "3",
					"is_on": true
				},
				{
					"short_code": "2",
					"is_on": false
				}
			]
		},
		"mailbox": {
			"items": []
		},
		"transfer": {
			"items": []
		}
	},
	"active_action_key": "origin"
}, {
	"_id": "6",
	"in_number": "+38 093 403 23 79",
	"title": "Rybachok Oleksandr",
	"personal": false,
	"actions": {
		"origin": {
			"items": [
				{
					"label": "Department Closed",
					"short_code": "4",
					"is_on": true
				},
				{
					"label": "Lunch Break",
					"short_code": "3",
					"is_on": true
				},
				{
					"short_code": "2",
					"is_on": false
				}
			]
		},
		"mailbox": {
			"items": []
		},
		"transfer": {
			"items": []
		}
	},
	"active_action_key": "origin"
}, {
	"_id": "7",
	"in_number": "+38 093 403 23 79",
	"title": "Saiko Iryna",
	"personal": false,
	"actions": {
		"origin": {
			"items": [
				{
					"label": "Department Closed",
					"short_code": "4",
					"is_on": true
				},
				{
					"label": "Lunch Break",
					"short_code": "3",
					"is_on": true
				},
				{
					"short_code": "2",
					"is_on": false
				}
			]
		},
		"mailbox": {
			"items": []
		},
		"transfer": {
			"items": []
		}
	},
	"active_action_key": "origin"
}, {
	"_id": "8",
	"in_number": "+38 093 403 23 79",
	"title": "Berladin Ewgeny",
	"personal": false,
	"actions": {
		"origin": {
			"items": [
				{
					"label": "Department Closed",
					"short_code": "4",
					"is_on": true
				},
				{
					"label": "Lunch Break",
					"short_code": "3",
					"is_on": true
				},
				{
					"short_code": "2",
					"is_on": false
				}
			]
		},
		"mailbox": {
			"items": []
		},
		"transfer": {
			"items": []
		}
	},
	"active_action_key": "origin"
}, {
	"_id": "9",
	"in_number": "+38 093 403 23 79",
	"title": "Yurch Yuriy",
	"personal": false,
	"actions": {
		"origin": {
			"items": [
				{
					"label": "Department Closed",
					"short_code": "4",
					"is_on": true
				},
				{
					"label": "Lunch Break",
					"short_code": "3",
					"is_on": true
				},
				{
					"short_code": "2",
					"is_on": false
				}
			]
		},
		"mailbox": {
			"items": []
		},
		"transfer": {
			"items": []
		}
	},
	"active_action_key": "origin"
}, {
	"_id": "10",
	"in_number": "+38 093 403 23 79",
	"title": "Skorohliad Ivan",
	"personal": false,
	"actions": {
		"origin": {
			"items": [
				{
					"label": "Department Closed",
					"short_code": "4",
					"is_on": true
				},
				{
					"label": "Lunch Break",
					"short_code": "3",
					"is_on": true
				},
				{
					"short_code": "2",
					"is_on": false
				}
			]
		},
		"mailbox": {
			"items": []
		},
		"transfer": {
			"items": []
		}
	},
	"active_action_key": "origin"
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
	"session": {
		"authorization": {
			"token": false
		}
	}
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
		"_id": "0a80d04635e082422bc2c38ae6d01601",
		"in_number": "11",
		"user_id": "0a80d04635e082422bc2c38ae6cff1a0",
		"username": "11.sup",
		"image_id": "bd5dce99e8347002960020d784b9e0a6",
		"name": "Ivan Kebal",
		"type": "user"
	}, {
		"_id": "0d6701fb8b7c4d3b6b4e0480a5a800a7",
		"in_number": "457",
		"user_id": "0d6701fb8b7c4d3b6b4e0480a5a7c6c2",
		"username": "457.sup",
		"image_id": "0919c8dd0de9331e427de8a74b9bba8d",
		"name": "Anatolii Mykhalkiv",
		"type": "user"
	}, {
		"_id": "0df4fe75347a4310663a58839bf4a3b7",
		"in_number": "0933",
		"name": "NAT",
		"type": "dialplan"
	}, {
		"_id": "0e91c156d4223cb0f8e87c642e002bc2",
		"in_number": "1345",
		"name": "Test",
		"type": "dialplan"
	}, {
		"_id": "0fa91a00f933c8c0835e79ad0d0c9c70",
		"in_number": "8888",
		"user_id": "0fa91a00f933c8c0835e79ad0d0c770d",
		"username": "8888.sup",
		"name": "Oleg Gryb",
		"type": "user"
	}, {
		"_id": "0fa91a00f933c8c0835e79ad0d165340",
		"in_number": "123213",
		"name": "hello",
		"type": "dialplan"
	}, {
		"_id": "0fa91a00f933c8c0835e79ad0d4dd8ab",
		"in_number": "3213",
		"name": "NATT1",
		"type": "dialplan"
	}, {
		"_id": "1224e4b5ee6f4e3f8e1ac5a9d315b613",
		"in_number": "7874",
		"user_id": "1224e4b5ee6f4e3f8e1ac5a9d3159e8c",
		"username": "7874.sup",
		"name": "ап аеп пиаепи",
		"type": "user"
	}, {
		"_id": "1224e4b5ee6f4e3f8e1ac5a9d315f766",
		"in_number": "4541",
		"user_id": "1224e4b5ee6f4e3f8e1ac5a9d315d586",
		"username": "4541.sup",
		"name": "аеп аписи",
		"type": "user"
	}, {
		"_id": "1224e4b5ee6f4e3f8e1ac5a9d3167eb6",
		"in_number": "9090",
		"user_id": "1224e4b5ee6f4e3f8e1ac5a9d316538f",
		"username": "9090.sup",
		"name": "РООР РБОЛБ",
		"type": "user"
	}, {
		"_id": "1322e054f7c52db009116fb084152cdf",
		"in_number": "45435",
		"name": "kkkkewfk1",
		"type": "dialplan"
	}, {
		"_id": "1322e054f7c52db009116fb0844cf927",
		"in_number": "99",
		"name": "NewStruct",
		"type": "dialplan"
	}, {
		"_id": "1322e054f7c52db009116fb0844df044",
		"in_number": "11111",
		"name": "let me test",
		"type": "dialplan"
	}, {
		"_id": "1322e054f7c52db009116fb0844f206a",
		"in_number": "11112",
		"name": "yoba",
		"type": "dialplan"
	}, {
		"_id": "1322e054f7c52db009116fb084a6c91f",
		"in_number": "324234",
		"name": "undefined ",
		"type": "user"
	}, {
		"_id": "17469cbe0542d8c007d9f2b29e43de48",
		"in_number": "777",
		"user_id": "17469cbe0542d8c007d9f2b29e43acb1",
		"username": "777.sup",
		"name": "te tee",
		"type": "user"
	}, {
		"_id": "17469cbe0542d8c007d9f2b29e659cdf",
		"in_number": "1231",
		"user_id": "17469cbe0542d8c007d9f2b29e657654",
		"username": "1231.sup",
		"name": "Normal555 Name",
		"type": "user"
	}, {
		"_id": "235c341943f5b181936b7e981ee25d3d",
		"in_number": "12324",
		"name": "here me ",
		"type": "dialplan"
	}, {
		"_id": "2909abc18ab27bea41f531705d319cb9",
		"in_number": "2222",
		"name": "newTest",
		"type": "dialplan"
	}, {
		"_id": "2aeec8f7e58020d5983146aaaa03d401",
		"in_number": "255",
		"user_id": "2aeec8f7e58020d5983146aaaa03bd7e",
		"username": "255.sup",
		"image_id": "0919c8dd0de9331e427de8a74b9bfd47",
		"name": "Sergii Stotskiy",
		"type": "user"
	}, {
		"_id": "37e19b11b273af1bfe7f3e93c93eacbb",
		"in_number": "12",
		"user_id": "37e19b11b273af1bfe7f3e93c93e79ef",
		"username": "12.sup",
		"image_id": "0919c8dd0de9331e427de8a74b9ba0b8",
		"name": "Aastra iDev",
		"type": "user"
	}, {
		"_id": "44c9c04590d90005796a273a238e9222",
		"in_number": "2006",
		"user_id": "44c9c04590d90005796a273a238e7cf8",
		"username": "2006.sup",
		"image_id": "0919c8dd0de9331e427de8a74b9c0930",
		"name": "Lily Karpenko",
		"type": "user"
	}, {
		"_id": "4b00d3b8d8c3b75cb2d8d2eb0d22c3f3",
		"in_number": "3311",
		"user_id": "4b00d3b8d8c3b75cb2d8d2eb0d229556",
		"username": "3311.sup",
		"name": "wewert qqqq",
		"type": "user"
	}, {
		"_id": "4f098a2c089226e0d4f79be4add5a7ab",
		"in_number": "5544",
		"name": "asd",
		"type": "dialplan"
	}, {
		"_id": "4f098a2c089226e0d4f79be4add6389b",
		"in_number": "7876",
		"user_id": "4f098a2c089226e0d4f79be4add620b1",
		"username": "7876.sup",
		"name": "sdfasdf qweqwe",
		"type": "user"
	}, {
		"_id": "527b103b3c39da8e2543ca5652386a9b",
		"in_number": "778",
		"user_id": "527b103b3c39da8e2543ca56523845a8",
		"username": "778.sup",
		"name": "sasha sasha",
		"type": "user"
	}, {
		"_id": "56a012ccd5de323f9d3234a4fab24aa2",
		"in_number": "1230",
		"user_id": "56a012ccd5de323f9d3234a4fab23314",
		"username": "1230.sup",
		"name": "Fabio Casati",
		"type": "user"
	}, {
		"_id": "5abc0517ae88b1bc500089e39b675cc8",
		"in_number": "44",
		"name": "tetetetetet",
		"type": "dialplan"
	}, {
		"_id": "5abc0517ae88b1bc500089e39bf3019a",
		"in_number": "595",
		"user_id": "5abc0517ae88b1bc500089e39bf2cf60",
		"username": "595.sup",
		"name": "test-5 ",
		"type": "user"
	}, {
		"_id": "6073d9ea4d97274927865cc2fc910b6c",
		"in_number": "423423",
		"name": "43242",
		"type": "dialplan"
	}, {
		"_id": "6073d9ea4d97274927865cc2fccf6d3a",
		"in_number": "0123",
		"name": "Huntgroup1",
		"type": "dialplan"
	}, {
		"_id": "617718c5be80e21db2ab3f91a1b5cabc",
		"in_number": "88800",
		"name": "new dialplpan test",
		"type": "dialplan"
	}, {
		"_id": "630e057c1687876c63d524d05606c609",
		"in_number": "1211",
		"user_id": "630e057c1687876c63d524d056068bf7",
		"username": "1211.sup",
		"name": "к ке",
		"type": "user"
	}, {
		"_id": "630e057c1687876c63d524d056076bd6",
		"in_number": "4321",
		"user_id": "630e057c1687876c63d524d056073180",
		"username": "4321.sup",
		"name": "выав  ыва",
		"type": "user"
	}, {
		"_id": "6614e383204e19d1bdaf03d657056ead",
		"in_number": "5654",
		"name": "sfesef",
		"type": "dialplan"
	}, {
		"_id": "693f0e88eb877f2dbac1744ced0130c6",
		"in_number": "7894",
		"user_id": "693f0e88eb877f2dbac1744ced01193d",
		"username": "7894.sup",
		"name": "errr12445 wrwerw1",
		"type": "user"
	}, {
		"_id": "6a382656ee4c57b69905348bd6ec34e6",
		"in_number": "4441",
		"user_id": "6a382656ee4c57b69905348bd6ec1363",
		"username": "4441.sup",
		"name": "3reyrty 5tyertyert",
		"type": "user"
	}, {
		"_id": "70b3790208db1516cb7b84b9e7126e86",
		"in_number": "123",
		"user_id": "70b3790208db1516cb7b84b9e7125356",
		"username": "123.sup",
		"image_id": "0919c8dd0de9331e427de8a74b9bd601",
		"name": "asd asd1",
		"type": "user"
	}, {
		"_id": "84a4cc858e9be7d37af76f59573eaa20",
		"in_number": "22",
		"user_id": "84a4cc858e9be7d37af76f59573e82e3",
		"username": "22.sup",
		"image_id": "84a4cc858e9be7d37af76f59573f1422",
		"name": "Rulon Oboev",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d023723",
		"in_number": "5789",
		"user_id": "8ce53381732507b4aa468efb5d020b95",
		"username": "5789.sup",
		"name": "test creation",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d029b62",
		"in_number": "3553",
		"user_id": "8ce53381732507b4aa468efb5d026619",
		"username": "3553.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0dc807",
		"in_number": "5723",
		"user_id": "8ce53381732507b4aa468efb5d0dc6fd",
		"username": "5723.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0e470a",
		"in_number": "5724",
		"user_id": "8ce53381732507b4aa468efb5d0e3a1d",
		"username": "5724.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0e555b",
		"in_number": "5725",
		"user_id": "8ce53381732507b4aa468efb5d0e528d",
		"username": "5725.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0e6c62",
		"in_number": "5726",
		"user_id": "8ce53381732507b4aa468efb5d0e6a05",
		"username": "5726.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0e842c",
		"in_number": "5727",
		"user_id": "8ce53381732507b4aa468efb5d0e82f5",
		"username": "5727.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0e917c",
		"in_number": "5728",
		"user_id": "8ce53381732507b4aa468efb5d0e88a9",
		"username": "5728.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0eac72",
		"in_number": "5729",
		"user_id": "8ce53381732507b4aa468efb5d0ea3fb",
		"username": "5729.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0ebe50",
		"in_number": "5730",
		"user_id": "8ce53381732507b4aa468efb5d0eb7d5",
		"username": "5730.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0efec5",
		"in_number": "5731",
		"user_id": "8ce53381732507b4aa468efb5d0eef33",
		"username": "5731.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0f20f5",
		"in_number": "5732",
		"user_id": "8ce53381732507b4aa468efb5d0f1be9",
		"username": "5732.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0f3905",
		"in_number": "5733",
		"user_id": "8ce53381732507b4aa468efb5d0f365a",
		"username": "5733.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0f56f8",
		"in_number": "5734",
		"user_id": "8ce53381732507b4aa468efb5d0f47d6",
		"username": "5734.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0f5f41",
		"in_number": "5735",
		"user_id": "8ce53381732507b4aa468efb5d0f5d32",
		"username": "5735.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0f7a8d",
		"in_number": "5736",
		"user_id": "8ce53381732507b4aa468efb5d0f6ab9",
		"username": "5736.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0fb228",
		"in_number": "5737",
		"user_id": "8ce53381732507b4aa468efb5d0fb065",
		"username": "5737.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0fcf90",
		"in_number": "5738",
		"user_id": "8ce53381732507b4aa468efb5d0fc0ca",
		"username": "5738.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d0ff540",
		"in_number": "5739",
		"user_id": "8ce53381732507b4aa468efb5d0fee6f",
		"username": "5739.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d1063e0",
		"in_number": "5740",
		"user_id": "8ce53381732507b4aa468efb5d10551c",
		"username": "5740.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d10b181",
		"in_number": "5745",
		"user_id": "8ce53381732507b4aa468efb5d10a3d7",
		"username": "5745.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d10e244",
		"in_number": "5746",
		"user_id": "8ce53381732507b4aa468efb5d10ddf3",
		"username": "5746.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d10f518",
		"in_number": "5749",
		"user_id": "8ce53381732507b4aa468efb5d10ed68",
		"username": "5749.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d110bcb",
		"in_number": "5750",
		"user_id": "8ce53381732507b4aa468efb5d110a56",
		"username": "5750.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d1146fb",
		"in_number": "5720",
		"user_id": "8ce53381732507b4aa468efb5d11397c",
		"username": "5720.sup",
		"name": "test creation",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d12f18e",
		"in_number": "5721",
		"user_id": "8ce53381732507b4aa468efb5d12e540",
		"username": "5721.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d141918",
		"in_number": "5761",
		"user_id": "8ce53381732507b4aa468efb5d1409e4",
		"username": "5761.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d158c2e",
		"in_number": "5762",
		"user_id": "8ce53381732507b4aa468efb5d1500cb",
		"username": "5762.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d171a60",
		"in_number": "5763",
		"user_id": "8ce53381732507b4aa468efb5d16f2ec",
		"username": "5763.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d196eb0",
		"in_number": "5770",
		"user_id": "8ce53381732507b4aa468efb5d19631b",
		"username": "5770.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d1d7aed",
		"in_number": "5769",
		"user_id": "8ce53381732507b4aa468efb5d1d6b7c",
		"username": "5769.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d1dc652",
		"in_number": "5775",
		"user_id": "8ce53381732507b4aa468efb5d1dbb50",
		"username": "5775.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d1e3757",
		"in_number": "5776",
		"user_id": "8ce53381732507b4aa468efb5d1e28dd",
		"username": "5776.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d1ea918",
		"in_number": "5777",
		"user_id": "8ce53381732507b4aa468efb5d1ea603",
		"username": "5777.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d1ed07a",
		"in_number": "5778",
		"user_id": "8ce53381732507b4aa468efb5d1ec490",
		"username": "5778.sup",
		"name": "test create",
		"type": "user"
	}, {
		"_id": "95c50c4e05cf7993ea326f813f009f22",
		"in_number": "5223",
		"user_id": "95c50c4e05cf7993ea326f813f007385",
		"username": "5223.sup",
		"name": "363684 (55535)",
		"type": "user"
	}, {
		"_id": "95c50c4e05cf7993ea326f813f0621ed",
		"in_number": "14",
		"user_id": "95c50c4e05cf7993ea326f813f05fe5e",
		"username": "14.sup",
		"name": "Karpenko Lily",
		"type": "user"
	}, {
		"_id": "95c50c4e05cf7993ea326f813f097eec",
		"in_number": "6533",
		"user_id": "95c50c4e05cf7993ea326f813f094582",
		"username": "6533.sup",
		"name": "rert345 222222",
		"type": "user"
	}, {
		"_id": "95c50c4e05cf7993ea326f813f09dc1a",
		"in_number": "1252",
		"user_id": "95c50c4e05cf7993ea326f813f09b25a",
		"username": "1252.sup",
		"name": "6666 444444",
		"type": "user"
	}, {
		"_id": "95c50c4e05cf7993ea326f813f0afe24",
		"in_number": "3434",
		"name": "454345tv4",
		"type": "dialplan"
	}, {
		"_id": "979533f970cedfe00de56a840f0f322f",
		"in_number": "8974",
		"name": "Fax",
		"type": "dialplan"
	}, {
		"_id": "a6d158eb8cdd8a62aa11f190d77cb1e6",
		"in_number": "448",
		"user_id": "a6d158eb8cdd8a62aa11f190d77c9917",
		"username": "448.sup",
		"name": "Test AuthCode",
		"type": "user"
	}, {
		"_id": "a6d158eb8cdd8a62aa11f190d7815326",
		"in_number": "447",
		"user_id": "a6d158eb8cdd8a62aa11f190d78137f5",
		"username": "447.sup",
		"name": "Super Pups",
		"type": "user"
	}, {
		"_id": "a9d950c495234acc1fc6ffc2930059cb",
		"in_number": "4456",
		"image_id": "0919c8dd0de9331e427de8a74b9c12af",
		"name": "ert",
		"type": "dialplan"
	}, {
		"_id": "a9d950c495234acc1fc6ffc29303c23f",
		"in_number": "9875",
		"user_id": "a9d950c495234acc1fc6ffc29303a241",
		"username": "9875.sup",
		"name": "Tester1 Elastic",
		"type": "user"
	}, {
		"_id": "af2c656eb829e252c2b49144e4d0c705",
		"in_number": "3211",
		"image_id": "0919c8dd0de9331e427de8a74b9c1736",
		"name": "my rules",
		"type": "dialplan"
	}, {
		"_id": "b927c90d79f3b787766d8e540474c943",
		"in_number": "5421",
		"user_id": "b927c90d79f3b787766d8e5404748ff0",
		"username": "5421.sup",
		"name": "test2 asdasd",
		"type": "user"
	}, {
		"_id": "b927c90d79f3b787766d8e540494b7bc",
		"in_number": "888",
		"name": "test_perm",
		"type": "dialplan"
	}, {
		"_id": "bcf8ed7cebd01e4be41fe4d4768b507c",
		"in_number": "1111",
		"name": "HG",
		"type": "dialplan"
	}, {
		"_id": "bd5dce99e8347002960020d784808d3b",
		"in_number": "01",
		"user_id": "bd5dce99e8347002960020d784806f92",
		"username": "01.sup",
		"image_id": "bd5dce99e8347002960020d784806a62",
		"name": "iPad Tablet",
		"type": "user"
	}, {
		"_id": "bd5dce99e8347002960020d7848128bc",
		"in_number": "02",
		"user_id": "bd5dce99e8347002960020d78481130a",
		"username": "02.sup",
		"image_id": "bd5dce99e8347002960020d784810bf9",
		"name": "iPhone Phone",
		"type": "user"
	}, {
		"_id": "bd5dce99e8347002960020d784cd9e34",
		"in_number": "532",
		"user_id": "bd5dce99e8347002960020d784cd7d64",
		"username": "532.sup",
		"name": "ext-7 ",
		"type": "user"
	}, {
		"_id": "c30f4b8a01dadd03b1587d97495bd763",
		"in_number": "1234",
		"user_id": "c30f4b8a01dadd03b1587d97495ba7f0",
		"username": "1234.sup",
		"name": "Cucumber ext",
		"type": "user"
	}, {
		"_id": "c3f69c03ec3b0574806bfaae8a8f0779",
		"in_number": "7777",
		"name": "pjsua dialplan",
		"type": "dialplan"
	}, {
		"_id": "d3ac6f2b272787c0d990ef45841248c9",
		"in_number": "329",
		"name": "look-11",
		"type": "dialplan"
	}, {
		"_id": "d3ac6f2b272787c0d990ef458412ef9b",
		"in_number": "43",
		"name": "look-12",
		"type": "dialplan"
	}, {
		"_id": "d3ac6f2b272787c0d990ef4584131432",
		"in_number": "323",
		"name": "look-13",
		"type": "dialplan"
	}, {
		"_id": "d3ac6f2b272787c0d990ef458413b0ea",
		"in_number": "344",
		"name": "look-14",
		"type": "dialplan"
	}, {
		"_id": "d660d74cdd21bc99b6faf68b83b0d67a",
		"in_number": "6666",
		"user_id": "d660d74cdd21bc99b6faf68b83b0b284",
		"username": "6666.sup",
		"name": "test user",
		"type": "user"
	}, {
		"_id": "e18ee7f8b0cd66ff8e1724fb86778099",
		"in_number": "4548",
		"user_id": "e18ee7f8b0cd66ff8e1724fb86775000",
		"username": "4548.sup",
		"name": "Karpenko Lily ",
		"type": "user"
	}, {
		"_id": "e18ee7f8b0cd66ff8e1724fb86841318",
		"in_number": "4546",
		"user_id": "e18ee7f8b0cd66ff8e1724fb8683f1da",
		"username": "4546.sup",
		"name": "lilil ",
		"type": "user"
	}, {
		"_id": "e18ee7f8b0cd66ff8e1724fb8684947f",
		"in_number": "14147",
		"name": "hghghgh",
		"type": "dialplan"
	}, {
		"_id": "e82374ed57bdb8c242aa12614e406f9c",
		"in_number": "32432",
		"name": "undefined ",
		"type": "user"
	}, {
		"_id": "e82374ed57bdb8c242aa12614e4087eb",
		"in_number": "4234",
		"name": "undefined ",
		"type": "user"
	}, {
		"_id": "e82374ed57bdb8c242aa12614e408f88",
		"in_number": "234",
		"name": "undefined ",
		"type": "user"
	}, {
		"_id": "e82374ed57bdb8c242aa12614e4298ac",
		"in_number": "6665",
		"name": "чсячс",
		"type": "dialplan"
	}, {
		"_id": "e82374ed57bdb8c242aa12614e6da33f",
		"in_number": "32",
		"name": "look-1",
		"type": "dialplan"
	}, {
		"_id": "e82374ed57bdb8c242aa12614e6e02dd",
		"in_number": "3455",
		"name": "look-3",
		"type": "dialplan"
	}, {
		"_id": "e82374ed57bdb8c242aa12614ea6767c",
		"in_number": "23423",
		"name": "lool-10",
		"type": "dialplan"
	}, {
		"_id": "ea97d978f058a0dbf16afe697a6a9717",
		"in_number": "2000",
		"image_id": "0919c8dd0de9331e427de8a74b9c1bda",
		"name": "Flow Control",
		"type": "dialplan"
	}, {
		"_id": "ea97d978f058a0dbf16afe697ac640c0",
		"in_number": "3212432",
		"image_id": "0919c8dd0de9331e427de8a74b9c2a6d",
		"name": "newRule",
		"type": "dialplan"
	}, {
		"_id": "ef5d248060b1c35ab854dbebd11c4986",
		"in_number": "6878",
		"ex_number": 31315202003,
		"image_id": "0919c8dd0de9331e427de8a74b9c210a",
		"name": "tyjuuhj",
		"type": "dialplan"
	}, {
		"_id": "ef5d248060b1c35ab854dbebd13e6eef",
		"in_number": "1254",
		"ex_number": 31102614000,
		"image_id": "0919c8dd0de9331e427de8a74b9c242a",
		"name": "test 23 071",
		"type": "dialplan"
	}, {
		"_id": "ef5d248060b1c35ab854dbebd146e799",
		"in_number": "1002",
		"ex_number": 3233037802,
		"name": "test_call_rule",
		"type": "dialplan"
	}]
};

var contacts = {
	"contacts": [
		{
			image: true,
			displayName: "Лилия Карпенко",
			name: "Лилия",
			phoneNumbers: [
				{
					normalizedNumber: "0 (50) 414 41 51"
				}
			]
		},
		{
			image: true,
			displayName: "Лилия",
			name: "Лилия",
			phoneNumbers: [
				{
					normalizedNumber: "380934032379"
				}
			]
		}
	]
};

var active_action_key = "active_action_key";
var action_array_key = "actions";

module.exports = {
	active_action_key,
	action_array_key,
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
};
