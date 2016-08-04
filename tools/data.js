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
	"_id": "user:efab49adb7dc65c50f3fd58f120110ed",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"type": "dialplan",
	"active_action_key": "origin",
	"in_number": "1001",
	"personal": true,
	"title": "Ira Saiko "
}, {
	"_id": "0a80d04635e082422bc2c38ae6d1edb8",
	"in_number": "51365",
	"ex_number": 31102614001,
	"ex_number_id": "b05ece221c3d45b3fda5622ea5327ba8",
	"type": "dialplan",
	"title": "Ewgeny",
	"color": "yellow",
	"actions": {"origin": {"items": []}, "transfer": {"items": [{"number": "1020"}]}, "mailbox": {"items": []}},
	"logo_id": "f6f96e35a63c1ff0b98b4e88f800defb",
	"logo_fullsize": 1,
	"active_action_key": "transfer",
	"logo_name": "CMS_Creative_164657191_Kingfisher.jpg",
	"personal": false
}, {
	"_id": "160a85c60612dddf5c57e2a2be11751f",
	"in_number": "1007",
	"ex_number": 31102614017,
	"ex_number_id": "b05ece221c3d45b3fda5622ea532fbd1",
	"type": "dialplan",
	"title": "DC  sou-nd, transf,fax",
	"color": "turquoise",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "160a85c60612dddf5c57e2a2be1184b1",
	"in_number": "1008",
	"ex_number": 31302074002,
	"ex_number_id": "6c4427ce790a8ad7296e1a8d3b36da14",
	"type": "dialplan",
	"title": "DC voicemail",
	"color": "turquoise",
	"actions": {
		"origin": {"items": []},
		"transfer": {"items": []},
		"mailbox": {"items": [{"id": "518343c8d8186d0191e9b1ebafd831df"}]}
	},
	"active_action_key": "mailbox",
	"personal": false
}, {
	"_id": "160a85c60612dddf5c57e2a2be119399",
	"in_number": "1019",
	"type": "dialplan",
	"ex_number": null,
	"ex_number_id": null,
	"title": "DC transfer ex. number",
	"color": "yellow",
	"actions": {
		"origin": {"items": []},
		"transfer": {"items": []},
		"mailbox": {"items": [{"id": "518343c8d8186d0191e9b1ebafe66850", "number": "9854"}]}
	},
	"active_action_key": "mailbox",
	"personal": false
}, {
	"_id": "160a85c60612dddf5c57e2a2be11ad90",
	"in_number": "1010",
	"ex_number": null,
	"ex_number_id": null,
	"type": "dialplan",
	"title": "DC Time cond and transfer",
	"color": "turquoise",
	"actions": {"origin": {"items": []}, "transfer": {"items": [{"number": "380668117139"}]}, "mailbox": {"items": []}},
	"active_action_key": "transfer",
	"personal": false
}, {
	"_id": "160a85c60612dddf5c57e2a2be11d204",
	"in_number": "1011",
	"type": "dialplan",
	"ex_number": 31102614005,
	"ex_number_id": "b05ece221c3d45b3fda5622ea5329ccb",
	"title": "DC IVR",
	"color": "turquoise",
	"actions": {
		"origin": {"items": []},
		"transfer": {"items": []},
		"mailbox": {"items": [{"id": "953a9bf45242d01f4775147511589323"}]}
	},
	"active_action_key": "mailbox",
	"personal": false
}, {
	"_id": "160a85c60612dddf5c57e2a2be11f874",
	"in_number": "1014",
	"type": "dialplan",
	"ex_number": null,
	"ex_number_id": null,
	"title": "DC hang up",
	"color": "turquoise",
	"actions": {
		"origin": {"items": [{"is_on": true, "short_code": "1"}]},
		"transfer": {"items": []},
		"mailbox": {"items": []}
	},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "2e02c973dae6a3e0b5ff2493fff0860f",
	"in_number": "1808",
	"ex_number": 31102614002,
	"ex_number_id": "b05ece221c3d45b3fda5622ea53288a7",
	"type": "dialplan",
	"title": "rating engine",
	"color": "green",
	"actions": {"origin": {"items": []}, "transfer": {"items": [{"number": "380934032379"}]}, "mailbox": {"items": []}},
	"active_action_key": "transfer",
	"personal": false
}, {
	"_id": "2e02c973dae6a3e0b5ff2493fff80186",
	"in_number": "789",
	"type": "dialplan",
	"ex_number": 31102060206,
	"ex_number_id": "10e01edd08452a225177d1a60559a986",
	"title": "test ex_number",
	"color": "blue",
	"active_action_key": "origin",
	"actions": {"origin": {"items": []}, "mailbox": {"items": []}, "transfer": {"items": []}},
	"personal": false
}, {
	"_id": "37e19b11b273af1bfe7f3e93c9d2ee78",
	"in_number": "1040",
	"type": "dialplan",
	"ex_number": 31102614086,
	"ex_number_id": "b05ece221c3d45b3fda5622ea5351735",
	"title": "test queue",
	"color": "green",
	"actions": {
		"origin": {"items": [{"is_on": true, "short_code": "2"}, {"is_on": true, "short_code": "1"}]},
		"transfer": {"items": [{"number": "902"}]},
		"mailbox": {"items": []}
	},
	"logo_id": "d32eb5f03164e92ba64cae470003cc19",
	"logo_fullsize": 1,
	"active_action_key": "transfer",
	"logo_name": "IMG_0067ft.jpg",
	"personal": false
}, {
	"_id": "37e19b11b273af1bfe7f3e93c9e60a94",
	"in_number": "1041",
	"ex_number": 31102614216,
	"ex_number_id": "b05ece221c3d45b3fda5622ea53903f4",
	"type": "dialplan",
	"title": "callback",
	"color": "yellow",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "430abfaa08c608776fccf06e7744ada5",
	"in_number": "1050",
	"type": "dialplan",
	"ex_number": 31102060202,
	"ex_number_id": "10e01edd08452a225177d1a605597cb4",
	"title": "Marieke",
	"color": "blue",
	"logo_id": "430abfaa08c608776fccf06e7744babb",
	"logo_fullsize": 1,
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"logo_name": "75037.jpg",
	"personal": false
}, {
	"_id": "6614e383204e19d1bdaf03d6576dfa6d",
	"in_number": "787",
	"type": "dialplan",
	"ex_number": 31102614076,
	"ex_number_id": "b05ece221c3d45b3fda5622ea534d313",
	"title": "jhgkhjg",
	"color": "blue",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"logo_id": "7a2c011676caf733192fdc342bed2c6e",
	"logo_fullsize": 1,
	"active_action_key": "origin",
	"logo_name": "14450914.584550.jpeg",
	"personal": false
}, {
	"_id": "73d18ec7ca410f8fb502ffae0a2c0885",
	"in_number": "1018",
	"ex_number": 31102614006,
	"ex_number_id": "b05ece221c3d45b3fda5622ea532aaa5",
	"type": "dialplan",
	"title": "DC Queue",
	"color": "turquoise",
	"actions": {"origin": {"items": []}, "mailbox": {"items": []}, "transfer": {"items": [{"number": "1002"}]}},
	"active_action_key": "transfer",
	"personal": false
}, {
	"_id": "7a2c011676caf733192fdc342b36e373",
	"in_number": "1070",
	"ex_number": 31102614072,
	"ex_number_id": "b05ece221c3d45b3fda5622ea534b9cd",
	"type": "dialplan",
	"title": "Issue2632_2",
	"color": "green",
	"actions": {
		"origin": {"items": [{"is_on": true, "short_code": "1"}]},
		"transfer": {"items": []},
		"mailbox": {"items": []}
	},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "7d1ee1528b9490ec04c851b4e8acf8a4",
	"in_number": "2045",
	"type": "dialplan",
	"title": "test sound extension",
	"color": "blue",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "7d1ee1528b9490ec04c851b4e8ad77a6",
	"in_number": "4563",
	"type": "dialplan",
	"title": "SOUND CHECK",
	"color": "blue",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "8dab04474857e0e5ec611851be431b28",
	"in_number": "1037",
	"type": "dialplan",
	"title": "gfbhcgh",
	"color": "blue",
	"active_action_key": "origin",
	"actions": {"transfer": {"items": []}, "mailbox": {"items": []}, "origin": {"items": []}},
	"personal": false
}, {
	"_id": "8dab04474857e0e5ec611851be433080",
	"in_number": "1029",
	"type": "dialplan",
	"title": "gfvgcvvbhmj",
	"color": "red",
	"active_action_key": "origin",
	"actions": {"transfer": {"items": []}, "mailbox": {"items": []}, "origin": {"items": []}},
	"personal": false
}, {
	"_id": "8dab04474857e0e5ec611851be4337dd",
	"in_number": "1036",
	"type": "dialplan",
	"title": "ghvghjvh",
	"color": "grey",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "a6d158eb8cdd8a62aa11f190d7346f1d",
	"in_number": "3333",
	"ex_number": 31102614074,
	"ex_number_id": "b05ece221c3d45b3fda5622ea534c049",
	"type": "dialplan",
	"title": "Germany",
	"color": "blue",
	"actions": {"origin": {"items": []}, "transfer": {"items": [{"number": "380638705862"}]}, "mailbox": {"items": []}},
	"active_action_key": "transfer",
	"personal": false
}, {
	"_id": "a6d158eb8cdd8a62aa11f190d749115d",
	"in_number": "1118",
	"ex_number": 492015610006,
	"ex_number_id": "32668fb3cacd287a2c101c45dd610359",
	"type": "dialplan",
	"title": "Germany",
	"color": "blue",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "a6d158eb8cdd8a62aa11f190d76be7c7",
	"in_number": "8888",
	"ex_number": 31102614078,
	"ex_number_id": "b05ece221c3d45b3fda5622ea534e94b",
	"type": "dialplan",
	"title": "mobile",
	"color": "yellow",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "c46d501df74d0bb661f21eb5de8050ba",
	"in_number": "4001",
	"type": "dialplan",
	"title": "Double Devices HG",
	"color": "blue",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "c46d501df74d0bb661f21eb5de806e06",
	"in_number": "4002",
	"type": "dialplan",
	"title": "Double Devices TR",
	"color": "green",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "c46d501df74d0bb661f21eb5de808045",
	"in_number": "4003",
	"type": "dialplan",
	"title": "Double Devices TR UDP Bridge",
	"color": "turquoise",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "d660d74cdd21bc99b6faf68b83ab760e",
	"in_number": "12",
	"type": "dialplan",
	"ex_number": 380445557474,
	"ex_number_id": "ea97d978f058a0dbf16afe697a0d5584",
	"title": "test281022",
	"logo_id": "d32eb5f03164e92ba64cae470003dfd9",
	"logo_fullsize": 1,
	"color": "green",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"logo_name": "12.jpg",
	"personal": false
}, {
	"_id": "d660d74cdd21bc99b6faf68b83ac2e78",
	"in_number": "1060",
	"ex_number": 31102614019,
	"ex_number_id": "b05ece221c3d45b3fda5622ea533157f",
	"type": "dialplan",
	"title": "Issue2632_1",
	"color": "yellow",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "ef5d248060b1c35ab854dbebd10064e6",
	"in_number": "6487",
	"ex_number": 31347202659,
	"ex_number_id": "0350fbf3555b900dbffa9d1e103dca95",
	"type": "dialplan",
	"title": "Comsys",
	"color": "blue",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "ef5d248060b1c35ab854dbebd103f1f3",
	"in_number": "423",
	"ex_number": 31102614211,
	"ex_number_id": "b05ece221c3d45b3fda5622ea538d9f6",
	"type": "dialplan",
	"title": "Tolik Transfer",
	"color": "green",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": [{"number": "9854"}]}},
	"active_action_key": "mailbox",
	"personal": false
}, {
	"_id": "ef5d248060b1c35ab854dbebd12acc63",
	"in_number": "1026",
	"ex_number": 31102614123,
	"ex_number_id": "b05ece221c3d45b3fda5622ea5364f46",
	"type": "dialplan",
	"title": "T coms",
	"color": "turquoise",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "ef5d248060b1c35ab854dbebd166e80d",
	"in_number": "1022",
	"ex_number": 31102614103,
	"ex_number_id": "b05ece221c3d45b3fda5622ea535939e",
	"type": "dialplan",
	"title": "DC Comsys sys",
	"color": "turquoise",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "ef5d248060b1c35ab854dbebd17e62b5",
	"in_number": "556",
	"type": "dialplan",
	"title": "only comsys",
	"color": "grey",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}, {
	"_id": "fd298fee2fe762b5a5057f98c2cc7097",
	"in_number": "2040",
	"ex_number": 31102614043,
	"ex_number_id": "b05ece221c3d45b3fda5622ea533cd92",
	"type": "dialplan",
	"title": "Voicemail",
	"color": "grey",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"active_action_key": "origin",
	"personal": false
}];

