import _ from "underscore";

module.exports = {

	getValueByPath(path, model) {
		let
			a = path.split('.');

		for (var i = 0; i < a.length - 1; i++) {
			let n = a[i];

			if (n in model) {
				model = model[n];
			} else {
				model[n] = {};
				model = model[n];
			}
		}

		return model[a[a.length - 1]];
	},

	setValueByPath(path, val, model) {
		let
			fields = path.split('.'),
			result = model;

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

		return model;
	},

	getIndexOfItemByAttr(attr, array, value) {
		return _.indexOf(_.pluck(array, attr), value);
	},
	
	getRandomHash() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 5; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

};