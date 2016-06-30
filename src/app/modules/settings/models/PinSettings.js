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
			allIsValid = this._checkIsValid();

		if (!allIsValid) {
			this.messenger.error('Please enter valid Pin value');
		} else {
			if (!allIsValid && model.pin.created !== model.pin.created_copy) {
				this.messenger.error('Please enter Pin that match');
				return false;
			}
		}

		return true;
	}

	_checkIsValid() {
		let
			model = this.getModel(),
			modelCopy = [];

		if (model.pin.is_on) {
			if (model.pin.created === model.pin.created_copy) {
				modelCopy.push(model.pin.active);
				modelCopy.push(model.pin.created);
				modelCopy.push(model.pin.created_copy);

				return modelCopy.every((item) => {
					return item.length === 5;
				});
			}
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
