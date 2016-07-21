import $ from 'jquery';
import config from 'envConfig';

import 'rest-client';

import Storage from "models/Storage";

module.exports = (new $.RestClient(config.schema.hostname, {
	stripTrailingSlash: true,
	stringifyData: true,
	autoClearCache: true,

	request: function(resource, options) {
		options.timeout = 3000;
		options.headers({
			"Authorization": "Bearer " + Storage.getValue("token")
		});

		return $.ajax(options);
	}
}));