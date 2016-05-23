import Model from 'mainModel';

class Dialplan extends Model {
	initialize() {
		return dialplan;
	}

	_defaultDialplan() {
		return {
			"_id": "",
			"_rev": "",
			"settings": {
				"call_timeout": 15,
				"continue_on_fail": true,
				"hangup_after_bridge": true,
				"sleep": 500
			},
			"ext_id": "",
			"actions": [],
			"modified": {},
			"created": {},
			"type": "",
			"in_number": "",
			"com_id": ""
		};
	}
}

let dialplan = new Dialplan();

module.exports = dialplan.initialize();