var dialplansOnlyPersonal = [{
	"_id": "user:efab49adb7dc65c50f3fd58f120110ed",
	"actions": {"origin": {"items": []}, "transfer": {"items": []}, "mailbox": {"items": []}},
	"type": "dialplan",
	"active_action_key": "origin",
	"in_number": "1001",
	"personal": true,
	"title": "Ira Saiko "
}];

var dialplansList = dialplans;

var mailboxes = [{
	"_id": "4f098a2c089226e0d4f79be4add8a172",
	"name": "testing data",
	"color": "red",
	"number": "5555"
}, {
	"_id": "518343c8d8186d0191e9b1ebafd831df",
	"name": "fgsdfg",
	"color": "grey",
	"number": "5533"
}, {
	"_id": "518343c8d8186d0191e9b1ebafe66850",
	"name": "xfgbhcgh",
	"color": "blue",
	"number": "9854"
}, {
	"_id": "76edab16f0562b07a0076d206c58cade",
	"name": "new",
	"color": "blue",
	"number": "1032",
	"resource_type": "company"
}, {
	"_id": "953a9bf45242d01f4775147511589323",
	"name": "five seven",
	"color": "yellow",
	"number": "554785"
}, {
	"_id": "9d463cb058c1032c19173f4c9142ed2a",
	"name": "xcvzxc",
	"color": "turquoise",
	"number": "4433"
}, {
	"_id": "cdba13a484efbd15cc5e452e272b1fd9",
	"name": "Do not change voice mail",
	"color": "yellow",
	"number": "1011",
	"resource_type": "company",
	"email": null
}, {"_id": "f8542295c766e74e38243ee98f651558", "name": "wretwertwert", "color": "red", "number": "7542"}];

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
		"_id": "02bbaa68b014a8f84f390010382e92f5",
		"in_number": "1034",
		"user_id": "02bbaa68b014a8f84f390010382e6d8b",
		"username": "1034.ira_company",
		"name": "BLF BLF",
		"type": "user"
	}, {
		"_id": "02bbaa68b014a8f84f3900103846e99c",
		"in_number": "902",
		"user_id": "02bbaa68b014a8f84f3900103846c765",
		"username": "902.ira_company",
		"name": "yurch test3",
		"type": "user"
	}, {
		"_id": "0a80d04635e082422bc2c38ae6a55f80",
		"in_number": "3265",
		"user_id": "0a80d04635e082422bc2c38ae6a5318c",
		"username": "3265.ira_company",
		"image_id": "d6ad982f218c0e679660e1f23a00ac59",
		"name": "test sim card test sim card",
		"type": "user"
	}, {
		"_id": "0a80d04635e082422bc2c38ae6d1e3a1",
		"in_number": "51365",
		"ex_number": 31102614001,
		"image_id": "f6f96e35a63c1ff0b98b4e88f800defb",
		"name": "Ewgeny",
		"type": "dialplan"
	}, {
		"_id": "108c98581479678f9ca20b09c18c094e",
		"in_number": "1111",
		"user_id": "108c98581479678f9ca20b09c18bd5b6",
		"username": "1111.ira_company",
		"name": "Let Provisioning",
		"type": "user"
	}, {
		"_id": "160a85c60612dddf5c57e2a2be116531",
		"in_number": "1007",
		"ex_number": 31102614017,
		"name": "DC  sou-nd, transf,fax",
		"type": "dialplan"
	}, {
		"_id": "160a85c60612dddf5c57e2a2be117fc7",
		"in_number": "1008",
		"ex_number": 31302074002,
		"name": "DC voicemail",
		"type": "dialplan"
	}, {
		"_id": "160a85c60612dddf5c57e2a2be118c8b",
		"in_number": "1019",
		"name": "DC transfer ex. number",
		"type": "dialplan"
	}, {
		"_id": "160a85c60612dddf5c57e2a2be11ac66",
		"in_number": "1010",
		"name": "DC Time cond and transfer",
		"type": "dialplan"
	}, {
		"_id": "160a85c60612dddf5c57e2a2be11ce8c",
		"in_number": "1011",
		"ex_number": 31102614005,
		"name": "DC IVR",
		"type": "dialplan"
	}, {
		"_id": "160a85c60612dddf5c57e2a2be11e95a",
		"in_number": "1014",
		"name": "DC hang up",
		"type": "dialplan"
	}, {
		"_id": "1f53d11c37d4d9c3fc091ceadd001b53",
		"in_number": "1002",
		"user_id": "1f53d11c37d4d9c3fc091ceadd0004d0",
		"username": "1002.ira_company",
		"image_id": "d6ad982f218c0e679660e1f23a00865c",
		"name": "Olya Antonenko",
		"type": "user"
	}, {
		"_id": "1f53d11c37d4d9c3fc091ceadd005229",
		"in_number": "1003",
		"user_id": "1f53d11c37d4d9c3fc091ceadd002e0a",
		"username": "1003.ira_company",
		"image_id": "d6ad982f218c0e679660e1f23a009857",
		"name": "Sasha Sasha3",
		"type": "user"
	}, {
		"_id": "235c341943f5b181936b7e981ed7db7f",
		"in_number": "1005",
		"user_id": "235c341943f5b181936b7e981ed7bb80",
		"username": "1005.ira_company",
		"image_id": "d6ad982f218c0e679660e1f23a004f01",
		"name": "Dima Dima2",
		"type": "user"
	}, {
		"_id": "235c341943f5b181936b7e981ee86424",
		"in_number": "1017",
		"user_id": "235c341943f5b181936b7e981ee83f73",
		"username": "1017.ira_company",
		"image_id": "d6ad982f218c0e679660e1f23a0067e4",
		"name": "Ewgeny test",
		"type": "user"
	}, {
		"_id": "2e02c973dae6a3e0b5ff2493fff07880",
		"in_number": "1808",
		"ex_number": 31102614002,
		"name": "rating engine",
		"type": "dialplan"
	}, {
		"_id": "2e02c973dae6a3e0b5ff2493fff800ca",
		"in_number": "789",
		"ex_number": 31102060206,
		"name": "test ex_number",
		"type": "dialplan"
	}, {
		"_id": "37e19b11b273af1bfe7f3e93c9d2e68e",
		"in_number": "1040",
		"ex_number": 31102614086,
		"image_id": "d32eb5f03164e92ba64cae470003cc19",
		"name": "test queue",
		"type": "dialplan"
	}, {
		"_id": "37e19b11b273af1bfe7f3e93c9e60042",
		"in_number": "1041",
		"ex_number": 31102614216,
		"name": "callback",
		"type": "dialplan"
	}, {
		"_id": "37e19b11b273af1bfe7f3e93c9ea0ed7",
		"in_number": "1035",
		"user_id": "37e19b11b273af1bfe7f3e93c9e9f8ec",
		"username": "1035.ira_company",
		"name": "Dasha Dasha",
		"type": "user"
	}, {
		"_id": "3d41e2ddfb67543894d9a99c9bc52775",
		"in_number": "900",
		"user_id": "3d41e2ddfb67543894d9a99c9bc4f918",
		"username": "900.ira_company",
		"name": "yurch test1",
		"type": "user"
	}, {
		"_id": "3d41e2ddfb67543894d9a99c9bc58289",
		"in_number": "901",
		"user_id": "3d41e2ddfb67543894d9a99c9bc5593d",
		"username": "901.ira_company",
		"name": "yurch test2",
		"type": "user"
	}, {
		"_id": "430abfaa08c608776fccf06e7744a520",
		"in_number": "1050",
		"ex_number": 31102060202,
		"image_id": "430abfaa08c608776fccf06e7744babb",
		"name": "Marieke",
		"type": "dialplan"
	}, {
		"_id": "438247225f539c2e808829f33d081050",
		"in_number": "1020",
		"user_id": "438247225f539c2e808829f33d07ea3f",
		"username": "1020.ira_company",
		"name": "Tolik IraCorp",
		"type": "user"
	}, {
		"_id": "438247225f539c2e808829f33daa1ac7",
		"in_number": "255",
		"user_id": "438247225f539c2e808829f33da9f7aa",
		"username": "255.ira_company",
		"name": "DC user voicemail",
		"type": "user"
	}, {
		"_id": "49422ff7b2c643b2c64ad9334e0dd8e9",
		"in_number": "1090",
		"user_id": "49422ff7b2c643b2c64ad9334e0db1a9",
		"username": "1090.ira_company",
		"name": "Del ",
		"type": "user"
	}, {
		"_id": "49422ff7b2c643b2c64ad9334e0e1ee8",
		"in_number": "1091",
		"user_id": "49422ff7b2c643b2c64ad9334e0df9e4",
		"username": "1091.ira_company",
		"name": "Del3 ",
		"type": "user"
	}, {
		"_id": "4b00d3b8d8c3b75cb2d8d2eb0d03896e",
		"in_number": "777",
		"user_id": "4b00d3b8d8c3b75cb2d8d2eb0d035c83",
		"username": "777.ira_company",
		"name": "7779 77777",
		"type": "user"
	}, {
		"_id": "527b103b3c39da8e2543ca565287d930",
		"in_number": "515",
		"user_id": "527b103b3c39da8e2543ca565287b1b3",
		"username": "515.ira_company",
		"name": "test delete",
		"type": "user"
	}, {
		"_id": "5d1265c8139f1b19585245a5e10360eb",
		"in_number": "6003",
		"user_id": "5d1265c8139f1b19585245a5e10333f0",
		"username": "6003.ira_company",
		"name": "Oleg Gorbachov1",
		"type": "user"
	}, {
		"_id": "5d1265c8139f1b19585245a5e1039201",
		"in_number": "6004",
		"user_id": "5d1265c8139f1b19585245a5e1036799",
		"username": "6004.ira_company",
		"name": "Oleg Gorbachov2",
		"type": "user"
	}, {
		"_id": "6614e383204e19d1bdaf03d6576def0b",
		"in_number": "787",
		"ex_number": 31102614076,
		"image_id": "7a2c011676caf733192fdc342bed2c6e",
		"name": "jhgkhjg",
		"type": "dialplan"
	}, {
		"_id": "6614e383204e19d1bdaf03d65770575e",
		"in_number": "6967",
		"user_id": "6614e383204e19d1bdaf03d6577012a7",
		"username": "6967.ira_company",
		"name": "Karpenko Lily",
		"type": "user"
	}, {
		"_id": "70b3790208db1516cb7b84b9e70088e5",
		"in_number": "1004",
		"user_id": "70b3790208db1516cb7b84b9e7006191",
		"username": "1004.ira_company",
		"image_id": "d6ad982f218c0e679660e1f23a00bbe4",
		"name": "Vitalik Vitalik 123",
		"type": "user"
	}, {
		"_id": "73d18ec7ca410f8fb502ffae0a2c063f",
		"in_number": "1018",
		"ex_number": 31102614006,
		"name": "DC Queue",
		"type": "dialplan"
	}, {
		"_id": "7a2c011676caf733192fdc342b36d417",
		"in_number": "1070",
		"ex_number": 31102614072,
		"name": "Issue2632_2",
		"type": "dialplan"
	}, {
		"_id": "7a2c011676caf733192fdc342b5bd015",
		"in_number": "1038",
		"user_id": "7a2c011676caf733192fdc342b5bb55b",
		"username": "1038.ira_company",
		"image_id": "7a2c011676caf733192fdc342b5ba7b5",
		"name": "Ivan Kebal",
		"type": "user"
	}, {
		"_id": "7d1ee1528b9490ec04c851b4e8acf406",
		"in_number": "2045",
		"name": "test sound extension",
		"type": "dialplan"
	}, {
		"_id": "7d1ee1528b9490ec04c851b4e8ad72bb",
		"in_number": "4563",
		"name": "SOUND CHECK",
		"type": "dialplan"
	}, {
		"_id": "7f57e16343c55082deda3600b1cc8f93",
		"in_number": "1009",
		"user_id": "7f57e16343c55082deda3600b1cc554e",
		"username": "1009.ira_company",
		"image_id": "d6ad982f218c0e679660e1f23a004b8e",
		"name": "1009 DC ",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d3d6ced",
		"in_number": "1030",
		"user_id": "8ce53381732507b4aa468efb5d3d4747",
		"username": "1030.ira_company",
		"name": "Lilya Lilya",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d3db15d",
		"in_number": "1031",
		"user_id": "8ce53381732507b4aa468efb5d3d8c55",
		"username": "1031.ira_company",
		"name": "DC Tanya22",
		"type": "user"
	}, {
		"_id": "8ce53381732507b4aa468efb5d3e0208",
		"in_number": "1032",
		"user_id": "8ce53381732507b4aa468efb5d3dd5d6",
		"username": "1032.ira_company",
		"name": "Ruslan Ruslan 4",
		"type": "user"
	}, {
		"_id": "8dab04474857e0e5ec611851be430fd3",
		"in_number": "1037",
		"name": "gfbhcgh",
		"type": "dialplan"
	}, {
		"_id": "8dab04474857e0e5ec611851be432a7e",
		"in_number": "1029",
		"name": "gfvgcvvbhmj",
		"type": "dialplan"
	}, {
		"_id": "8dab04474857e0e5ec611851be4331f4",
		"in_number": "1036",
		"name": "ghvghjvh",
		"type": "dialplan"
	}, {
		"_id": "8dab04474857e0e5ec611851be4873b4",
		"in_number": "1043",
		"user_id": "8dab04474857e0e5ec611851be484ac3",
		"username": "1043.ira_company",
		"name": "dfghfghj ",
		"type": "user"
	}, {
		"_id": "8dab04474857e0e5ec611851be4d8ed1",
		"in_number": "1046",
		"user_id": "8dab04474857e0e5ec611851be4d6f0e",
		"username": "1046.ira_company",
		"name": "gfbhgch 56756785",
		"type": "user"
	}, {
		"_id": "8dab04474857e0e5ec611851be4dd4ea",
		"in_number": "1047",
		"user_id": "8dab04474857e0e5ec611851be4da972",
		"username": "1047.ira_company",
		"name": "ghfghjghj ",
		"type": "user"
	}, {
		"_id": "8fd045b17631962c7cea5189cdd0a683",
		"in_number": "1006",
		"user_id": "8fd045b17631962c7cea5189cdd082d2",
		"username": "1006.ira_company",
		"image_id": "d6ad982f218c0e679660e1f23a00b4ad",
		"name": "VanyaVanya ",
		"type": "user"
	}, {
		"_id": "8fd045b17631962c7cea5189cdd9b943",
		"in_number": "1015",
		"user_id": "8fd045b17631962c7cea5189cdd998ac",
		"username": "1015.ira_company",
		"image_id": "d6ad982f218c0e679660e1f23a007bce",
		"name": "linphone my",
		"type": "user"
	}, {
		"_id": "a6d158eb8cdd8a62aa11f190d718db8d",
		"in_number": "1039",
		"user_id": "a6d158eb8cdd8a62aa11f190d718bd39",
		"username": "1039.ira_company",
		"name": "Navi Labek",
		"type": "user"
	}, {
		"_id": "a6d158eb8cdd8a62aa11f190d7346364",
		"in_number": "3333",
		"ex_number": 31102614074,
		"name": "Germany",
		"type": "dialplan"
	}, {
		"_id": "a6d158eb8cdd8a62aa11f190d7383971",
		"in_number": "1306",
		"user_id": "a6d158eb8cdd8a62aa11f190d7380e2c",
		"username": "1306.ira_company",
		"name": "1306 1306",
		"type": "user"
	}, {
		"_id": "a6d158eb8cdd8a62aa11f190d73c2126",
		"in_number": "111",
		"user_id": "a6d158eb8cdd8a62aa11f190d73bf393",
		"username": "111.ira_company",
		"name": "111 ",
		"type": "user"
	}, {
		"_id": "a6d158eb8cdd8a62aa11f190d74909f3",
		"in_number": "1118",
		"ex_number": 492015610006,
		"name": "Germany",
		"type": "dialplan"
	}, {
		"_id": "a6d158eb8cdd8a62aa11f190d76bdd05",
		"in_number": "8888",
		"ex_number": 31102614078,
		"name": "mobile",
		"type": "dialplan"
	}, {
		"_id": "ac9e10b8e74e4a3d3c7519287c00b970",
		"in_number": "1021",
		"user_id": "ac9e10b8e74e4a3d3c7519287c009d59",
		"username": "1021.ira_company",
		"name": "Tolik linphone",
		"type": "user"
	}, {
		"_id": "b927c90d79f3b787766d8e5404758bf9",
		"in_number": "1033",
		"user_id": "b927c90d79f3b787766d8e5404755834",
		"username": "1033.ira_company",
		"name": "fox mulder",
		"type": "user"
	}, {
		"_id": "bd5dce99e8347002960020d784ed88d3",
		"in_number": "279",
		"user_id": "bd5dce99e8347002960020d784ed4cb3",
		"username": "279.ira_company",
		"name": "asdfas asfasdf",
		"type": "user"
	}, {
		"_id": "c46d501df74d0bb661f21eb5de8043dc",
		"in_number": "4001",
		"name": "Double Devices HG",
		"type": "dialplan"
	}, {
		"_id": "c46d501df74d0bb661f21eb5de805f24",
		"in_number": "4002",
		"name": "Double Devices TR",
		"type": "dialplan"
	}, {
		"_id": "c46d501df74d0bb661f21eb5de807430",
		"in_number": "4003",
		"name": "Double Devices TR UDP Bridge",
		"type": "dialplan"
	}, {
		"_id": "d3ac6f2b272787c0d990ef458421d6cb",
		"in_number": "7888",
		"user_id": "d3ac6f2b272787c0d990ef458421a54b",
		"username": "7888.ira_company",
		"name": "Oleksandr Rybachok",
		"type": "user"
	}, {
		"_id": "d660d74cdd21bc99b6faf68b83ab75d4",
		"in_number": "12",
		"ex_number": 380445557474,
		"image_id": "d32eb5f03164e92ba64cae470003dfd9",
		"name": "test281022",
		"type": "dialplan"
	}, {
		"_id": "d660d74cdd21bc99b6faf68b83ac2201",
		"in_number": "1060",
		"ex_number": 31102614019,
		"name": "Issue2632_1",
		"type": "dialplan"
	}, {
		"_id": "ef5d248060b1c35ab854dbebd1005c73",
		"in_number": "6487",
		"ex_number": 31347202659,
		"name": "Comsys",
		"type": "dialplan"
	}, {
		"_id": "ef5d248060b1c35ab854dbebd100abb4",
		"in_number": "6488",
		"user_id": "ef5d248060b1c35ab854dbebd100708e",
		"username": "6488.ira_company",
		"name": "Comsys User 2",
		"type": "user"
	}, {
		"_id": "ef5d248060b1c35ab854dbebd103ec02",
		"in_number": "423",
		"ex_number": 31102614211,
		"name": "Tolik Transfer",
		"type": "dialplan"
	}, {
		"_id": "ef5d248060b1c35ab854dbebd12aca57",
		"in_number": "1026",
		"ex_number": 31102614123,
		"name": "T coms",
		"type": "dialplan"
	}, {
		"_id": "ef5d248060b1c35ab854dbebd166e459",
		"in_number": "1022",
		"ex_number": 31102614103,
		"name": "DC Comsys sys",
		"type": "dialplan"
	}, {
		"_id": "ef5d248060b1c35ab854dbebd17e579f",
		"in_number": "556",
		"name": "only comsys",
		"type": "dialplan"
	}, {
		"_id": "efab49adb7dc65c50f3fd58f120107e1",
		"in_number": "1001",
		"user_id": "efab49adb7dc65c50f3fd58f1200f01a",
		"username": "1001.ira_company",
		"image_id": "7a2c011676caf733192fdc342bef4f5f",
		"name": "Ira Saiko ",
		"type": "user"
	}, {
		"_id": "f00fc2c128be1ac295fff265212b3853",
		"in_number": "2654",
		"user_id": "f00fc2c128be1ac295fff265212b2688",
		"username": "2654.ira_company",
		"name": "26543 ",
		"type": "user"
	}, {
		"_id": "f00fc2c128be1ac295fff265212ed09e",
		"in_number": "2030",
		"user_id": "f00fc2c128be1ac295fff265212e9ebd",
		"username": "2030.ira_company",
		"name": "Nastiia ielagina",
		"type": "user"
	}, {
		"_id": "f00fc2c128be1ac295fff26521302f4c",
		"in_number": "1230",
		"user_id": "f00fc2c128be1ac295fff26521300a8a",
		"username": "1230.ira_company",
		"name": "nastya nastya",
		"type": "user"
	}, {
		"_id": "f00fc2c128be1ac295fff26521921b95",
		"in_number": "2003",
		"user_id": "f00fc2c128be1ac295fff2652191f7a4",
		"username": "2003.ira_company",
		"name": "Not Gigaset ",
		"type": "user"
	}, {
		"_id": "f8542295c766e74e38243ee98f611136",
		"in_number": "519",
		"user_id": "f8542295c766e74e38243ee98f60d3af",
		"username": "519.ira_company",
		"name": "eyrtye ertyerty",
		"type": "user"
	}, {
		"_id": "f8542295c766e74e38243ee98f6bf92a",
		"in_number": "628",
		"user_id": "f8542295c766e74e38243ee98f6bc50a",
		"username": "628.ira_company",
		"name": "dfghdfgh dfghdf",
		"type": "user"
	}, {
		"_id": "f8542295c766e74e38243ee98f6cb3f9",
		"in_number": "727",
		"user_id": "f8542295c766e74e38243ee98f6c834c",
		"username": "727.ira_company",
		"name": "dfghd dfghdg",
		"type": "user"
	}, {
		"_id": "f8542295c766e74e38243ee98f6d1142",
		"in_number": "611",
		"user_id": "f8542295c766e74e38243ee98f6ce70e",
		"username": "611.ira_company",
		"name": "sdfgd sdfgsdfg",
		"type": "user"
	}, {
		"_id": "f8542295c766e74e38243ee98f6d7971",
		"in_number": "610",
		"user_id": "f8542295c766e74e38243ee98f6d5267",
		"username": "610.ira_company",
		"name": "sdfgsdf wrtwertwe",
		"type": "user"
	}, {
		"_id": "fd298fee2fe762b5a5057f98c2cc6de8",
		"in_number": "2040",
		"ex_number": 31102614043,
		"name": "Voicemail",
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
