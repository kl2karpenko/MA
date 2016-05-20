import schema from 'schema';

class Model {
	constructor(props) {
		this.assignAttributes(props);
		this.schema = schema;
	}

	assignAttributesTo(model, attributes) {
		Object.keys(attributes).forEach((prop) => {
			model[prop] = attributes[prop];
		});

		return this;
	}

	assignAttributes(props) {
		let defaultAttributes = this._getDefaultAttributes();

		return this.assignAttributesTo(this, $.extend(true, defaultAttributes, props));
	}

	_getDefaultAttributes() {
		let defaults = this['_default' + this.constructor.name];

		return defaults && typeof defaults === "function" ? defaults() : $.extend({}, defaults);
	}

	load() {
		if (this.managedResource) {
			return schema[this.managedResource].read().then((props) => {
				this.assignAttributes(props);
			});
		} else {
			console.log('cannot load, dont have url');
		}
	}

	loadCollection(collection) {
		if (arguments.length !== 1) {
			return;
		}

		let mainResId = this.id;

		if (this.managedResource) {
			if (mainResId) {
				return schema[this.managedResource][collection].read(mainResId).then((props) => {
					this.assignAttributes(props);
				});
			} else {
				console.log('dont have id of resource to get child collection');
			}
		} else {
			console.log('cannot load, dont have url');
		}
	}

	loadSingleResourceFromCollection(resourceId, resourceName, options) {
		if (arguments.length < 2) {
			return;
		}

		let mainResId = this.id;
		
		if (options) {
			mainResId = options.id;
		}

		if (this.managedResource) {
			if (mainResId) {
				return schema[this.managedResource][resourceName].read(this.id, resourceId).then((props) => {
					this.assignAttributes(props);
				});
			} else {
				console.log('dont have id of resource to get single child from collection');
			}
		} else {
			console.log('cannot load, dont have url');
		}
	}
}

module.exports = Model;