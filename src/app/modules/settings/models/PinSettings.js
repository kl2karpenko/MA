import Model from 'Model';

class PinSettings extends Model {
	init() {
		this.managedResource = 'settings';
		this.isSingle = true;

		return Model.prototype.init();
	}

	_getModelName() {
		return "settings";
	}

	_isValid() {
		let 
			model = this.getModel(),
			modelCopy = [];

		if (model.pin.is_on) {
			modelCopy.push(model.pin.current);
			modelCopy.push(model.pin.newPin);
			modelCopy.push(model.pin.newPinReenter);

			return modelCopy.every((item) => {
				return item.length === 5;
			});
		}

		return true;
	}

	_defaultSettings() {
		return {
			"pin": {
				is_on: false,
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
