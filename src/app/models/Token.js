import Storage from 'models/Storage';
import config from 'envConfig';
import messenger from 'messenger';

var ClientOAuth2 = require('client-oauth2');

class Token {
	constructor() {
		this.authorizationUri = config.schema.tokenHostname;
		this.redirectUri = "http://localhost:8030";
		this.clientId = "2909abc18ab27bea41f531705d0dcf55";
		this.clientSecret = "b63mso0el64xpa7";

		this.token = Storage.getValue('token');
	}

	load(options) {
		options = options || {
		 type: "",
			value: ""
		};

		let
			client = this.getTokenOptions(options),
			requestBody = this.getBodyForRequest(options);

		return this.createClient(client).request({
				method: 'post',
				url: this.authorizationUri,
				body: requestBody,
				crossDomain: true,
				timeout: 6000,
				error: (XMLHttpRequest, textStatus, errorThrown) => {
					console.log(XMLHttpRequest, textStatus, errorThrown);
					// messenger.error()
				}
			})
			.then((res) => {
				console.log(res);
				this.token = res.body.access_token;
				this.saveToken();
			});
	}

	createClient(requestBody) {
		return new ClientOAuth2(requestBody);
	}

	saveToken(value) {
		Storage.setValue("token", value || this.token);
	}

	getTokenOptions(options) {
		let tokenOptions = {
			"clientId": this.clientId,
			"clientSecret": this.clientSecret,
			"authorizationUri": this.authorizationUri,
			"redirectUri": this.redirectUri,
			"grant_type": options.type
		};

		tokenOptions[options.type] = options.value;

		return tokenOptions;
	}

	getBodyForRequest(options) {
		let tokenOptions = {
			"client_id": this.clientId,
			"client_secret": this.clientSecret,
			"grant_type": options.type
		};

		tokenOptions[options.type] = options.value;

		return tokenOptions;
	}

	refreshToken() {
		return this.load();
	}
}

let instance = new Token();

module.exports = (() => {
	return instance;
})();
