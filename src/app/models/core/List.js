import schema from 'schema';

class List {
	constructor() {
		this.Model = [];
		this.schema = schema;
		this.managedResource = this.constructor.name.toLowerCase();

		this.isLoaded = false;

		this.init();
	}

	init() {

	}

	static _getRandomHash() {
		return Math.random().toString(36).substring(7);
	}

	assignAttributes(props) {
		let defaultAttributes = this._getDefaultAttributes();

		props.forEach((item, index) => {
			this.Model[index] = {};

			this.assignAttributesTo(this.Model[index], $.extend(true, {}, defaultAttributes, item));
		});

		this.isLoaded = true;

		return this;
	}

	assignAttributesTo(model, attributes) {
		return $.extend(true, model, attributes);
	}

	updateWithAttributes(attributes) {
		return this.assignAttributesTo(this.Model, attributes);
	}

	updateModelWithAttributes(modelIndex, attributes) {
		return this.assignAttributesTo(this.Model[modelIndex], attributes);
	}

	_getDefaultAttributes() {
		let defaults = this['_default' + this.constructor.name + 'Item'];

		return defaults && typeof defaults === "function" ? defaults() : $.extend({}, defaults);
	}

	update(options) {
		return this.load(options);
	}

	load(options) {
		options = options || {};

		let name = this.managedResource;
		let resource = this.schema[name];
		let readMethod = options.method || 'read';
		let params = [];

		params.push({ _: List._getRandomHash() });

		return resource[readMethod].apply(resource, params).done((items) => {
			console.info('loadCollection =============== ' + resource + ' =================== data');

			return this.assignAttributes(items[name]);
		}).error((response) => {
			this.messenger['error']('Error for ' + resource + ' status of response: ' + (response && response.status));
			console.error('Error for ' + resource + ' status of response: ' + (response && response.status));
			return this;
		});
	}

	findByField(fieldName, valueOfField, returnVal) {		
		let findValues = this.Model.filter((item) => {
			return item[fieldName] === valueOfField ? item[returnVal || "_id"] : false;
		});

		if (findValues.length > 1) {

		} else {
			return returnVal ? findValues[0][returnVal] : findValues[0];
		}
	}

	getFirst() {
		return this.Model[0];
	}

	getLast() {
		return this.Model[this.Model.length - 1];
	}

	getPrevious() {
		let currentIndex = this.getIndexOf(this.getCurrent()) || 0;

		return this.Model[currentIndex - 1];
	}

	getNext() {
		let currentIndex = this.getIndexOf(this.getCurrent()) || 0;

		return this.Model[currentIndex + 1];
	}

	getCurrent() {
		return this.active;
	}

	setCurrent(current) {
		this.active = current;
		return this;
	}

	getIndexOf(item) {
		return this.Model.indexOf(item);
	}
}

module.exports = List;