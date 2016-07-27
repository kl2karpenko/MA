import $ from 'jquery';
import config from 'envConfig';
import messenger from "messenger";
import { hashHistory } from 'react-router';

import 'rest-client';
import Token from "models/Token";

module.exports = (new $.RestClient(config.schema.hostname, {
	stripTrailingSlash: true,
	stringifyData: true,
	autoClearCache: true,

	request: function (resource, options) {
		options.timeout = 10000;

		options.beforeSend = function( xhr ) {
			xhr.setRequestHeader( "Authorization", "Bearer " + Token.token );
		};

		/** add errors handling */
		options.statusCode = {
			401: function() {
				console.error("Unauthorized", "Error");

				Token.refreshToken().then(() => {
					hashHistory.replace('/pin');
				});

			},
			404: function() {
				messenger.error("Page not found", "Error");
				$(document).trigger('system:fail');
			},
			500: function() {
				messenger.error("Server is not available", "Error");
				$(document).trigger('system:fail');
			}
		};

		return $.ajax(options);
	}
}));