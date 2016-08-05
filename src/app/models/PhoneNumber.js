import Model                    from 'Model';
import Storage                  from 'models/Storage';

import { dialogs }              from "appConfig";

import { $t }                   from 'lib/locale';
import { logError, logInfo }    from "lib/logger";


class PhoneNumber extends Model {
	init() {
		this.managedResource = 'phoneNumber';
		this.isSingle = true;

		return Model.prototype.init();
	}

	_isValid(number) {
		return number.match(/^\+?[\d]+$/);
	}

	_getUserNumber() {
		let phoneValue = this.getValueByPath('value');

		return new Promise((resolve) => {
			if (!phoneValue) {
				dialogs.prompt($t("phone.number_enter"), (obj) => {
					phoneValue = obj.input1;

					console.log(phoneValue, 'phoneValue');

					if (!!(phoneValue && this._isValid(phoneValue))) {
						this.updateAttributesFor('value', phoneValue);
						this.save().then(() => {
							resolve(phoneValue);
						})
					} else if (phoneValue !== "") {
						this.messenger.error($t("phone.not_valid"), "Warning");
					}
				}, $t("phone.title"));
			} else {
				resolve(phoneValue);
			}
		});
	}

	save() {
		let
			value = this.getValueByPath('value');

		return (new Promise((resolve) => {
					resolve({
						phoneNumber: value
					});
				}))
				.then(() => {
					if (value) {
						Storage.setValue('phone', value);
					} else {
						Storage.deleteValue('phone');
					}

					this._setOriginalValues({ value: value });
				});
	}

	load() {
		return (new Promise()).then(() => {
			let newPhoneNumber = {
				value: Storage.getValue('phone')
			};

			this._setOriginalValues(newPhoneNumber);
			this.assignAttributes(newPhoneNumber);
		});
	}

	_defaultPhoneNumber() {
		return {
			"value": Storage.getValue('phone')
		};
	}
}

let instance = new PhoneNumber();

module.exports = (() => {
	return instance;
})();
