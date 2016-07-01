import $ from 'jquery';
import config from 'envConfig';

import 'rest-client';

$( document ).ajaxStart(function() {
	$('#app').addClass('loading');
});

$( document ).ajaxStop(function() {
	$('#app').removeClass('loading');
});

$( document ).ajaxError(function() {
	$('#app').removeClass('loading');
});

module.exports = (new $.RestClient(config.hostname, {
	stripTrailingSlash: true,

	stringifyData: true,

	autoClearCache: true,

	request: function(resource, options) {
		options.timeout = 3000;

		return $.ajax(options);
	}
}));