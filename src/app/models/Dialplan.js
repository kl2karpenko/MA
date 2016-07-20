import Model from 'Model';
import PhoneNumber from "models/PhoneNumber";

const ACTIVE_ACTION_KEY = 'active_action_key';
const ACTIVE_ARRAY_KEY = 'actions';

class Dialplan extends Model {
	init() {
		this.managedResource = 'dialplan';
	}

	_getRecourseName() {
		return 'dialplans';
	}

	_saveFollowToOrigin() {
		if (this._getActiveActionKey() === "origin") {
			return $.Deferred().resolve();
		}

		let
			changedData = {};

		changedData[ACTIVE_ACTION_KEY] = "origin";
		this._setActiveActionKey("origin");

		return this.save({
			data: {
				"dialplan": changedData
			}
		});
	}

	_saveFollowToTransfer(data) {
		if (this._getActiveActionKey() === "transfer" && this._getActiveTransfer().number === data.number) {
			return $.Deferred().resolve();
		}

		let
			changedData = {};

		// update model
		this._setActiveActionKey("transfer");
		changedData[ACTIVE_ACTION_KEY] = "transfer";

		changedData[ACTIVE_ARRAY_KEY] = {
			transfer: this.getValueByPath(ACTIVE_ARRAY_KEY + '.transfer')
		};
		this.updateAttributesFor(ACTIVE_ARRAY_KEY + '.transfer.items.0', data);

		if (data.number !== PhoneNumber.getValueByPath('value')) {
			this.updateAttributesFor("follow.contact", data.number);
		}

		return this.save({
			data: {
				"dialplan": changedData
			}
		});
	}
	
	_getActiveTransfer() {
		return this.getValueByPath(ACTIVE_ARRAY_KEY + ".transfer.items.0");
	}

	_saveFollowToMailbox(data) {
		if (this._getActiveActionKey() === "mailbox" && this._getActiveMailbox()._id === data._id) {
			return $.Deferred().resolve();
		}

		let
			changedData = {};

		// update model
		this._setActiveActionKey("mailbox");
		changedData[ACTIVE_ACTION_KEY] = "mailbox";

		if (data) {
			this.updateAttributesFor(ACTIVE_ARRAY_KEY + '.mailbox.items.0', data);
			this.updateAttributesFor("follow.mailbox", data.number);

			changedData[ACTIVE_ARRAY_KEY] = {
				mailbox: this.getValueByPath(ACTIVE_ARRAY_KEY + '.mailbox')
			};
		}

		return this.save({
			data: {
				"dialplan": changedData
			}
		});
	}

	_getActiveMailbox() {
		return this.getValueByPath(ACTIVE_ARRAY_KEY + ".mailbox.items.0");
	}
	
	saveForFlowControl(changedFlowControl) {
		return this.save({
			data: {
				"dialplan": {
					"actions": {
						"origin": {
							"items": [changedFlowControl]
						}
					}
				}
			}
		});
	}

	_getActiveActionKey() {
		return this.getValueByPath(ACTIVE_ACTION_KEY);
	}

	_setActiveActionKey(activeKey) {
		return this.updateAttributesFor(ACTIVE_ACTION_KEY, activeKey);
	}

	assignAttributes(props) {
		super.assignAttributes.call(this, props);

		if (this._getActiveTransfer()) {

			let
				defaultModel = this.getModel(),
				transferNumber = this._getActiveTransfer().number;

			if (transferNumber && transferNumber !== PhoneNumber.getValueByPath('value')) {
				defaultModel.follow.contact = transferNumber;
			}
		}

		this.isLoaded();

		return this;
	}

	_defaultDialplan() {
		return {
			"_id": "",
			"personal": false,
			"in_number": "",
			"ex_number": "",
			"title": "",
			"actions": {
				"origin": {
					"items": [ ]
				},
				"mailbox": {
					"items": [ ]
				},
				"transfer": {
					"items": [ ]
				}
			},
			"follow": {
				"origin": "",
				"mailbox": "",
				"contact": ""	,
				"mobile": ""
			},
			"active_action_key": "origin"
		};
	}
}

let instance = new Dialplan();

module.exports = (() => {
	return instance;
})();
