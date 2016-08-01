import List from 'List';

/** Import ================================================================== */

class Extensions extends List {
	constructor(props) {
		super(props);
	}

	init() {
		this.managedResource = 'extensions';
	}

	configData(data) {
		return data && data.map((item) => {
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

let instance = new Extensions();

module.exports = (() => {
	return instance;
})();
