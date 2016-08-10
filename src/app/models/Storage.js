export default class Storage {
	constructor() {
		this.storage = localStorage;

		this.storageValue = ["lockCode", "phone", "token", "tokenData", "disconnect"];
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
		this.storageValue.forEach((itemName) => {
			this.deleteValue(itemName);
		});
	}
}

const storage = new Storage();

module.exports = (() => {
	return storage;
})();