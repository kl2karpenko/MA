import $ from 'jquery';
import config from 'envConfig';
import messenger from "messenger";

import 'rest-client';
import Token from "models/Token";

module.exports = (new $.RestClient(config.schema.hostname, {
	stripTrailingSlash: true,
	stringifyData: true,
	autoClearCache: true,

	request: function (resource, options) {
		options.timeout = 3000;
		options.beforeSend = function( xhr ) {
			xhr.setRequestHeader( "Authorization", "Bearer " + Token.token );
		};
		options.error = function() {
			messenger.error("Bad request", "Error");
		};

		return $.ajax(options);
	}
}));