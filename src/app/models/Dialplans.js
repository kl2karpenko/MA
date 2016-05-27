import List from 'List';

class Dialplans extends List {
	_defaultDialplansItem() {
		return {
			"_id": "",
			"_rev": "",
			"settings": {
				"call_timeout": 15,
				"continue_on_fail": true,
				"hangup_after_bridge": true,
				"sleep": 500
			},
			"ext_id": "",
			"actions": [],
			"modified": {},
			"created": {},
			"personal": false,
			"type": "",
			"in_number": "",
			"com_id": ""
		};
	}

	getCurrentUrl() {
		return '/' + this.managedResource + '/' + this.getCurrent()._id;
	}

	getUrl(item) {
		return '/' + this.managedResource + '/' + item._id;
	}

	getPreviousUrl() {
		let previousDialplan = this.getPrevious();

		return previousDialplan ? this.getUrl(this.getPrevious()) : false;
	}

	getNextUrl() {
		let nextDialplan = this.getNext();

		return nextDialplan ? this.getUrl(this.getNext()) : false;
	}
}

let instance = new Dialplans();

module.exports = (() => {
	return instance;
})();
