import Model from 'mainModel';

class Dialplan extends Model {
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
			"personal": false,
			"type": "",
			"in_number": "",
			"com_id": ""
		};
	}
}

let instance = new Dialplan();

module.exports = (() => {
	return instance;
})();
