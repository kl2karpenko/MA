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
			modelCopy.push(model.pin.active);
			modelCopy.push(model.pin.created);
			modelCopy.push(model.pin.created_copy);

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
				active: null,
				created: null,
				created_copy: null
			}
		};
	}
}

let instance = new PinSettings();

module.exports = (() => {
	return instance;
})();
