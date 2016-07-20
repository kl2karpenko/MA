import Model from 'Model';

import Storage from 'models/Storage';

import config from 'envConfig';
import dialogs from 'dialogs';

class PhoneNumber extends Model {
	init() {
		this.managedResource = 'phoneNumber';
		this.isSingle = true;

		return Model.prototype.init();
	}

	_isValid(number) {
		return number.match(/^\+?[\d]+$/);
	}

	_getUserNumber() {
		let phoneValue = this.getValueByPath('value');

		return new Promise((resolve, reject) => {
			if (!phoneValue) {
				dialogs.prompt("Please enter your phone number", (obj) => {
					phoneValue = obj.input1;

					if (!!(phoneValue && this._isValid(phoneValue))) {
						this.updateAttributesFor('value', phoneValue);
						this.save().then(() => {
							resolve(phoneValue);
						});

					} else {
						this.messenger.error('Not a valid phone number', "Warning");
					}
				});
			} else {
				resolve(phoneValue);
			}
		});
	}

	save() {
		let
			value = this.getValueByPath('value');

		let promise = new Promise((resolve, reject) => {
			resolve({
				phoneNumber: value
			});
		});

		return promise.then(() => {
			if (value) {
				Storage.setValue('phone', value);
			} else {
				Storage.deleteValue('phone');
			}

			this._setOriginalValues({
				value: value
			});
		});
	}

	load() {
		return (new Promise()).then(() => {
			let newPhonenUmber = {
				value: Storage.getValue('phone')
			};

			this._setOriginalValues(newPhonenUmber);
			this.assignAttributes(newPhonenUmber);
		});
	}

	_defaultPhoneNumber() {
		return {
			"value": Storage.getValue('phone')
		};
	}
}

let instance = new PhoneNumber();

module.exports = (() => {
	return instance;
})();
