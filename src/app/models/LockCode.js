import Model from 'Model';

import Storage from 'models/Storage';

class LockCode extends Model {
	init() {
		this.managedResource = 'lockCode';
		this.isSingle = true;

		return Model.prototype.init();
	}

	deleteValue() {
		Storage.deleteValue('lockCode');
	}

	isExist() {
		return Storage.existValue('lockCode');
	}
	
	save() {
		return (new Promise((resolve) => {
			resolve({
				lockCode: this.lockCode.value
			});
		})).then(() => {
			if (this.lockCode.value) {
				Storage.setValue(this.managedResource, this.lockCode.value);
			} else {
				this.deleteValue();
			}

			this._setOriginalValues({
				value: this.lockCode.value
			});
		});
	}

	load() {
		return (new Promise()).then(() => {
			let newPin = {
				value: Storage.getValue('lockCode')
			};

			this._setOriginalValues(newPin);
			this.assignAttributes(newPin);
		});
	}

	_defaultLockCode() {
		return {
			"value": ""
		};
	}
}

let instance = new LockCode();

module.exports = (() => {
	return instance;
})();
