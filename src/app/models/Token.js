import Storage from 'models/Storage';
import config from 'envConfig';
import messenger from 'messenger';
import { hashHistory } from 'react-router';

class Token {
	constructor() {
		this.authorizationUri = config.schema.tokenHostname;
		this.redirectUri = "http://localhost:8030";
		this.clientId = "2909abc18ab27bea41f531705d0dcf55";
		this.clientSecret = "b63mso0el64xpa7";

		this.token = Storage.getValue('token');
		this.tokenData = {};
		this.client = false;
	}

	load(options) {
		options = options || {
		 type: "",
			value: ""
		};

		let
			requestBody = this.getBodyForRequest(options);

		setTimeout(() => {
			this.refreshToken();
		}, 4000);

		return this.getTokenRequest(requestBody).then((data) => {
			this.tokenData = data;
			this.saveToken(data.access_token);
		});
	}

	saveToken(value) {
		this.token = value;
		Storage.setValue("token", value || this.token);
	}

	getTokenRequest(requestBody) {
	  return $.ajax({
		  type: "POST",
		  url: this.authorizationUri,
		  data: requestBody,
		  timeout: 10000,
		  dataType: "json"
	  });
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
		if (!this.token) {
			hashHistory.push('/connects/qr');
		}

		return this.getTokenRequest({
			"client_id": this.clientId,
			"client_secret": this.clientSecret,
			"grant_type": "refresh_token",
			"refresh_token": this.tokenData.refresh_token
		}).then((data) => {
			this.tokenData = data;
			this.saveToken(data.access_token);
		});
	}
}

let instance = new Token();

module.exports = (() => {
	return instance;
})();
