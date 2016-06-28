import Model from 'Model';

class Dialplan extends Model {
	init() {
		this.managedResource = 'dialplan';
	}

	_getRecourseName() {
		return 'dialplans';
	}

	_followTo(path, value) {
		let followModel = $.extend({}, this._defaultDialplan().follow);

		Object.keys(followModel).forEach((item) => {
			followModel[item] = item === path ? value : false;
		});

		this.updateAttributesFor('follow', followModel);
	}
	
	_defaultDialplan() {
		return {
			"_id": "",
			"personal": false,
			"in_number": "",
			"ex_number": "",
			"title": "",
			"follow": {
				original: false,
				mobile: false,
				voicemail: false,
				contact: false
			},
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
