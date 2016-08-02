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

	existValue(name) {
		return this.storage.getItem(name) !== null;
	}

	deleteValue(name) {
		this.storage.removeItem(name);
	}

	clear() {
		this.deleteValue("lockCode");
		this.deleteValue("phone");
		this.deleteValue("token");
		this.deleteValue("unlock");
	}
}

const storage = new Storage();

module.exports = (() => {
	return storage;
})();