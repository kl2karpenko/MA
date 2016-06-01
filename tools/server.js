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

app.get('/ajax/extensions', function (req, res) {
	res.send({
		"users": [{
			"_id": "95c50c4e05cf7993ea326f813f007385",
			"_rev": "19-d18f1347354a0e6a66b4fb9b8a8e1fab",
			"name": "36368 555888",
			"first_name": "36368",
			"second_name": "555888",
			"username": "5223.sup",
			"image_id": null,
			"role_id": "0df4fe75347a4310663a58839bcc2d69",
			"role": "Administrator -",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "not_device_admin_company",
			"ext_id": "95c50c4e05cf7993ea326f813f009f22",
			"in_number": "5223",
			"caller_id": 3233037802,
			"permit_id": "95c50c4e05cf7993ea326f813f008617",
			"device": {"_id": null, "name": null, "type": null},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:5223.sup"
		}, {
			"_id": "95c50c4e05cf7993ea326f813f09b25a",
			"_rev": "13-479e520b452962bf28611f97ab8a73bc",
			"name": "6666 444444",
			"first_name": "6666",
			"second_name": "444444",
			"username": "1252.sup",
			"image_id": null,
			"role_id": "1b579f07eb1be47e5da0c2ef305106db",
			"role": "User",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "moder_company",
			"ext_id": "95c50c4e05cf7993ea326f813f09dc1a",
			"in_number": "1252",
			"caller_id": 31102614009,
			"permit_id": "95c50c4e05cf7993ea326f813f09beea",
			"device": {"_id": "58d2e3bd6884f02c12c5082e953112a6", "name": "AASDASD", "type": "device"},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:1252.sup"
		}, {
			"_id": "37e19b11b273af1bfe7f3e93c93e79ef",
			"_rev": "4-ee87d4afebd2c5709922551f96ade800",
			"name": "Aastra iDev",
			"first_name": "Aastra",
			"second_name": "iDev",
			"username": "12.sup",
			"image_id": "0919c8dd0de9331e427de8a74b9ba0b8",
			"role_id": "38e6f6306b0c9baf5a3a679d7bf45ba8",
			"role": "Administrator",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "admin_company",
			"ext_id": "37e19b11b273af1bfe7f3e93c93eacbb",
			"in_number": "12",
			"caller_id": 31102614000,
			"permit_id": "37e19b11b273af1bfe7f3e93c93e88d3",
			"device": {"_id": "37e19b11b273af1bfe7f3e93c93e2687", "name": "Aastra 6865i iDev1", "type": "device"},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:12.sup"
		}, {
			"_id": "693f0e88eb877f2dbac1744ced01f879",
			"_rev": "5-b77f6d0b3dd9e5a5c7ec66f8c3498226",
			"name": "adfsdf 3asda",
			"first_name": "adfsdf",
			"second_name": "3asda",
			"username": "7789.sup",
			"image_id": null,
			"role_id": "1b579f07eb1be47e5da0c2ef305106db",
			"role": "User",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "moder_company",
			"ext_id": "693f0e88eb877f2dbac1744ced0222b8",
			"in_number": "7789",
			"caller_id": 492011111178,
			"permit_id": "693f0e88eb877f2dbac1744ced020244",
			"device": {"_id": "95c50c4e05cf7993ea326f813f038c4e", "name": "sony_new_model", "type": "device"},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:7789.sup"
		}, {
			"_id": "0d6701fb8b7c4d3b6b4e0480a5a7c6c2",
			"_rev": "170-808878823454f001cc5b0b34bec5265e",
			"name": "Anatolii Mykhalkiv",
			"first_name": "Anatolii",
			"second_name": "Mykhalkiv",
			"username": "457.sup",
			"image_id": "0919c8dd0de9331e427de8a74b9bba8d",
			"role_id": "38e6f6306b0c9baf5a3a679d7bf45ba8",
			"role": "Administrator",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "admin_company",
			"ext_id": "0d6701fb8b7c4d3b6b4e0480a5a800a7",
			"in_number": "457",
			"caller_id": 31102614031,
			"permit_id": "0d6701fb8b7c4d3b6b4e0480a5a7d829",
			"device": {"_id": "0e91c156d4223cb0f8e87c642e023213", "name": "Toestel [n]", "type": "device"},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:457.sup"
		}, {
			"_id": "70b3790208db1516cb7b84b9e7125356",
			"_rev": "28-0d41fd58103656f1fa1a573f358f770d",
			"name": "asd asd1",
			"first_name": "asd",
			"second_name": "asd1",
			"username": "123.sup",
			"image_id": "0919c8dd0de9331e427de8a74b9bd601",
			"role_id": "38e6f6306b0c9baf5a3a679d7bf45ba8",
			"role": "Administrator",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "admin_company",
			"ext_id": "70b3790208db1516cb7b84b9e7126e86",
			"in_number": "123",
			"caller_id": 31102614009,
			"permit_id": "70b3790208db1516cb7b84b9e7126174",
			"device": {"_id": "d8026245db82aa49d9aa0666a314817a", "name": "Yoko Yoko", "type": "device"},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:123.sup"
		}, {
			"_id": "c30f4b8a01dadd03b1587d97495ba7f0",
			"_rev": "5-75ee624132db2c4c617f4cf2d7586b0e",
			"name": "Cucumber ext",
			"first_name": "Cucumber",
			"second_name": "ext",
			"username": "1234.sup",
			"image_id": null,
			"role_id": "38e6f6306b0c9baf5a3a679d7bf45ba8",
			"role": "Administrator",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "admin_company",
			"ext_id": "c30f4b8a01dadd03b1587d97495bd763",
			"in_number": "1234",
			"caller_id": 31102614031,
			"permit_id": "c30f4b8a01dadd03b1587d97495bc390",
			"device": {"_id": null, "name": null, "type": null},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:1234.sup"
		}, {
			"_id": "693f0e88eb877f2dbac1744ced01193d",
			"_rev": "6-2acae57c082fd79b76e7cdb77f9d3278",
			"name": "errr12 wrwerw",
			"first_name": "errr12",
			"second_name": "wrwerw",
			"username": "7894.sup",
			"image_id": null,
			"role_id": "1b579f07eb1be47e5da0c2ef305106db",
			"role": "User",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "moder_company",
			"ext_id": "693f0e88eb877f2dbac1744ced0130c6",
			"in_number": "7894",
			"caller_id": 31102614009,
			"permit_id": "693f0e88eb877f2dbac1744ced011cc6",
			"device": {"_id": null, "name": null, "type": null},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:7894.sup"
		}, {
			"_id": "ef5d248060b1c35ab854dbebd11a2b47",
			"_rev": "7-220aa1fad521d2d546517952064863b8",
			"name": "ghvhj ghjhj",
			"first_name": "ghvhj",
			"second_name": "ghjhj",
			"username": "4567.sup",
			"image_id": "0919c8dd0de9331e427de8a74b9bed9c",
			"role_id": "1b579f07eb1be47e5da0c2ef305106db",
			"role": "User",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "moder_company",
			"ext_id": "ef5d248060b1c35ab854dbebd11a5bc9",
			"in_number": "4567",
			"caller_id": 31102614000,
			"permit_id": "ef5d248060b1c35ab854dbebd11a3fdf",
			"device": {"_id": null, "name": null, "type": null},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:4567.sup"
		}, {
			"_id": "0a80d04635e082422bc2c38ae6cff1a0",
			"_rev": "131-cfe5b9b5249ca16fe90523cd4a95cd99",
			"name": "Ivan Kebal",
			"first_name": "Ivan",
			"second_name": "Kebal",
			"username": "11.sup",
			"image_id": null,
			"role_id": "0df4fe75347a4310663a58839bcc2d69",
			"role": "Administrator -",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "not_device_admin_company",
			"ext_id": "0a80d04635e082422bc2c38ae6d01601",
			"in_number": "11",
			"caller_id": 31102614009,
			"permit_id": "0a80d04635e082422bc2c38ae6cff91a",
			"device": {"_id": "4f098a2c089226e0d4f79be4ad295914", "name": "Yoba Yoba", "type": "device"},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:11.sup"
		}, {
			"_id": "95c50c4e05cf7993ea326f813f05fe5e",
			"_rev": "4-75cee98ea78a41b4f41e7e4f4f5ffed9",
			"name": "Karpenko Lily",
			"first_name": "Karpenko",
			"second_name": "Lily",
			"username": "23.sup",
			"image_id": null,
			"role_id": "1b579f07eb1be47e5da0c2ef305106db",
			"role": "User",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "moder_company",
			"ext_id": "95c50c4e05cf7993ea326f813f0621ed",
			"in_number": "23",
			"caller_id": 492011111178,
			"permit_id": "95c50c4e05cf7993ea326f813f060ce5",
			"device": {"_id": null, "name": null, "type": null},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:23.sup"
		}, {
			"_id": "44c9c04590d90005796a273a238e7cf8",
			"_rev": "14-18958a6902f70121fcccaa708ed74596",
			"name": "Lily Karpenko",
			"first_name": "Lily",
			"second_name": "Karpenko",
			"username": "2006.sup",
			"image_id": "0919c8dd0de9331e427de8a74b9c0930",
			"role_id": "38e6f6306b0c9baf5a3a679d7bf45ba8",
			"role": "Administrator",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "admin_company",
			"ext_id": "44c9c04590d90005796a273a238e9222",
			"in_number": "2006",
			"caller_id": 31347202664,
			"permit_id": "44c9c04590d90005796a273a238e86f2",
			"device": {"_id": "0a80d04635e082422bc2c38ae6aac92a", "name": "New", "type": "device"},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:2006.sup"
		}, {
			"_id": "17469cbe0542d8c007d9f2b29e657654",
			"_rev": "10-9d37ea877ace5db4c24da251d7923f0f",
			"name": "Normal555 Name",
			"first_name": "Normal555",
			"second_name": "Name",
			"username": "1231.sup",
			"image_id": null,
			"role_id": "1b579f07eb1be47e5da0c2ef305106db",
			"role": "User",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "moder_company",
			"ext_id": "17469cbe0542d8c007d9f2b29e659cdf",
			"in_number": "1231",
			"caller_id": 31102614000,
			"permit_id": "17469cbe0542d8c007d9f2b29e6589e5",
			"device": {"_id": null, "name": null, "type": null},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:1231.sup"
		}, {
			"_id": "0fa91a00f933c8c0835e79ad0d0c770d",
			"_rev": "30-a0a4d1ed85b73196e88f699e284d0b9d",
			"name": "Oleg Gryb",
			"first_name": "Oleg",
			"second_name": "Gryb",
			"username": "8888.sup",
			"image_id": null,
			"role_id": "1b579f07eb1be47e5da0c2ef305106db",
			"role": "User",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "moder_company",
			"ext_id": "0fa91a00f933c8c0835e79ad0d0c9c70",
			"in_number": "8888",
			"caller_id": 31102614031,
			"permit_id": "0fa91a00f933c8c0835e79ad0d0c8810",
			"device": {"_id": "70b3790208db1516cb7b84b9e72496ea", "name": "sadfasdfdsf", "type": "device"},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:8888.sup"
		}, {
			"_id": "95c50c4e05cf7993ea326f813f094582",
			"_rev": "4-d7f5a377cd2f7933982fbed669f12780",
			"name": "rert345 222222",
			"first_name": "rert345",
			"second_name": "222222",
			"username": "6533.sup",
			"image_id": null,
			"role_id": "0df4fe75347a4310663a58839bcc2d69",
			"role": "Administrator -",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "not_device_admin_company",
			"ext_id": "95c50c4e05cf7993ea326f813f097eec",
			"in_number": "6533",
			"caller_id": 31102614009,
			"permit_id": "95c50c4e05cf7993ea326f813f0952df",
			"device": {"_id": null, "name": null, "type": null},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:6533.sup"
		}, {
			"_id": "2aeec8f7e58020d5983146aaaa03bd7e",
			"_rev": "5861-3f97aa09b6583dc3db6cb696f05cacf1",
			"name": "Sergii Stotskiy",
			"first_name": "Sergii",
			"second_name": "Stotskiy",
			"username": "255.sup",
			"image_id": "0919c8dd0de9331e427de8a74b9bfd47",
			"role_id": "38e6f6306b0c9baf5a3a679d7bf45ba8",
			"role": "Administrator",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "admin_company",
			"ext_id": "2aeec8f7e58020d5983146aaaa03d401",
			"in_number": "255",
			"caller_id": 31102614009,
			"permit_id": "2aeec8f7e58020d5983146aaaa03cc80",
			"device": {"_id": "7ff52c3fb1979b94db143deac9832f76", "name": "Ynsdfsdf", "type": "device"},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:255.sup"
		}, {
			"_id": "17469cbe0542d8c007d9f2b29e43acb1",
			"_rev": "5-bd2bbfb6ef5c0af3ff6477fb252a9161",
			"name": "te tee",
			"first_name": "te",
			"second_name": "tee",
			"username": "777.sup",
			"image_id": null,
			"role_id": "1b579f07eb1be47e5da0c2ef305106db",
			"role": "User",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "moder_company",
			"ext_id": "17469cbe0542d8c007d9f2b29e43de48",
			"in_number": "777",
			"caller_id": 31102614033,
			"permit_id": "17469cbe0542d8c007d9f2b29e43beb8",
			"device": {"_id": null, "name": null, "type": null},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:777.sup"
		}, {
			"_id": "d660d74cdd21bc99b6faf68b83b0b284",
			"_rev": "1-f0fdf63d9ad30e98ac7fc68f2718a555",
			"name": "test user",
			"first_name": "test",
			"second_name": "user",
			"username": "6666.sup",
			"image_id": null,
			"role_id": "1b579f07eb1be47e5da0c2ef305106db",
			"role": "User",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "moder_company",
			"ext_id": "d660d74cdd21bc99b6faf68b83b0d67a",
			"in_number": "6666",
			"caller_id": 31102614000,
			"permit_id": "d660d74cdd21bc99b6faf68b83b0c68f",
			"device": {"_id": "191437ce5d8a458616db87de54001621", "name": "sdfgsdfg23", "type": "device"},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:6666.sup"
		}, {
			"_id": "a9d950c495234acc1fc6ffc29303a241",
			"_rev": "6-4d0561bce912605393987ff186f71914",
			"name": "Tester1 Elastic",
			"first_name": "Tester1",
			"second_name": "Elastic",
			"username": "9875.sup",
			"image_id": null,
			"role_id": "1b579f07eb1be47e5da0c2ef305106db",
			"role": "User",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "moder_company",
			"ext_id": "a9d950c495234acc1fc6ffc29303c23f",
			"in_number": "9875",
			"caller_id": null,
			"permit_id": "a9d950c495234acc1fc6ffc29303bdd1",
			"device": {"_id": "3312becea0e3030a182a0a9319a9ffec", "name": "opa2", "type": "device"},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:9875.sup"
		}, {
			"_id": "4b00d3b8d8c3b75cb2d8d2eb0d229556",
			"_rev": "4-838d7a6eb982f602aa3a1786772ffb40",
			"name": "wewert qqqq",
			"first_name": "wewert",
			"second_name": "qqqq",
			"username": "3311.sup",
			"image_id": null,
			"role_id": "1b579f07eb1be47e5da0c2ef305106db",
			"role": "User",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "moder_company",
			"ext_id": "4b00d3b8d8c3b75cb2d8d2eb0d22c3f3",
			"in_number": "3311",
			"caller_id": 31102614033,
			"permit_id": "4b00d3b8d8c3b75cb2d8d2eb0d22a639",
			"device": {"_id": "953a9bf45242d01f47751475113d2908", "name": "asdasdasd", "type": "device"},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:3311.sup"
		}, {
			"_id": "630e057c1687876c63d524d056073180",
			"_rev": "8-2328fd409426bc51cb3a49eb4a4d261f",
			"name": "\u0432\u044b\u0430\u0432  \u044b\u0432\u0430",
			"first_name": "\u0432\u044b\u0430\u0432 ",
			"second_name": "\u044b\u0432\u0430",
			"username": "4321.sup",
			"image_id": null,
			"role_id": "38e6f6306b0c9baf5a3a679d7bf45ba8",
			"role": "Administrator",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "admin_company",
			"ext_id": "630e057c1687876c63d524d056076bd6",
			"in_number": "4321",
			"caller_id": 31102614031,
			"permit_id": "630e057c1687876c63d524d0560740ef",
			"device": {"_id": "953a9bf45242d01f47751475113d8164", "name": "asdasdasd", "type": "device"},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:4321.sup"
		}, {
			"_id": "630e057c1687876c63d524d056068bf7",
			"_rev": "4-00470f0c4358057de2853a55870a5398",
			"name": "\u043a \u043a\u0435",
			"first_name": "\u043a",
			"second_name": "\u043a\u0435",
			"username": "1211.sup",
			"image_id": null,
			"role_id": "1b579f07eb1be47e5da0c2ef305106db",
			"role": "User",
			"organization_id": "2aeec8f7e58020d5983146aaaa02d086",
			"role_alias": "moder_company",
			"ext_id": "630e057c1687876c63d524d05606c609",
			"in_number": "1211",
			"caller_id": 31102614100,
			"permit_id": "630e057c1687876c63d524d05606a5e6",
			"device": {"_id": null, "name": null, "type": null},
			"url": "http:\/\/user.kwebbl.loc\/provider:provider1\/company:sup\/user:1211.sup"
		}], "meta": {"total": 22, "nextKey": "", "prevKey": ""}
	});
});

