import Model from 'Model';

const FOLLOW_MODEL = {
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
};
const ACTIVE_ACTION_KEY = 'active_action';

class Dialplan extends Model {
	init() {
		this.managedResource = 'dialplan';
	}

	_getRecourseName() {
		return 'dialplans';
	}

	_getJSONForFollow(path) {
		let
			model = {},
			pathName = this._getModelName();

		model[pathName] = {};
		model[pathName]._id = this.getValueByPath('_id');
		model[pathName].follow = {};
		model[pathName].follow[path] = this.getValueByPath('follow.' + path);

		return model;
	}

	saveForFollowTo(path, dataForSave) {
		let activeFollow = {};
		let followModel = $.extend({}, this.getModel().follow);

		activeFollow[ACTIVE_ACTION_KEY].name = path;

		Object.keys(followModel).forEach((item) => {
			followModel[item].selected = false;

			if (item === path) {
				followModel[item].selected = true;

				switch(item) {
					case "mailbox":
						followModel[item].is_on = this.getModel().follow.mailbox.is_on;
						if (dataForSave && followModel[item].is_on) {
							followModel[item].value._id = dataForSave._id;
							followModel[item].value.name = dataForSave.name;
							followModel[item].value.number = dataForSave.number;
						}

						activeFollow[ACTIVE_ACTION_KEY].value = {
							_id: dataForSave._id
						};

						break;
					case "contact":
						followModel[item].value = dataForSave;

						activeFollow[ACTIVE_ACTION_KEY].value = dataForSave
						break;
					case "mobile":
						followModel[item].value.number = dataForSave.number;
						activeFollow[ACTIVE_ACTION_KEY].value = {
							number: dataForSave.value.number
						};
						break;
					default:
						followModel[item].value = dataForSave;
						activeFollow[ACTIVE_ACTION_KEY].value = {};
						break;
				}
			}
		});

		this.updateAttributesFor('follow', followModel);
		this.updateAttributesFor('active_action', path);

		return this.save({
			data: this._getJSONForFollow(path)
		});
	}
	
	saveForFlowControl(changedFlowControl) {
		let
			model = {},
			pathName = this._getModelName();

		model[pathName] = {};
		model[pathName]._id = this.getValueByPath('_id');
		model[pathName].actions = changedFlowControl;

		return this.save({
			data: model
		});
	}

	_getActiveFollowAction() {
		let
			forwardModel = $.extend({}, FOLLOW_MODEL),
			activeForwardKey = this.getValueByPath(ACTIVE_ACTION_KEY);

		forwardModel[activeForwardKey].selected = true;

		return forwardModel;
	}

	_mappingOptions() {
		return {
			"follow": () => {
				let
					forwardModel = $.extend({}, FOLLOW_MODEL),
					activeForwardKey = this.getValueByPath(ACTIVE_ACTION_KEY + '.name');

				console.log(activeForwardKey);

				forwardModel[activeForwardKey].selected = true;

				return forwardModel;
			}
		}
	}

	toJSON() {
		let
			model = {};

		model[this._getModelName()] = $.extend({}, this.getModel());
		delete model[this._getModelName()].follow;

		return model;
	}
	
	_defaultDialplan() {
		return {
			"_id": "",
			"personal": false,
			"in_number": "",
			"ex_number": "",
			"title": "",
			"active_action": {
				"name": "",
				"value": { }
			},
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
