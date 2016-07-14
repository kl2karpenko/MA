import Model from 'Model';

import Storage from 'models/Storage';

class PhoneNumber extends Model {
	init() {
		this.managedResource = 'phoneNumber';
		this.isSingle = true;

		return Model.prototype.init();
	}

	_isValid() {
		return this.getValueByPath('value') !== "";
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