app.get('/ajax/contacts', function (req, res) {
	res.send([
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
	]);
});

app.get('/ajax/authorize', function (req, res) {
	var isAuthorize = {
		'authorize': {
			'user': {
				"_id": "8ce53381732507b4aa468efb5d3d4747",
				"id": "8ce53381732507b4aa468efb5d3d4747",
				"username": "1030.ira_company",
				"dialplan": {
					"id": "1e212b17f4c01c3bb31a9b21ff896396"
				}
			}
		}
	};

	var isNotAuthorize = {
		'authorize': false
	};

	res.send(isNotAuthorize);
});

app.get('/ajax/session', function (req, res) {
	var isAuthorize = {
		'session': {
			'user': {
				"_id": "8ce53381732507b4aa468efb5d3d4747",
				"id": "8ce53381732507b4aa468efb5d3d4747",
				"username": "1030.ira_company",
				"dialplan": {
					"id": "1e212b17f4c01c3bb31a9b21ff896396"
				}
			}
		}
	};

	var isNotAuthorize = {
		'session': {}
	};

	// res.status(500);
	res.send(isNotAuthorize);
});

app.post('/ajax/login', function (req, res) {
	res.send({
		'login': {
			'user': {
				"_id": "8ce53381732507b4aa468efb5d3d4747",
				"_rev": "6-8c23b8e77214df7a2c2cae2bb485be37",
				"first_name": "Karpenko",
				"second_name": "Lilya",
				"email": "i.sayko@kwebbl.com",
				"image_id": "",
				"organization_id": "efab49adb7dc65c50f3fd58f1200290b",
				"username": "1030.ira_company",
				"type": "user",
				"extension": {
					"_id": "8ce53381732507b4aa468efb5d3d6ced",
					"in_number": "1030",
					"com_id": "efab49adb7dc65c50f3fd58f1200290b",
					"caller_id": "0350fbf3555b900dbffa9d1e103dca95",
					"caller_number": 31347202659,
					"user_id": "8ce53381732507b4aa468efb5d3d4747",
					"type": "extension"
				},
				"mailbox": {
					"_id": "8ce53381732507b4aa468efb5d3d52f2",
					"_rev": "3-622d7331810ddcf1225af6e8bc3cf0bc",
					"enabled": false,
					"number": "1030",
					"owner_id": "8ce53381732507b4aa468efb5d3d4747"
				},
				"permit": {
					"roles": ["1b579f07eb1be47e5da0c2ef305106db"]
				}
			}
		}
	});
});

