import Model from 'Model';
import PhoneNumber from "models/PhoneNumber";

const
	FOLLOW_MODEL = {
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
	ACTIVE_ACTION_KEY = 'active_action_key';

class Dialplan extends Model {
	init() {
		this.managedResource = 'dialplan';
	}

	_getRecourseName() {
		return 'dialplans';
	}

	saveForFollowTo(path, dataForSave) {
		let
			model = {},
			modelName = this._getModelName(),
			saveData = this._getFollowModel(path, dataForSave);

		if (!this._isDirty()) {
			return $.Deferred().resolve();
		}

		model[modelName] = {};
		model[modelName][ACTIVE_ACTION_KEY] = {};
		model[modelName]._id = this.getValueByPath('_id');
		model[modelName][ACTIVE_ACTION_KEY] = saveData;

		this.updateAttributesFor(ACTIVE_ACTION_KEY, saveData);
		this._setFollowModel(path, dataForSave);

		return this.save({
			data: model
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

	toJSON() {
		let
			model = {};

		model[this._getModelName()] = $.extend({}, this.getModel());
		delete model[this._getModelName()].follow;

		return model;
	}

	assignAttributes(props) {
		super.assignAttributes.call(this, props);

		let activeForward = this.getValueByPath(ACTIVE_ACTION_KEY);
		this._setFollowModel(activeForward.name, activeForward.value);

		return this;
	}

	_setFollowModel(path, followData) {
		let
			forwardModel = $.extend({}, this.getValueByPath('follow'));

		if (path === "mobile" && followData.type === "contact") {
			// If user phone number match with contact phone number
			if (PhoneNumber.getValueByPath('value') !== followData.number) {
				path = "contact";
			}
		}

		Object.keys(forwardModel).forEach((keyForward) => {
			forwardModel[keyForward].selected = false;
		});

		if (path) {
			forwardModel[path].selected = true;
			forwardModel[path].value = followData;
		}

		this.updateAttributesFor('follow', forwardModel);
	}

	_getFollowModel(path, followData) {
		let
			forwardModel = $.extend({}, this.getValueByPath('follow'));

		// If we set data from component, change path to mobile for backend
		if (path === "contact") {
			path = "mobile";
			if (!followData.type) {
				followData.type = "contact";
			}
		}

		if (path) {
			forwardModel[path].selected = true;
			forwardModel[path].value = followData;
		}

		this.updateAttributesFor('follow', forwardModel);

		return {
			name: path,
			value: followData
		};
	}
	
	_defaultDialplan() {
		let defaultDialplan = {
			"_id": "",
			"personal": false,
			"in_number": "",
			"ex_number": "",
			"title": "",
			"follow": FOLLOW_MODEL,
			"actions": []			
		};

		defaultDialplan[ACTIVE_ACTION_KEY] = {
			"name": "",
			"value": {
				
			}
		};
		
		return defaultDialplan;
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
