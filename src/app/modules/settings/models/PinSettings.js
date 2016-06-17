import Model from 'Model';

class PinSettings extends Model {
	init() {
		this.managedResource = 'settings';

		return Model.prototype.init();
	}

	_getModelName() {
		return "settings";
	}

	_getRecourseName(path) {
		return !path ? this.schema[this.managedResource] : this.schema[this.managedResource][path];
	}

	_defaultSettings() {
		return {
			"is_pin_active": false,
			"pin": {
				current: null,
				newPin: null,
				newPinReenter: null
			}
		};
	}
}

let instance = new PinSettings();

module.exports = (() => {
	return instance;
})();
