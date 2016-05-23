import schema from 'schema';

class Model {
	initialize() {
		modelInstance = new this.constructor.name();
		return modelInstance;
	}

	constructor(props) {
		this.assignAttributes(props);

		this.schema = schema;
		this.managedResource = this.constructor.name.toLowerCase();
	}

	assignAttributesTo(model, attributes) {
		return $.extend(true, model, attributes);
	}

	assignAttributes(props) {
		let defaultAttributes = this._getDefaultAttributes();
		let resName = this.constructor.name.toLowerCase();
		this[resName] = {};

		return this.assignAttributesTo(this[resName], $.extend(true, defaultAttributes, props));
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
			this.assignAttributesTo(this[name], items[name]);
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
			this.assignAttributesTo(this[this.managedResource][path], items[this.managedResource][path]);
		});
	}

	loadSingleResourceFromCollection(resourceId, resourceName, options) {
		if (arguments.length < 2) {
			return;
		}

		let mainResId = this.id;
		let name = this.managedResource;
		
		if (options) {
			mainResId = options.id;
		}

		if (name) {
			if (mainResId) {
				return schema[name][resourceName].read(this.id, resourceId).then((props) => {
					this.assignAttributes(props[name][resourceName]);
				});
			} else {
				console.log('dont have id of resource to get single child from collection');
			}
		} else {
			console.log('cannot load, dont have url');
		}
	}
}

let modelInstance;

module.exports = Model;