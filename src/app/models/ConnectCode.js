import Model from 'Model';

class ConnectCode extends Model {
	init() {
		this.managedResource = 'connectCode';
		this.isSingle = true;

		return Model.prototype.init();
	}

	_defaultConnectCode() {
		return {
			"value": ""
		};
	}
}

let instance = new ConnectCode();

module.exports = (() => {
	return instance;
})();
