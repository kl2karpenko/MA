import schema                 from 'schema';
import messenger              from "messenger";
import { logError, logInfo,
	logInfoGroup }              from "lib/logger";

import _                      from "underscore";
import helpers                from "lib/helpers";

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
		this.listResource = this.listResource || null;
		this.listModel = this.listModel || null;

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

	getListRecourse() {
		return this.listResource ? this.schema[this.listResource] : null;
	}

	getValueByPath(path) {
		let model = this.getModel();

		return helpers.getValueByPath(path, model);
	}

	setValueByPath(path, val) {
		let model = this.getModel();

		return helpers.setValueByPath(path, val, model);
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

	updateCollectionAndEntity() {
		// TODO: define where to go
		let listResource = this.getListRecourse();

		// if item didn't found load all list model again
		if (listResource) {
			let currentIndexOfActiveDialplan = this.listModel.getIndexOfItemById( this.getValueByPath("_id") );

			if (this.listModel) {
				this.listModel.update({
					// set active page that was active
					activePage: currentIndexOfActiveDialplan
				}).then(() => {
					// trigger change in UI view after load new list and entity
					$(document).trigger(this.listResource + ':updateState');
				});
			} else {
				logError("Please specify model for list update for: " + this._getModelName());
			}
		}
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
				logInfoGroup("load", resource, items[name]);
				this.assignAttributes(items[name]);
				return this._setOriginalValues(items[name]);
			})
			.error((response) => {
				logError(resource, response);
				
				if (response.status === 404) {
					this.updateCollectionAndEntity();
				}
				
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
			logInfoGroup("loadCollection", resource, items[name]);

			return this.assignAttributesTo(path, items[this.managedResource][path]);
		}).error((response) => {
			logError(resource, response);
			return this;
		});
	}

	save(options) {
		let isValid = this._isValid();
		$(document).trigger('system:loading');

		options = options || {};

		if (!isValid) {
			return (new Promise((res, rej) => {
				rej(false);
				$(document).trigger('system:loaded');
			}));
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

		params.push((options && options.data) || this.toJSON());

		return resource[saveMethod].apply(resource, params)
			.done((items) => {
				logInfoGroup("Save", resource, items[name]);

				this._setOriginalValues(this.getModel());
				$(document).trigger('system:loaded');
				options.message && this.messenger.success("Save " + resource);
			})
			.error((response) => {
				$(document).trigger('system:loaded');
				logError(resource, response);
				return response;
			});
	}

	toJSON() {
		let
			model = {};

		model[this._getModelName()] = this.getModel();

		return model;
	}
}