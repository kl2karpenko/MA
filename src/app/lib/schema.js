import $ from 'jquery';
import config from 'envConfig';

import 'rest-client';

console.log('schema');

module.exports = (new $.RestClient(config.schema.hostname, {
	stripTrailingSlash: true,

	stringifyData: true,

	autoClearCache: true,

	request: function(resource, options) {
		options.timeout = 3000;

		return $.ajax(options);
	}
}));