app.get('/ajax/user/:userId/', function (req, res) {
	res.send({
		'user': {
			"_id": "8ce53381732507b4aa468efb5d3d4747",
			"id": "8ce53381732507b4aa468efb5d3d4747",
			"_rev": "6-8c23b8e77214df7a2c2cae2bb485be37",
			"first_name": "Karpenko",
			"second_name": "Lilya",
			"email": "i.sayko@kwebbl.com",
			"image_id": "",
			"organization_id": "efab49adb7dc65c50f3fd58f1200290b",
			"username": "1030.ira_company",
			"type": "user",
			"extension": {
				"_id": "8ce53381732507b4aa468efb5d3d6ced",
				"in_number": "1030",
				"com_id": "efab49adb7dc65c50f3fd58f1200290b",
				"caller_id": "0350fbf3555b900dbffa9d1e103dca95",
				"caller_number": 31347202659,
				"user_id": "8ce53381732507b4aa468efb5d3d4747",
				"type": "extension"
			},
			"mailbox": {
				"_id": "8ce53381732507b4aa468efb5d3d52f2",
				"_rev": "3-622d7331810ddcf1225af6e8bc3cf0bc",
				"enabled": false,
				"number": "1030",
				"owner_id": "8ce53381732507b4aa468efb5d3d4747"
			},
			"permit": {
				"roles": ["1b579f07eb1be47e5da0c2ef305106db"]
			}
		}
	});
});

