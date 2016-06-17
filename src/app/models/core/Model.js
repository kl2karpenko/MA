import schema from 'schema';
import messenger from "messenger";

import _ from "underscore";

export default class Model {
	/** ========================   Initialization   ============================== */
	constructor(props) {
		if (typeof this.beforeInit === "function") {
			this.beforeInit();
		}

		this
			.init();

		this
			.notLoaded()
			._defineModelName()
			._setMainResources()
			.assignAttributes(props);

		if (typeof this.afterInit === "function") {
			this.afterInit();
		}
	}

	init() {
		return this;
	}

	static _getRandomHash() {
		return Math.random().toString(36).substring(7);
	}

	static _getDefaults(pathName) {
		let
			defName = (pathName ? pathName : this._getModelName()),
			defNameCapitalize = defName.charAt(0).toUpperCase() + defName.slice(1),
			defaults = this['_default' + defNameCapitalize];

		return defaults && typeof defaults === "function" ? defaults.bind(this)() : $.extend({}, defaults);
	}

	isLoaded() {
		this.loading = true;

		return this;
	}

	notLoaded() {
		this.loading = false;

		return this;
	}

	_setMainResources() {
		this.schema = schema;
		this.messenger = messenger;
		this.managedResource = this.managedResource || this.constructor.name.toLowerCase();

		return this;
	}

	_defineModelName() {
		this[this._getModelName()] = {};

		return this;
	}

	getModel() {
		return this[this._getModelName()];
	}

	_getModelName() {
		return this.managedResource;
	}

	_getRecourseName(path) {
		return !path ? this.schema[this._getModelName()] : this.schema[this._getModelName()][path];
	}

	_getDefaultAttributes(path) {
		return Model._getDefaults.bind(this)(path);
	}

	assignAttributes(props) {
		let
			defaultAttributes = this._getDefaultAttributes(),
			defaultModel = this.getModel(),
			newModel = {};

		$.extend(true, newModel, defaultAttributes, props);

		Object.keys(newModel).forEach((name)=> {
			defaultModel[name] = newModel[name];
		});

		this.isLoaded();

		return this;
	}

	updateAttributesFor(path, value) {
		let
			model = this.getModel(),
			a = path.split('.');

		for (var i = 0; i < a.length - 1; i++) {
			var n = a[i];
			if (n in model) {
				model = model[n];
			} else {
				model[n] = {};
				model = model[n];
			}
		}
		model[a[a.length - 1]] = value;

		return model;
	}

	assignAttributesTo(path, attributes) {
		let
			defaultModel = this.getModel();

		$.extend(true, defaultModel[path], this._getDefaultAttributes(path), attributes);

		return this.isLoaded();
	}

	update(options) {
		return this.load(options);
	}

	load(options) {
		options = options || {};

		let
			name = this._getModelName(),
			resource = this._getRecourseName(options.from),
			readMethod = options.method || 'read',
			params = [];

		if (options.id) {
			params.push(options.id);
		}

		params.push({ _: Model._getRandomHash() });

		return resource[readMethod].apply(resource, params).done((items) => {
			console.groupCollapsed("load " + resource);
			console.info("response", items[name]);
			console.groupEnd("load");
			return this.assignAttributes(items[name]);
		}).error((response) => {
			this.messenger['error']('Error for ' + resource + ' status of response: ' + (response && response.status));
			console.error('Error for ' + resource + ' status of response: ' + (response && response.status));
			return this;
		});
	}

	loadCollection(options) {
		let
			resource = this._getRecourseName(options.from),
			readMethod = options.method || 'read',
			params = [],
			path = options.to;

		if (options.id) {
			params.push(options.id);
		}

		return resource[readMethod].apply(resource, params).done((items) => {
			if (options.to) {
				resource = this.schema[this.managedResource][options.to];
			}
			console.groupCollapsed("loadCollection " + resource);
			console.info("response ", items[this.managedResource][path]);
			console.groupEnd("loadCollection " + resource);

			return this.assignAttributesTo(path, items[this.managedResource][path]);
		}).error((response) => {
			this.messenger['error']('Error for ' + resource + ' status of response: ' + (response && response.status));
			console.log('Error for ' + resource + ' status of response: ' + (response && response.status));
			return this;
		});
	}

	save(options) {
		options = options || {};

		let
			name = this._getModelName(),
			resource = this._getRecourseName(options.for),
			saveMethod = 'create',
			params = {};

		params[resource] = this.toJSON();

		return resource[saveMethod].call(resource, params).done((items) => {
			console.groupCollapsed("save " + resource);
			console.info("response", items[name]);
			console.groupEnd("save " + resource);
			return items[name];
		}).error((response) => {
			this.messenger['error']('Error for ' + resource + ' status of response: ' + (response && response.status));
			return response;
		});
	}

	toJSON() {
		return this.getModel();
	}
}