import List from 'List';

class Dialplans extends List {
	constructor(props) {
		super(props);
	}
	
	init() {
		this.managedResource = 'dialplans';
	}

	_defaultDialplansItem() {
		return {
			"_id": "",
			"_rev": "",
			"in_number": "",
			"ex_number": "",
			"type": ""
		};
	}
}

let instance = new Dialplans();

module.exports = (() => {
	return instance;
})();
