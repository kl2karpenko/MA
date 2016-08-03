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
			return new Promise((resolve, reject) => {});
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

	isMailBoxEnabled() {
		return this.getValueByPath('mailbox_enabled');
	}

	_checkIfEqualToMobileNumber() {
		let
			mobileNumber = PhoneNumber.getValueByPath('value'),
			transfer = this._getActiveTransfer(),
			numberToTransfer = transfer && transfer.number,
			savedTransferNumber = this.getValueByPath("follow.contact");

		if (numberToTransfer) {
			numberToTransfer = numberToTransfer.replace(/[\s)(\+]+/gi, "");
		}

		if (savedTransferNumber) {
			savedTransferNumber = savedTransferNumber.replace(/[\s)(\+]+/gi, "");
		}

		return {
			activeTransfer: numberToTransfer === mobileNumber,
			savedTransferNumber: savedTransferNumber === mobileNumber
		};
	}

	_saveFollowToTransfer(data) {
		let activeTransfer = this._getActiveTransfer();

		if (this._getActiveActionKey() === "transfer" && (activeTransfer && activeTransfer.number === data.number)) {
			return new Promise((resolve) => {
				resolve();
			});
		}

		let
			changedData = {};

		data.number = data.number.replace(/[\s)(\+]+/gi, "");
		this.updateAttributesFor(ACTIVE_ARRAY_KEY + '.transfer.items.0', data);

		this._setActiveActionKey("transfer");
		changedData[ACTIVE_ACTION_KEY] = "transfer";
		changedData._id = this.getValueByPath("_id");

		changedData[ACTIVE_ARRAY_KEY] = {
			transfer: this.getValueByPath(ACTIVE_ARRAY_KEY + '.transfer')
		};

		if (!this._checkIfEqualToMobileNumber().activeTransfer) {
			this.updateAttributesFor("follow.contact", data.number);
		}

		return this.save({
			data: {
				"dialplan": changedData
			}
		});
	}

	_saveFollowToMailbox(data) {
		let activeMailbox = this._getActiveMailbox();

		if (this._getActiveActionKey() === "mailbox" && activeMailbox && activeMailbox._id === data._id) {
			return new Promise((resolve, reject) => {});
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

	_getActiveTransfer() {
		return this.getValueByPath(ACTIVE_ARRAY_KEY + ".transfer.items.0");
	}

	_getActiveMailbox() {
		let mailbox = this.getValueByPath(ACTIVE_ARRAY_KEY + ".mailbox.items.0");

		return mailbox && mailbox.length || mailbox;
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
