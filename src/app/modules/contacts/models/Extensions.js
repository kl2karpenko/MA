import List from 'List';

class MobileContacts extends List {
	constructor(props) {
		super(props);
	}

	init() {
		this.managedResource = 'extensions';
	}

	_defaultExtensionsItem() {
		return {

		};
	}
}

let instance = new MobileContacts();

module.exports = (() => {
	return instance;
})();
