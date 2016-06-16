import schema from 'schema';
import messenger from "messenger";

let
	defaultAttribute = '_id';

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

	_getRecourseName() {
		return this.schema[this._getModelName()];
	}

	_getRecourseByName(name) {
		return this.schema[this._getModelName()][name];
	}

	_getDefaultAttributes() {
		return Model._getDefaults.bind(this)();
	}

	_getDefaultAttributesByPath(path) {
		return Model._getDefaults.bind(this)(path);
	}

	assignAttributes(props) {
		let
			defaultAttributes = this._getDefaultAttributes(),
			defaultModel = this.getModel();

		Object.keys(defaultModel).forEach((name)=> {
			defaultModel[name] = defaultAttributes[name];
		});

		$.extend(true, defaultModel, props);

		this.isLoaded();

		return this;
	}

	assignAttributesTo(path, attributes) {
		let
			defaultModel = this.getModel();

		$.extend(true, defaultModel[path], this._getDefaultAttributesByPath(path), attributes);

		return this.isLoaded();
	}

	update(options) {
		return this.load(options);
	}

	load(options) {
		options = options || {};

		let
			name = this._getModelName(),
			resource = this._getRecourseName(),
			readMethod = options.method || 'read',
			params = [];

		if (options.id) {
			params.push(options.id);
		}

		params.push({ _: Model._getRandomHash() });

		return resource[readMethod].apply(resource, params).done((items) => {
			console.warn('load =============== ' + resource);
			return this.assignAttributes(items[name]);
		}).error((response) => {
			this.messenger['error']('Error for ' + resource + ' status of response: ' + (response && response.status));
			console.error('Error for ' + resource + ' status of response: ' + (response && response.status));
			return this;
		});
	}

	loadCollection(options) {
		let
			resource = options.from || this._getRecourseByName(),
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
			console.warn('load ' + resource);

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
			resource = this._getRecourseName(),
			saveMethod = 'create',
			params = {};

		params[resource] = this.toJSON();

		console.log(resource, name, params);

		return resource[saveMethod].call(resource, params).done((items) => {
			console.warn('load =============== ' + resource);
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