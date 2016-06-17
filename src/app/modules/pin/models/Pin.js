import Model from 'Model';

class Pin extends Model {
	init() {
		this.managedResource = 'pin';

		return Model.prototype.init();
	}

	_defaultPin() {
		return {
			"pin": ""
		};
	}
}

let instance = new Pin();

module.exports = (() => {
	return instance;
})();
