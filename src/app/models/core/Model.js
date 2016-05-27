import schema from 'schema';

export default class Model {
	constructor(props) {
		this.Model = {};
		this.assignAttributes(props);

		this.schema = schema;
		this.managedResource = this.constructor.name.toLowerCase();

		this.init();
	}

	init() {

	}

	_getRandomHash() {
		return Math.random().toString(36).substring(7);
	}

	assignAttributes(props) {
		let defaultAttributes = this._getDefaultAttributes();

		this.Model = defaultAttributes;
		$.extend(true, this.Model, defaultAttributes, props);

		return this;
	}

	assignAttributesTo(path, attributes) {
		this.Model[path] = this._getDefaultAttributesByPath(path);
		return $.extend(true, this.Model[path], attributes);
	}

	_getDefaultAttributes() {
		let defaults = this['_default' + this.constructor.name];

		return defaults && typeof defaults === "function" ? defaults.bind(this)() : $.extend({}, defaults);
	}

	_getDefaultAttributesByPath(path) {
		let defaults = this['_default' + path];

		return defaults && typeof defaults === "function" ? defaults.bind(this)() : $.extend({}, defaults);
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

		if (options.id) {
			params.push(options.id);
		}

		params.push({ _: this._getRandomHash() });

		return resource[readMethod].apply(resource, params).done((items) => {
			return this.assignAttributes(items[name]);
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

			return this.assignAttributesTo(path, items[this.managedResource][path]);
		});
	}
}