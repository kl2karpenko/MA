import schema                 from 'schema';
import messenger              from "messenger";
import _                      from "underscore";
import helpers                from "lib/helpers";
import { logError, logInfo,
	logInfoGroup }              from "lib/logger";

let
	defaultAttribute = '_id';

class List {
	/** ========================   Initialization   ============================== */
	constructor(props) {
		props = props || {};

		if (typeof this.beforeInit === "function") {
			this.beforeInit();
		}

		this
			.init(props);

		this
			.notLoaded()
			._defineModel()
			._setMainResources();

		this.defaultAttribute = defaultAttribute;
		this.state = new State(props.state);

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
		this[this._getModelName()] = [];

		return this;
	}
	
	getModel() {
		return this[this._getModelName()];
	}

	getRecourse() {
		return this.schema[this._getModelName()];
	}

	_getModelName() {
		return this.managedResource;
	}

	_getRecourseName() {
		return this.managedResource;
	}

	_getDefaultAttributes() {
		let
			defNameCapitalize = this._getModelName().charAt(0).toUpperCase() + this._getModelName().slice(1),
			defaults = this['_default' + defNameCapitalize + 'Item'];

		return defaults && typeof defaults === "function" ? defaults() : $.extend({}, defaults);
	}

	getIndexOf(item) {
		return this.getModel().indexOf(item);
	}

	getByIndex(index) {
		return this.getModel()[index];
	}

	getValueOfDefAttrByIndex(index) {
		return this.getByIndex(index)[this.defaultAttribute];
	}

	getUrl() {
		let activeItem = this.getModel()[this.getActivePage() - 1];
		return '/' + this._getModelName() + '/' + (activeItem ? activeItem[this.defaultAttribute] : "");
	}

	activatePage(page){
		this.updateState({
			activePage: page
		});
	}

	setStateBy(name, value) {
		this.state[name] = value;
	}

	getStateBy(name) {
		return this.state[name];
	}

	getState() {
		return this.state;
	}

	getActivePage() {
		return this.state.activePage;
	}

	getPreviousPage() {
		return this.state.previousPage;
	}

	previous() {
		this.state._update({
			activePage: this.getPreviousPage()
		});
	}

	getNextPage() {
		return this.state.nextPage;
	}

	next() {
		this.state._update({
			activePage: this.getNextPage()
		});
	}

	updateState(props) {
		this.state._update(props);
	}

	getSearchQuery() {
		this.getStateBy('searchQuery');
	}

	setSearchQuery(value) {
		this.setStateBy('searchQuery', value);
	}

	search(term, options) {
		options = options || {};
		term = term || this.getSearchQuery();

		let array = this.getModel();
		let searcher = createTextSearcher();

		if (options.by && _.isObject(array[0])) {
			_.each(array, function (item) {
				_.some(options.by, function (fieldName) {
					return searcher.match(term, item[fieldName], item);
				});
			});
		} else {
			_.each(array, function (text) {
				searcher.match(term, text);
			});
		}

		let items = _.pluck(searcher.results, 'original');

		searcher.results.length = 0;

		return items;
	}

	findByField(fieldName, valueOfField, returnVal) {
		let findValues = this.getModel().filter((item) => {
			return item[fieldName] === valueOfField ? item[returnVal || this.defaultAttribute] : false;
		});

		if (findValues.length === 1) {
			return returnVal ? findValues[0][returnVal] : findValues[0];
		}
	}

	getIndexOfItemById(valueOfAttr) {
		return helpers.getIndexOfItemByAttr(this.defaultAttribute, this.getModel(), valueOfAttr);
	}
	
	assignAttributes(props) {
		let
			defaultAttributes = this._getDefaultAttributes(),
			defaultModel = this.getModel();

		if (props) {
			props.forEach((item, index) => {
				defaultModel[index] = {};
				
				this.assignAttributesTo(defaultModel[index], $.extend(true, {}, defaultAttributes, item));
			});
			this.isLoaded();
		}

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
	
	update(options) {
		return this.load(options);
	}

	load(options) {
		$(document).trigger('system:loading');
		options = options || {};

		let
			name = this.managedResource,
			resource = this.getRecourse(),
			readMethod = options.method || 'read',
			params = [];

		params.push({ _: List._getRandomHash() });

		return resource[readMethod].apply(resource, params).done((items) => {
			this.updateState({
				pagesCount: items[name].length,
				activePage: 1
			});

			logInfoGroup("load", this._getModelName(), items[name]);

			$(document).trigger('system:loaded');
			return this.assignAttributes(items[name]);
		}).error((response) => {
			logError(this._getModelName(), response);
			$(document).trigger('system:loaded');
			return this;
		});
	}
	
}

class State {
	constructor(props) {
		props = props || {};

		this.active = props.active || false;
		this.searchQuery = props.searchQuery || '';

		this.pagesCount = props.pagesCount || 0;
		this._setUpPages(props);
	}

	_update(props) {
		this.pagesCount = this.pagesCount || props.pagesCount || 0;
		this._setUpPages(props);
	}

	_setUpPages(props) {
		this.activePage = props.activePage || 1;
		this.previousPage = this.setPreviousPage(props.activePage || 1);
		this.nextPage = this.setNextPage(props.activePage || 1);
	}

	setNextPage(active) {
		let
			nextPage = active + 1;

		return nextPage > this.pagesCount ? false : nextPage;
	}

	setPreviousPage(active) {
		let
			previousPage = active - 1;

		return previousPage <= 0 ? false : previousPage;
	}
}

function createTextSearcher() {
	return {
		results: [],

		match: function (term, text, item) {
			term = term && term.toLowerCase().trim();
			text = String(text || '').toLowerCase();
			var position = text.indexOf(term);

			if (position !== -1) {
				this.results.push({
					original: item || text,
					text: text,
					position: position
				});
			}

			return position !== -1;
		}
	};
}

module.exports = List;