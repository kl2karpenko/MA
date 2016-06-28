import Model from 'Model';

class Extension extends Model {
	init() {
		this.managedResource = 'extension';
	}

	_getRecourseName() {
		return 'mailboxes';
	}
	
	_defaultExtension() {
		return {
			"_id": "",
			"name": "",
			"color": "",
			"number": "",
			"type": ""
		};
	}
}

let instance = new Extension();

module.exports = (() => {
	return instance;
})();
