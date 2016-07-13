import $ from 'jquery';
import config from 'envConfig';
import {hashHistory} from 'react-router';

import 'rest-client';

module.exports = (new $.RestClient(config.schema.hostname, {
	stripTrailingSlash: true,

	stringifyData: true,

	autoClearCache: true,

	request: function(resource, options) {
		options.timeout = 3000;

		return $.ajax(options);
	}
}));