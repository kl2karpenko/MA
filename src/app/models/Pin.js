import Model from 'Model';

import Storage from 'models/Storage';

class Pin extends Model {
	init() {
		this.managedResource = 'pin';
		this.isSingle = true;

		return Model.prototype.init();
	}

	deleteValue() {
		Storage.deleteValue('pin');
	}

	isExist() {
		Storage.existValue('pin');
	}
	
	save() {
		let promise = new Promise((resolve, reject) => {
			resolve({
				pin: this.pin.value
			});
		});

		return promise.then(() => {
			if (this.pin.value) {
				Storage.setValue('pin', this.pin.value);
			} else {
				Storage.deleteValue('pin');
			}

			this._setOriginalValues({
				value: this.pin.value
			});
		});
	}

	load() {
		return (new Promise()).then(() => {
			let newPin = {
				value: Storage.getValue('pin')
			};

			this._setOriginalValues(newPin);
			this.assignAttributes(newPin);
		});
	}

	_defaultPin() {
		return {
			"value": ""
		};
	}
}

let instance = new Pin();

module.exports = (() => {
	return instance;
})();
