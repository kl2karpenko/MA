import $ from 'jquery';
import config from 'envConfig';

import 'rest-client';

$( document ).ajaxStart(function() {
	$('#app').addClass('loading');
});

$( document ).ajaxStop(function() {
	$('#app').removeClass('loading');
});

module.exports = (new $.RestClient(config.hostname, {
	stringifyData: false,
	autoClearCache: true,
	request: function(resource, options) {
		console.log(options)
		return $.ajax(options);
	}
}));