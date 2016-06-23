import Model from 'Model';

class Pin extends Model {
	init() {
		this.managedResource = 'connects';
		this.isSingle = true;

		return Model.prototype.init();
	}

	_getModelName() {
		return "connects";
	}

	_defaultConnects() {
		return {
			"pin": {
				"value": ""
			}
		};
	}
}

let instance = new Pin();

module.exports = (() => {
	return instance;
})();
