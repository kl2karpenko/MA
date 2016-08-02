import List           from 'List';

import Contacts       from "models/Contacts";
import Extensions     from "./Extensions";

/** Import ================================================================== */

class AllContacts extends List {
	constructor(props) {
		super(props);
	}

	init() {
		this.managedResource = 'allContacts';
	}

	load() {
		return (new Promise((res) => {
			let mobileContactsArray = Contacts.configData(Contacts.getModel());
			let extensionsArray = Extensions.configData(Extensions.getModel());
			let allContactsArray = mobileContactsArray.concat(extensionsArray);

			if (!extensionsArray.length) {
				Extensions
					.load()
					.then((data) => {
						allContactsArray = mobileContactsArray.concat(Extensions.configData(data[Extensions._getModelName()]));
						this.assignAttributes(allContactsArray);

						res({
							"allContacts": allContactsArray
						});
					});
			} else {
				this.assignAttributes(allContactsArray);
				res({
					"allContacts": allContactsArray
				});
			}
		}));
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
