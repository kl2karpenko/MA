import List from 'List';

import MobileContacts from "./MobileContacts";
import Extensions from "./Extensions";

class AllContacts extends List {
	constructor(props) {
		super(props);
	}

	init() {
		this.managedResource = 'allContacts';
	}

	_getModelName() {
		return "allContacts";
	}

	load() {
		return MobileContacts
			.load()
			.then((mobileContactsArray) => {
				return MobileContacts.configData(mobileContactsArray[MobileContacts._getModelName()]);
			})
			.then((mobileContactsConfigArray) => {
				Extensions
					.load()
					.then((extensionsArray) => {
						return Extensions.configData(extensionsArray[Extensions._getModelName()]);
					})
					.then((extensionsConfigArray) => {
						let allContactsConfigArray = mobileContactsConfigArray.concat(extensionsConfigArray);

						this.assignAttributes(allContactsConfigArray);
						return allContactsConfigArray;
					});
			});
	}

	_defaultAllContactsItem() {
		return {

		};
	}
}

let instance = new AllContacts();

module.exports = (() => {
	return instance;
})();
