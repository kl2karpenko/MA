import $ from 'jquery';
import config from 'envConfig';

import 'rest-client';

import Token from "models/Token";
import Storage from "models/Storage";

module.exports = (new $.RestClient(config.schema.hostname, {
	stripTrailingSlash: true,
	stringifyData: true,
	autoClearCache: true,

	request: function(resource, options) {
		options.timeout = 3000;
		options.headers = {
			"Authorization": "Bearer " + Storage.getValue("token")
		};

		return $.ajax(options).fail((y) => {
			console.log(y);

			Token.refreshToken().then(
				$.ajax(options)
			);
		});
	}
}));