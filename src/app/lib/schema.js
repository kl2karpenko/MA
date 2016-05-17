import $ from 'jquery';
import config from 'envConfig';

import 'rest-client';

let schema = (new $.RestClient(config.hostname));

module.exports = schema;