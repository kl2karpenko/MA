import Model from 'Model';

class Pin extends Model {
	init() {
		this.managedResource = 'connect';

		return Model.prototype.init();
	}

	_getModelName() {
		return "connect";
	}

	_getRecourseName(name) {
		return !name ? this.schema[this.managedResource] : this.schema[this.managedResource][name];
	}

	_defaultConnect() {
		return {
			"pin": ""
		};
	}
}

let instance = new Pin();

module.exports = (() => {
	return instance;
})();
