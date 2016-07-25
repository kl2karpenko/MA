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
		
		options.crossDomain = true;

		options.beforeSend = function( xhr ) {
			xhr.setRequestHeader( "Authorization", "Bearer " + Token.token );
		};

		options.error = function() {
			messenger.error("Bad request", "Error");
		};

		/** add errors handling */
		options.statusCode = {
			401: function() {
				messenger.error("Unauthorized", "Error");
			},
			404: function() {
				messenger.error("Page not found", "Error");
			},
			500: function() {
				messenger.error("Server is not available", "Error");
			}
		};

		return $.ajax(options);
	}
}));