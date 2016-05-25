import schema from 'schema';
import { hashHistory } from 'react-router';

class List {
	constructor() {
		this.Model = [];
		this.schema = schema;
		this.managedResource = this.constructor.name.toLowerCase();

		this.init();
	}

	init() {

	}

	assignAttributes(props) {
		let defaultAttributes = this._getDefaultAttributes();

		props.forEach((item, index) => {
			this.Model[index] = {};

			this.assignAttributesTo(this.Model[index], $.extend(true, defaultAttributes, item));
		});

		return this;
	}

	assignAttributesTo(model, attributes) {
		console.log('assignAttributesTo ', attributes)
		return $.extend(true, model, attributes);
	}

	updateWithAttributes(attributes) {
		console.log('updateWithAttributes ', attributes)
		return this.assignAttributesTo(this.Model, attributes);
	}

	_getDefaultAttributes() {
		let defaults = this['_default' + this.constructor.name + 'Item'];

		return defaults && typeof defaults === "function" ? defaults() : $.extend({}, defaults);
	}

	load(options) {
		options = options || {};

		let name = this.managedResource;
		let resource = this.schema[name];
		let readMethod = options.method || 'read';
		let params = [];

		return resource[readMethod].apply(resource, params).done((items) => {
			return this.assignAttributes(items[name]);
		});
	}

	getFirst() {
		return this.Model[0];
	}

	getLast() {
		return this.Model[this.Model.length - 1];
	}

	getPrevious() {
		console.log(this.getIndexOf(this.getCurrent()))
		let currentIndex = this.getIndexOf(this.getCurrent()) || 0;

		console.log('currentIndex ', currentIndex, this.getCurrent(), this.Model);

		return this.Model[currentIndex - 1];
	}

	getNext() {
		let currentIndex = this.getIndexOf(this.getCurrent()) || 0;

		console.log(currentIndex)

		return this.Model[currentIndex + 1];
	}

	getCurrent() {
		return this.active;
	}

	setCurrent(current) {
		this.active = current;
	}

	getIndexOf(item) {
		return this.Model.indexOf(item);
	}
}

module.exports = List;