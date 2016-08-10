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
			xhr.setRequestHeader("Authorization", "Bearer " + Token._getActiveValue());
		};

		/** add errors handling */
		options.statusCode = {
			400: function() {
				messenger.error("Bad request", "Error");
			},
			401: function() {
				Token
					.refreshToken()
					.then(() => {
						// TODO: refactor logic of going to pin page
						hashHistory.replace('/pin');
					});
			},
			404: function() {
				// messenger.error("Page not found", "Error");
			},
			500: function() {
				messenger.error("Server is not available", "Error");
				$(document).trigger('system:fail');
			}
		};

		return $.ajax(options);
	}
}));