import $ from 'jquery';
import config from 'envConfig';

import 'rest-client';

(() => {
	$( document ).ajaxStart(function() {
		$('#app').addClass('loading');
	});

	$( document ).ajaxStop(function() {
		$('#app').removeClass('loading');
	});
})();

module.exports = (new $.RestClient(config.hostname, {}));