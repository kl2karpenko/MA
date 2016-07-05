import Model from 'Model';

import Storage from 'models/Storage';

class Pin extends Model {
	init() {
		this.managedResource = 'pin';
		this.isSingle = true;

		return Model.prototype.init();
	}
	
	save() {
		let deferred = $.Deferred();

		deferred.resolve({
			pin: this.pin.value
		});

		deferred.then(() => {
			Storage.setValue('pin', this.pin.value);
			this._setOriginalValues({
				value: this.pin.value
			});
		});

		return deferred;
	}

	load() {
		let deferred = $.Deferred();

		deferred.resolve();
		deferred.then(() => {
			let newPin = {
				value: Storage.getValue('pin')
			};

			this._setOriginalValues(newPin);
			this.assignAttributes(newPin);
		});

		return deferred;
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
