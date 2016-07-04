import Model from 'Model';

class Dialplan extends Model {
	init() {
		this.managedResource = 'dialplan';
	}

	_getRecourseName() {
		return 'dialplans';
	}

	_getJSONFollowModel(path) {
		let
			model = {},
			pathName = this._getModelName();

		model[pathName] = {};
		model[pathName]._id = this.getValueByPath('_id');
		model[pathName].follow = {};
		model[pathName].follow[path] = this.getValueByPath('follow.' + path);

		return model;
	}

	_followTo(path, dataForSave) {
		let followModel = $.extend({}, this.getModel().follow);

		Object.keys(followModel).forEach((item) => {
			followModel[item].selected = false;

			if (item === path) {
				followModel[item].selected = true;

				switch(item) {
					case "mailbox":
						followModel[item].is_on = this.getModel().follow.mailbox.is_on;
						if (dataForSave) {
							followModel[item].value._id = dataForSave._id;
							followModel[item].value.name = dataForSave.name;
							followModel[item].value.number = dataForSave.number;
						}
						break;
					case "contact":
						followModel[item].value = dataForSave;
						break;
					case "mobile":
						followModel[item].value.number = dataForSave.number;
						break;
					default:
						followModel[item].value = dataForSave;
						break;
				}
			}
		});

		this.updateAttributesFor('follow', followModel);
		return this.save({
			data: this._getJSONFollowModel(path)
		});
	}
	
	_changeFlowControlAction() {
		let
			model = {},
			pathName = this._getModelName();

		model[pathName] = {};
		model[pathName]._id = this.getValueByPath('_id');
		model.actions = this.getValueByPath('actions');

		this.save({
			data: model
		});

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
