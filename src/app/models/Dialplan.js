import Model from 'Model';

class Dialplan extends Model {
	init() {
		this.managedResource = 'dialplan';
	}

	_getRecourseName() {
		return 'dialplans';
	}

	_followTo(path, dataForSave) {
		let followModel = $.extend({}, this._defaultDialplan().follow);

		Object.keys(followModel).forEach((item) => {
			if (item === path) {
				followModel[item].selected = true;
				if (dataForSave) {
					followModel[item].value = dataForSave;
				}
			}
		});

		this.updateAttributesFor('follow', followModel);
		
		return this;
	}
	
	_defaultDialplan() {
		return {
			"_id": "",
			"personal": false,
			"in_number": "",
			"ex_number": "",
			"title": "",
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
					"selected": false,
					"value": {
						"_id": "",
						"name": "",
						"type": ""
					}
				}
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
