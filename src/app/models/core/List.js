import schema from 'schema';
import messenger from "messenger";

let
	defaultAttribute = '_id';

class List {
	/** ========================   Initialization   ============================== */
	constructor() {
		if (typeof this.beforeInit === "function") {
			this.beforeInit();
		}

		this
			.init();

		this
			.notLoaded()
			._defineModel()
			._setMainResources();

		if (typeof this.afterInit === "function") {
			this.afterInit();
		}
	}

	init() {
		return this;
	}
	/** ========================   Initialization   ============================== */

	/** ========================   Static helpers   ============================== */
	static _getRandomHash() {
		return Math.random().toString(36).substring(7);
	}
	/** ========================   Static helpers   ============================== */

	/** ========================   Change state   ============================== */
	isLoaded() {
		this.loading = true;

		return this;
	}

	notLoaded() {
		this.loading = false;

		return this;
	}
	/** ========================   Change state   ============================== */

	/** ========================   Setters   ============================== */
	_setMainResources() {
		this.schema = schema;
		this.messenger = messenger;
		this.managedResource = this.managedResource || this.constructor.name.toLowerCase();

		return this;
	}

	_defineModel() {
		this[this._getModelName()] = [];

		return this;
	}
	
	setCurrent(current) {
		this.active = current;
		return this;
	}
	/** ========================   Setters   ============================== */

	/** ========================   Getters   ============================== */
	getModel() {
		return this[this._getModelName()];
	}

	_getModelName() {
		return this.managedResource;
	}

	_getRecourseName() {
		return this.schema[this._getModelName()];
	}

	_getDefaultAttributes() {
		let
			defNameCapitalize = this._getModelName().charAt(0).toUpperCase() + this._getModelName().slice(1),
			defaults = this['_default' + defNameCapitalize + 'Item'];

		return defaults && typeof defaults === "function" ? defaults() : $.extend({}, defaults);
	}

	getFirst() {
		return this.getModel()[0];
	}

	getLast() {
		return this.getModel()[this.getModel().length - 1];
	}

	getPrevious() {
		let currentIndex = this.getIndexOf(this.getCurrent()) || 0;

		return this.getModel()[currentIndex - 1];
	}

	getNext() {
		let currentIndex = this.getIndexOf(this.getCurrent()) || 0;

		return this.getModel()[currentIndex + 1];
	}

	getCurrent() {
		return this.active;
	}

	getIndexOf(item) {
		return this.getModel().indexOf(item);
	}

	findByField(fieldName, valueOfField, returnVal) {
		let findValues = this.getModel().filter((item) => {
			return item[fieldName] === valueOfField ? item[returnVal || defaultAttribute] : false;
		});

		if (findValues.length > 1) {

		} else {
			return returnVal ? findValues[0][returnVal] : findValues[0];
		}
	}
	/** ========================   Getters   ============================== */

	/** ========================   Data asigning   ============================== */
	assignAttributes(props) {
		let
			defaultAttributes = this._getDefaultAttributes(),
			defaultModel = this.getModel();

		props.forEach((item, index) => {
			defaultModel[index] = {};

			this.assignAttributesTo(defaultModel[index], $.extend(true, {}, defaultAttributes, item));
		});

		this.isLoaded();
		return this;
	}

	assignAttributesTo(model, attributes) {
		$.extend(true, model, attributes);

		return this;
	}

	updateWithAttributes(attributes) {
		return this.assignAttributesTo(this.getModel(), attributes);
	}

	updateModelWithAttributes(modelIndex, attributes) {
		return this.assignAttributesTo(this.getModel()[modelIndex], attributes);
	}
	/** ========================   Data asigning   ============================== */

	/** ========================   Load resources   ============================== */
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
	/** ========================   Load resources   ============================== */
}

module.exports = List;