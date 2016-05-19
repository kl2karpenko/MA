class Model {
	constructor(props) {
		this._assignProps(props);
	}

	_assignProps(props) {
		props = props || {};
		let methodForDefaultProps = this['_default' + this.constructor.name];

		if (methodForDefaultProps && typeof methodForDefaultProps === "function") {
			let defaultProps = methodForDefaultProps();

			Object.keys(defaultProps).forEach(function(prop) {
				// this[prop] = $.extend(defaultProps[prop], props[prop]);
			});

			console.log(this);
		}

		return this;
	}
}

module.exports = Model;