app.get('/ajax/dialplan/:dialplanId', function (req, res) {
	res.send({
		"dialplan": {
			"_id": "1",
			"_rev": "1-007552b640d78d014d442f08c38a8116",
			"settings": {"hangup_after_bridge": true, "sleep": 500, "call_timeout": 15, "continue_on_fail": true},
			"ext_id": "1e212b17f4c01c3bb31a9b21ff8c53aa",
			"actions": [{"action_id": "1b579f07eb1be47e5da0c2ef3004a0bf", "value": {"number": 60}}],
			"modified": {"t": 1436517625779, "Y": 2015, "M": 7, "D": 10, "h": 8, "m": 40, "s": 25, "z": "UTC"},
			"created": {"t": 1436517625779, "Y": 2015, "M": 7, "D": 10, "h": 8, "m": 40, "s": 25, "z": "UTC"},
			"type": "dialplan",
			"personal": true,
			"in_number": "255",
			"com_id": "1e212b17f4c01c3bb31a9b21ff896396"
		}
	});
});

app.get('/ajax/dialplans', function (req, res) {
	// setTimeout( , 1000 );
	res.send({
		"dialplans": [{
			"_id": "1",
			"_rev": "1-007552b640d78d014d442f08c38a8116",
			"settings": {"hangup_after_bridge": true, "sleep": 500, "call_timeout": 15, "continue_on_fail": true},
			"ext_id": "1e212b17f4c01c3bb31a9b21ff8c53aa",
			"actions": [{
				"items": {"action_id": "1b579f07eb1be47e5da0c2ef3004a0bf", "value": {"number": 60}}
			}],
			"modified": {"t": 1436517625779, "Y": 2015, "M": 7, "D": 10, "h": 8, "m": 40, "s": 25, "z": "UTC"},
			"created": {"t": 1436517625779, "Y": 2015, "M": 7, "D": 10, "h": 8, "m": 40, "s": 25, "z": "UTC"},
			"type": "dialplan",
			"title": "r ryjyt tju",
			"personal": true,
			"in_number": "255",
			"com_id": "1e212b17f4c01c3bb31a9b21ff896396"
		}, {
			"_id": "2",
			"_rev": "5-4336a36f9211ec244b7bd14fbd5fb7f0",
			"title": "1rule",
			"color": "turquoise",
			"ext_id": "19457038ba53984e82fc6a1f8331466f",
			"modified": {"t": 1464266189372, "Y": 2016, "M": 5, "D": 26, "h": 12, "m": 36, "s": 29, "z": "UTC"},
			"created": {"t": 1436518081240, "Y": 2015, "M": 7, "D": 10, "h": 8, "m": 48, "s": 1, "z": "UTC"},
			"type": "dialplan",
			"actions": [{
				"action_id": "2678d8e9db15becc3397a47500dac7e0",
				"items": [{"action_id": "2678d8e9db15becc3397a47500dac7e0", "items": [], "value": {"short_code": "5"}}],
				"value": {
					"label": "thhjhtyhtyjh",
					"short_code": "4",
					"is_on": true
				}
			},{
				"action_id": "2678d8e9db15becc3397a47500dac7e0",
				"items": [{"action_id": "2678d8e9db15becc3397a47500dac7e0", "items": [], "value": {"short_code": "5"}}],
				"value": {
					"label": "thhjhtyhtyjh",
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
			}, {
				"action_id": "ede9eb56b9489531c9ba9e4c421e25ce",
				"value": {"method": "ring_all", "timeout": 60, "extensions": ["1e212b17f4c01c3bb31a9b21ff8c53aa"]}
			}],
			"in_number": "1234",
			"ex_number": 31152026029,
			"personal": false,
			"com_id": "1e212b17f4c01c3bb31a9b21ff896396"
		}, {
			"_id": "3",
			"_rev": "1-bfa8eb3ee3f2c0e7e96967b5306ecff7",
			"com_id": "1e212b17f4c01c3bb31a9b21ff896396",
			"in_number": "77",
			"modified": {"t": 1436518322773, "Y": 2015, "M": 7, "D": 10, "h": 8, "m": 52, "s": 2, "z": "UTC"},
			"created": {"t": 1436518322773, "Y": 2015, "M": 7, "D": 10, "h": 8, "m": 52, "s": 2, "z": "UTC"},
			"type": "dialplan",
			"title": "tthrth",
			"color": "red",
			"personal": false,
			"ext_id": "19457038ba53984e82fc6a1f837c9c43"
		}, {
			"_id": "4",
			"_rev": "3-297375d401acc96cefe64d11cb568bc2",
			"com_id": "1e212b17f4c01c3bb31a9b21ff896396",
			"in_number": "1234",
			"ex_number": 31152026029,
			"ex_number_id": "61f7329019d10a7dd6872b42d1f5eff0",
			"modified": {"t": 1455119633147, "Y": 2016, "M": 2, "D": 10, "h": 15, "m": 53, "s": 53, "z": "UTC"},
			"created": {"t": 1436518081240, "Y": 2015, "M": 7, "D": 10, "h": 8, "m": 48, "s": 1, "z": "UTC"},
			"type": "dialplan",
			"title": "1rule",
			"color": "turquoise",
			"personal": false,
			"ext_id": "19457038ba53984e82fc6a1f8331466f",
			"actions": [{
				"items": [{
					"action_id": "ede9eb56b9489531c9ba9e4c421e25ce",
					"value": {"method": "ring_all", "timeout": 60, "extensions": ["1e212b17f4c01c3bb31a9b21ff8c53aa"]}
				}]
			}]
		}, {
			"_id": "5",
			"_rev": "1-bfa8eb3ee3f2c0e7e96967b5306ecff7",
			"com_id": "1e212b17f4c01c3bb31a9b21ff896396",
			"in_number": "77",
			"modified": {"t": 1436518322773, "Y": 2015, "M": 7, "D": 10, "h": 8, "m": 52, "s": 2, "z": "UTC"},
			"created": {"t": 1436518322773, "Y": 2015, "M": 7, "D": 10, "h": 8, "m": 52, "s": 2, "z": "UTC"},
			"type": "dialplan",
			"title": "tthrth",
			"personal": false,
			"color": "red",
			"ext_id": "19457038ba53984e82fc6a1f837c9c43"
		}]
	})
});

app.get('/ajax/actions', function (req, res) {
	res.send({
		"actions": [{
			"action": "fax",
			"name": "Fax",
			"alias": "Add fax",
			"image": "4",
			"color": "309df0",
			"cs": "fax",
			"order": 1,
			"_id": "0c2cf9ff062ff7e7d3ea4edd3c6bdb4f"
		}, {
			"action": "ivr",
			"name": "Add IVR",
			"alias": "Add IVR",
			"image": "8",
			"color": "fb6643",
			"cs": "ivr",
			"order": 2,
			"_id": "0c2cf9ff062ff7e7d3ea4edd3c6c356d"
		}, {
			"action": "redirect",
			"name": "Redirect",
			"alias": "Add redirect",
			"image": "7",
			"color": "00c6d8",
			"cs": "transfer",
			"order": 3,
			"_id": "0c2cf9ff062ff7e7d3ea4edd3c6c444f"
		}, {
			"action": "time_condition",
			"name": "Time condition",
			"alias": "Add time condition",
			"image": "",
			"color": "f0be2e",
			"cs": "time_condition",
			"order": 5,
			"_id": "1b579f07eb1be47e5da0c2ef30496fa7"
		}, {
			"action": "hgroup",
			"name": "Add group",
			"alias": "Add group",
			"color": "fb6643",
			"image": "3",
			"cs": "huntgroup",
			"values": [{"value": "ring_all", "title": "Ring All"}, {
				"value": "memory_hunt",
				"title": "Memory Hunt"
			}, {"value": "round_robin", "title": "Round Robin"}, {"value": "cascade", "title": "Cascade"}],
			"order": 8,
			"_id": "ede9eb56b9489531c9ba9e4c421e25ce"
		}, {
			"action": "flow_control",
			"name": "Flow control",
			"alias": "Add flow control",
			"image": "11",
			"color": "00c6d8",
			"cs": "flow_control",
			"order": 9,
			"_id": "2678d8e9db15becc3397a47500dac7e0"
		}, {
			"action": "sound",
			"name": "Sound",
			"alias": "Add sound",
			"image": "5",
			"color": "309df0",
			"cs": "playback",
			"order": 10,
			"_id": "ede9eb56b9489531c9ba9e4c421e3441"
		}, {
			"action": "queue",
			"name": "Queue",
			"alias": "Add queue",
			"image": "6",
			"color": "00b800",
			"cs": "callcenter",
			"order": 11,
			"_id": "ede9eb56b9489531c9ba9e4c421e43dd"
		}, {
			"action": "prefix",
			"name": "Prefix",
			"alias": "Add prefix",
			"image": "9",
			"color": "fb6643",
			"cs": "prefix",
			"order": 12,
			"_id": "c3df81582f576cfebf2b68c3af33dbbb"
		}, {
			"action": "voicemail",
			"name": "Voicemail",
			"alias": "Add voicemail",
			"image": "9",
			"color": "9c9fa7",
			"cs": "voicemail",
			"order": 13,
			"_id": "ede9eb56b9489531c9ba9e4c421e4b4b"
		}, {
			"action": "hangup",
			"name": "Hang up",
			"alias": "Hang up",
			"image": "",
			"color": "fb6643",
			"cs": "hangup",
			"order": 14,
			"_id": "1b579f07eb1be47e5da0c2ef304926f1"
		}]
	});
});

app.post('/ajax/pin', function (req, res) {
	res.send({
		'pin': {
			'correct': true
		}
	});
});

app.get('*', function (req, res) {
	res.sendfile('index.html');
});

app.listen(port, "0.0.0.0");

console.log('server has been started on localhost:' + port);