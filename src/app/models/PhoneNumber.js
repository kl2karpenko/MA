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
		let deferred = $.Deferred();
		let phoneValue = this.getValueByPath('value');

		if (!phoneValue) {
			console.log(phoneValue, 'phoneValue');
			
			dialogs.prompt("Please enter your phone number", (obj) => {
				phoneValue = obj.input1;

				if (!!(phoneValue && this._isValid(phoneValue))) {
					this.updateAttributesFor('value', phoneValue);
					this.save().then(() => {
						deferred.resolve(phoneValue);
					});

				} else {
					this.messenger.error('Not a valid phone number', "Warning");
				}
			});
		} else {
			deferred.resolve(phoneValue);
		}

		return deferred;
	}

	save() {
		let
			deferred = $.Deferred(),
			value = this.getValueByPath('value');

		deferred.resolve({
			phoneNumber: value
		});

		deferred.then(() => {
			if (value) {
				Storage.setValue('phone', value);
			} else {
				Storage.deleteValue('phone');
			}

			this._setOriginalValues({
				value: value
			});
		});

		return deferred;
	}

	load() {
		let deferred = $.Deferred();

		deferred.resolve();
		deferred.then(() => {
			let newPhonenUmber = {
				value: Storage.getValue('phone')
			};

			this._setOriginalValues(newPhonenUmber);
			this.assignAttributes(newPhonenUmber);
		});

		return deferred;
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
