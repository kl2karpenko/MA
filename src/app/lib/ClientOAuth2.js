let ClientOAuth2 = require('client-oauth2');

import Storage from "models/Storage";

export default class OAuthClient {
	initialize(options) {
		console.log('init OAuthClient');

		options = options || {
				type: "qr_code",
				value: ""
		};

		this.authorizationUri = "http://10-60-28-150.ams.kwebbl.dev:4445/token";
		this.redirectUri = "http://localhost:8030";
		this.clientId = "b63mso0el64xpa7";
		this.clientSecret = "b63mso0el64xpa7";

		this.token = OAuthClient.createOAuthClient(
			this.getTokenOptions(options)
		);

		Storage.setValue('token', this.token);
	}

	getTokenOptions(config) {
		let tokenOptions = {
			"clientId": this.clientId,
			"clientSecret": this.clientSecret,
			"authorizationUri": this.authorizationUri,
			"redirectUri": this.redirectUri,
			"grant_type": config.type
		};

		tokenOptions[config.type] = config.value;

		return tokenOptions;
	}

	static createOAuthClient(options) {
		return new ClientOAuth2(options);
	}

	refreshToken() {
		return this.token.refresh();
	}
}