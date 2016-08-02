import $ from 'jquery';
import config from 'envConfig';
import messenger from "messenger";
import { hashHistory } from 'react-router';

import 'rest-client';
import Token from "models/Token";
import xhrPool from "./abort";

console.log(xhrPool);

module.exports = (new $.RestClient(config.schema.hostname, {
	stripTrailingSlash: true,
	stringifyData: true,
	autoClearCache: true,

	request: function (resource, options) {
		options.timeout = 10000;

		options.beforeSend = function( xhr ) {
			xhr.setRequestHeader("Authorization", "Bearer " + Token.token);

			xhrPool.requests.push(xhr);
		};

		options.complete = function( xhr ) {
			var index = xhrPool.requests.indexOf(xhr);

			if (index > -1) {
				xhrPool.requests.splice(index, 1);
			}
		};

		/** add errors handling */
		options.statusCode = {
			400: function() {
				console.log('400');
				setTimeout(() => {
					hashHistory.push('/pin');
					console.log('200');
				}, 200);
			},
			401: function() {
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