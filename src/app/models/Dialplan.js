import Model                  from 'Model';
import PhoneNumber            from "models/PhoneNumber";
import DialplanList           from "models/DialplanList";

const ACTIVE_ACTION_KEY = 'active_action_key';
const ACTIVE_ARRAY_KEY = 'actions';

class Dialplan extends Model {
	init() {
		this.managedResource = 'dialplan';
		this.listResource = 'dialplans';
		this.listModel = DialplanList;
	}

	_getRecourseName() {
		return 'dialplans';
	}

	_saveFollowToOrigin() {
		let dataForSave = {};

		dataForSave._id = this.getValueByPath("_id");
		dataForSave[ACTIVE_ACTION_KEY] = "origin";
		this._setActiveActionKeyValue("origin");

		// "actions"
		this.updateAttributesFor(ACTIVE_ARRAY_KEY + '.mailbox', { "items": [ ] });
		this.updateAttributesFor(ACTIVE_ARRAY_KEY + '.transfer', { "items": [ ] });

		return this.save({
			data: {
				"dialplan": dataForSave
			}
		}).then(() => {
			this.assignAttributes(this.getModel());
		});
	}

	isMailBoxEnabled() {
		return this.getValueByPath('mailbox_enabled') || false;
	}

	_saveFollowToTransfer(data) {
		let dataForSave = {};

		// set active action key
		this._setActiveActionKeyValue("transfer");

		// actions.transfer.items
		dataForSave[ACTIVE_ARRAY_KEY] = { "transfer": { "items": [this._setDataForTransfer(data)] } };
		// "active_action_key"
		dataForSave[ACTIVE_ACTION_KEY] = "transfer";
		// dialplan _id
		dataForSave._id = this.getValueByPath("_id");

		// "actions"
		this.updateAttributesFor(ACTIVE_ARRAY_KEY + '.mailbox', { "items": [ ] });
		this.updateAttributesFor(ACTIVE_ARRAY_KEY + '.transfer', dataForSave[ACTIVE_ARRAY_KEY].transfer);

		return this.save({
				data: { "dialplan": dataForSave }
			})
			.then(() => {
				this.assignAttributes(this.getModel());
			})
	}

	_saveFollowToMailbox(data) {
		let dataForSave = {};

		// set active action key
		this._setActiveActionKeyValue("mailbox");

		// actions.transfer.items
		dataForSave[ACTIVE_ARRAY_KEY] = { "mailbox": { "items": [this._setDataForMailbox(data)] } };
		// "active_action_key"
		dataForSave[ACTIVE_ACTION_KEY] = "mailbox";
		// dialplan _id
		dataForSave._id = this.getValueByPath("_id");

		// "actions"
		this.updateAttributesFor(ACTIVE_ARRAY_KEY + '.transfer', { "items": [ ] });
		this.updateAttributesFor(ACTIVE_ARRAY_KEY + '.mailbox', dataForSave[ACTIVE_ARRAY_KEY].mailbox);

		return this.save({
			data: {
				"dialplan": dataForSave
			}
		}).then(() => {
			this.assignAttributes(this.getModel());
		});
	}
	
	saveForFlowControl(changedFlowControl) {
		return this.save({
			data: {
				"dialplan": {
					"_id": this.getValueByPath("_id"),
					"actions": {
						"origin": {
							"items": [changedFlowControl]
						}
					}
				}
			}
		});
	}

	static _formatExternalNumber(number) {
		return String(number).replace(/[\s\*#)(\+]+/gi, "");
	}

	isTransferedToExternalNumber() {
		return this.getValueByPath(ACTIVE_ARRAY_KEY + ".transfer.items.0.number") &&
			!this.isTransferedToPersonalMobileNumber();
	}

	getTransferedToExternalNumberData() {
		return this.getValueByPath(ACTIVE_ARRAY_KEY + ".transfer.items.0");
	}

	getCachedToExternalNumberData() {
		return this.getValueByPath("follow.contact");
	}

	getCachedToMailboxData() {
		return this.getValueByPath("follow.mailbox");
	}

	isTransferedToPersonalMobileNumber() {
		let
			mobileNumber = PhoneNumber.getValueByPath('value'),
			numberToTransfer = this.getValueByPath(ACTIVE_ARRAY_KEY + ".transfer.items.0.number");

		if (numberToTransfer) {
			numberToTransfer = Dialplan._formatExternalNumber(numberToTransfer);
		}

		if (mobileNumber) {
			mobileNumber = Dialplan._formatExternalNumber(mobileNumber);
		}

		return numberToTransfer === mobileNumber;
	}

	isTransferedToMailbox() {
		return this.getValueByPath(ACTIVE_ARRAY_KEY + ".mailbox.items.0.number");
	}

	getTransferedToMailboxData() {
		return this.getValueByPath(ACTIVE_ARRAY_KEY + ".mailbox.items.0");
	}

	isTransferedToOriginal() {
		return this._getActiveActionKeyValue() === "origin";
	}

	_getActiveActionKeyValue() {
		return this.getValueByPath(ACTIVE_ACTION_KEY);
	}

	_setActiveActionKeyValue(activeKey) {
		return this.updateAttributesFor(ACTIVE_ACTION_KEY, activeKey);
	}

	assignAttributes(props) {
		super.assignAttributes.call(this, props);

		if (this.isTransferedToExternalNumber()) {
			this.updateAttributesFor('follow.contact', this.getTransferedToExternalNumberData());
		}
		if(this.isTransferedToMailbox()) {
			this.updateAttributesFor('follow.mailbox', this.getTransferedToMailboxData());
		}

		this.isLoaded();

		return this;
	}

	_setDataForTransfer(data) {
		let object = {};

		if (data) {
			if (data.number) object.number = Dialplan._formatExternalNumber(data.number);
			if (data.id) object.id = data.id;
			if (data.user_id) object.user_id = data.user_id;
			object.type = data.type || "contact";
		}


		return object;
	}

	_setDataForMailbox(data) {
		let object = {};

		if (data) {
			if (data.number) object.number = data.number;
			if (data.id) object.id = data.id;
			if (data.user_id) object.user_id = data.user_id;
		}

		return object;
	}

	_defaultDialplan() {
		return {
			"_id": "",
			"personal": false,
			"mailbox_enabled": false,
			"in_number": "",
			"ex_number": "",
			"title": "",
			"actions": this._getDefaultActions(),
			"follow": {
				"mailbox": this._getDefaultMailbox(),
				"contact": this._getDefaultContact()
			},
			"active_action_key": "origin"
		};
	}

	_getDefaultActions() {
		return {
			"origin": {
				"items": [ ]
			},
			"mailbox": {
				"items": [ ]
			},
			"transfer": {
				"items": [ ]
			}
		};
	}

	_getDefaultContact() {
		return {
			"number": "",
			"id": "",
			"user_id": ""
		};
	}

	_getDefaultMailbox() {
		return {
			"number": "",
			"id": ""
		};
	}
}

let instance = new Dialplan();

module.exports = (() => {
	return instance;
})();