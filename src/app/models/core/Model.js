import schema from 'schema';
import messenger from "messenger";

import _ from "underscore";

function ready() {
	return $.Deferred().resolve();
}

function reject() {
	return $.Deferred().reject();
}

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
			._defineModel()
			._setMainResources()
			.assignAttributes(props)
			._setOriginalValues();

		if (typeof this.afterInit === "function") {
			this.afterInit();
		}
	}

	init() {
		this.errorMessage = false;
		
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

	_defineModel() {
		this[this._getModelName()] = {};

		return this;
	}

	_setOriginalValues() {
		this.originalValues = $.extend(true, {}, this.getModel()) || {};

		return this;
	}

	_getOriginalValues() {
		return this.originalValues;
	}

	_isValid() {
		return true;
	}

	getModel() {
		return this[this._getModelName()];
	}

	getRecourse() {
		let resourceName = this._getRecourseName() || this._getModelName();

		return this.schema[resourceName];
	}

	getValueByPath(path) {
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

		return model[a[a.length - 1]];
	}

	setValueByPath(path, val) {
		let
			obj = this.getModel(),
			fields = path.split('.'),
			result = obj;

		for (var i = 0, n = fields.length; i < n && result !== undefined; i++) {
			var field = fields[i];
			if (i === n - 1) {
				result[field] = val;
			} else {
				if (typeof result[field] === 'undefined' || !_.isObject(result[field])) {
					result[field] = {};
				}
				result = result[field];
			}
		}

		return obj;
	}

	_getModelName() {
		return this.managedResource;
	}

	_getRecourseName() {
		return this.managedResource;
	}

	_getDefaultAttributes(path) {
		return Model._getDefaults.bind(this)(path);
	}

	_isDirty() {
		let
			originalValues = $.extend(true, {}, this._getOriginalValues()),
			changedValues = $.extend(true, {}, this.getModel());

		return !_.isEqual(originalValues, changedValues);
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

	resetToDefault() {
		this[this._getModelName()] = this._getDefaultAttributes();
	}

	updateAttributesFor(path, value) {
		let
			model = this.getModel();

		this.setValueByPath(path, value);

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
			resource = this.getRecourse(),
			readMethod = options.method || 'read',
			params = [];

		if (options.id) {
			params.push(options.id);
		}

		if (options.from) {
			resource = resource[options.from];
		}

		return resource[readMethod].apply(resource, params)
			.done((items) => {
				console.groupCollapsed("load " + resource);
				console.info("response", items[name]);
				console.groupEnd("load");
				this.assignAttributes(items[name]);

				return this._setOriginalValues(items[name]);
			})
			.error((response) => {
				// response && response.status && this.messenger.error('Error for ' + resource + ' status of response: ' + (response && response.status));
				console.error('Error for ' + resource + ' status of response: ' + (response && response.status));
				return this;
			});
	}

	loadCollection(options) {
		let
			resource = this.getRecourse(),
			readMethod = options.method || 'read',
			params = [],
			path = options.to;

		if (options.id) {
			params.push(options.id);
		}
		if (options.to) {
			resource = this.schema[this.managedResource][options.to];
		}

		return resource[readMethod].apply(resource, params).done((items) => {
			console.groupCollapsed("loadCollection " + resource);
			console.info("response ", items[this.managedResource][path]);
			console.groupEnd("loadCollection " + resource);

			return this.assignAttributesTo(path, items[this.managedResource][path]);
		}).error((response) => {
			// this.messenger['error']('Error for ' + resource + ' status of response: ' + (response && response.status));
			console.log('Error for ' + resource + ' status of response: ' + (response && response.status));
			return this;
		});
	}

	save(options) {
		options = options || {};
		let isValid = this._isValid();

		if (!isValid) {
			return reject();
		}

		if (!this._isDirty()) {
			return ready();
		}

		let
			name = this._getModelName(),
			resource = this.getRecourse(),
			saveMethod = 'update',
			params = [];

		params.push(this.getValueByPath('_id'));

		if (this.isSingle) {
			params.length = params.length - 1;
		}

		if (options.for) {
			resource = resource[options.for];
		}

		params.push(this.toJSON());

		return resource[saveMethod].apply(resource, params)
			.done((items) => {
				console.groupCollapsed("save " + resource);
				console.info("response", items[name]);
				console.groupEnd("save " + resource);

				options.message && this.messenger.success("Save " + resource);

				this.assignAttributes(items[name]);
				return this._setOriginalValues(items[name]);
			})
			.error((response) => {
				// response && response.status && this.messenger['error']((response.responseJSON && response.responseJSON.message) || 'Error for ' + resource + ' status of response: ' + (response && response.status));
				return response;
			})
	}

	toJSON() {
		let
			model = {};

		model[this._getModelName()] = this.getModel();

		return model;
	}
}