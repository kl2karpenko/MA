import Model from 'Model';

class Dialplan extends Model {
	init() {
		this.managedResource = 'dialplan';
	}

	_getRecourseName(path) {
		return this.schema['dialplans'];
	}
	
	_defaultDialplan() {
		return {
			"_id": "",
			"personal": false,
			"in_number": "",
			"ex_number": "",
			"title": "",
			"follow": {},
			"actions": []
		};
	}

	_defaultActions() {
		return [
			{
				"action_id": "",
				"value": {
					"label": "",
					"short_code": "",
					"is_on": false
				}
			}
		];
	}
}

let instance = new Dialplan();

module.exports = (() => {
	return instance;
})();
