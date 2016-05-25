import schema from 'schema';

class Model {
	constructor(props) {
		this.Model = {};
		this.assignAttributes(props);

		this.schema = schema;
		this.managedResource = this.constructor.name.toLowerCase();

		this.init();
	}

	init() {

	}

	assignAttributes(props) {
		let defaultAttributes = this._getDefaultAttributes();

		return this.assignAttributesTo(this.Model, $.extend(true, defaultAttributes, props));
	}

	assignAttributesTo(model, attributes) {
		return $.extend(true, model, attributes);
	}

	_getDefaultAttributes() {
		let defaults = this['_default' + this.constructor.name];

		return defaults && typeof defaults === "function" ? defaults() : $.extend({}, defaults);
	}

	load(options) {
		options = options || {};

		let name = this.managedResource;
		let resource = this.schema[name];
		let readMethod = options.method || 'read';
		let params = [];

		if (options.id) {
			params.push(options.id);
		}

		return resource[readMethod].apply(resource, params).done((items) => {
			return this.assignAttributesTo(this.Model, items[name]);
		});
	}

	loadCollection(name, options) {
		let resource = options.from || this.schema[this.managedResource][name];
		let readMethod = options.method || 'read';
		let params = [];
		let path = options.to;

		if (options.id) {
			params.push(options.id);
		}

		return resource[readMethod].apply(resource, params).done((items) => {
			if (options.to) {
				resource = this.schema[this.managedResource][options.to];
			}

			return this.assignAttributesTo(this.Model[path], items[this.managedResource][path]);
		});
	}
}

module.exports = Model;