import Model from 'Model';
import Storage from "models/Storage";

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
			
			if (model.pin.created !== model.pin.created_copy) {
				this.messenger.error('Please enter Pin that match');
				return false;
			}
		}

		return allIsValid;
	}

	_checkIsValid() {
		let
			model = this.getModel(),
			modelCopy = [];

		if (model.pin.is_on) {
			let hadPrevValue = Storage.existValue('pin');

			console.log(hadPrevValue);

			if (model.pin.created === model.pin.created_copy) {
				hadPrevValue && modelCopy.push(model.pin.active);
				modelCopy.push(model.pin.created);
				modelCopy.push(model.pin.created_copy);

				return modelCopy.every((item) => {
					return item && item.length === 5;
				});
			} else {
				return false;
			}
		}

		return true;
	}


	_defaultSettings() {
		return {
			"pin": {
				is_on: Storage.existValue('pin'),
				active: "",
				created: "",
				created_copy: ""
			}
		};
	}
}

let instance = new PinSettings();

module.exports = (() => {
	return instance;
})();
