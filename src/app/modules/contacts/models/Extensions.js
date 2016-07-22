import List from 'List';

class MobileContacts extends List {
	constructor(props) {
		super(props);
	}

	init() {
		this.managedResource = 'extensions';
	}

	configData(data) {
		return data.map((item) => {
			var obj = {};

			obj._id = item._id;
			obj.number = item.in_number;
			obj.image = true;
			obj.name = item.name;
			obj.type = "extension";

			return obj;
		});
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
