import $ from 'jquery';
import config from 'envConfig';
import {hashHistory} from 'react-router';

import 'rest-client';

$( document ).ajaxStart(function() {
	$('#app').addClass('loading');
});

$( document ).ajaxComplete(function() {
	$('#app').removeClass('loading');
});

module.exports = (new $.RestClient(config.hostname, {
	stripTrailingSlash: true,

	stringifyData: true,

	autoClearCache: true,

	request: function(resource, options) {
		options.timeout = 3000;

		return $.ajax(options).fail(() => {
			hashHistory.replace('/offline');
		});
	}
}));