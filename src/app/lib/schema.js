import $ from 'jquery';
import config from 'envConfig';

import 'rest-client';

module.exports = (new $.RestClient(config.hostname, {

}));