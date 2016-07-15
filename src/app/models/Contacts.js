import List from 'List';
import Storage from 'models/Storage';

class Pin extends List {
	init() {
		this.managedResource = 'contacts';
		
		return List.prototype.init();
	}
	
	save() {
		let deferred = $.Deferred();

		deferred.resolve({
			pin: this.pin.value
		});

		deferred.then(() => {
			if (this.pin.value) {
				Storage.setValue('pin', this.pin.value);
			} else {
				Storage.deleteValue('pin');
			}

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

	_defaultContact() {
		return {
			"number": "",
			"image": "",
			"name": ""
		};
	}
}

let instance = new Pin();

module.exports = (() => {
	return instance;
})();
