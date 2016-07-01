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
		});		

		return deferred;
	}

	load() {
		let deferred = $.Deferred();

		deferred.resolve();
		deferred.then(() => {
			this.assignAttributes({
				value: Storage.getItem('pin')
			})
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
