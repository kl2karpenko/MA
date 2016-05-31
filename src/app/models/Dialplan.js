import Model from 'Model';

import Actions from "models/Actions";

Actions.load().then(() => {
	Actions.flowControlId = Actions.findByField('action', 'flow_control', '_id');
});

class Dialplan extends Model {
	init() {
		this.managedResource = 'dialplan';
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
			"personal": false,
			"type": "",
			"in_number": "",
			"com_id": ""
		};
	}

	_defaultActions() {
		return [
			{
				"action_id": "",
				"items": [ ],
				"value": {
					"label": "",
					"short_code": "",
					"is_on": false
				}
			}
		];
	}

	assignAttributes(props) {
		let defaultAttributes = this._getDefaultAttributes();

		this.Model = defaultAttributes;

		$.extend(true, this.Model, defaultAttributes, props);

		if (this.Model.actions) {
			this.Model.actions = this.Model.actions.filter((action) => {
				return action.action_id === Actions.flowControlId && action;
			});
		}

		return this;
	}
}

let instance = new Dialplan();

module.exports = (() => {
	return instance;
})();
