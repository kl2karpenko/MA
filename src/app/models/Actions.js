import List from 'List';

class Actions extends List {
	_defaultActionsItem() {
		return {
			_id: "",
			action: "",
			alias: "",
			color: "",
			cs: "",
			image: "",
			name: "",
			order: 0
		};
	}
}

let instance = new Actions();

module.exports = (() => {
	return instance;
})();
