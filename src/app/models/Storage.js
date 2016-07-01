export default class Storage {
	constructor() {
		this.storage = localStorage;
	}

	setValue(name, value) {
		this.storage.setItem(name, value);
	}

	getValue(name) {
		return this.storage.getItem(name);
	}

	deleteValue(name) {
		this.storage.removeItem(name);
	}
}

const storage = new Storage();

module.exports = (() => {
	return storage;
})();