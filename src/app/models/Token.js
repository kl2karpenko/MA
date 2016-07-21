import Storage from 'models/Storage';
import config from 'envConfig';

class Token {
	constructor() {
		this.authorizationUri = config.schema.tokenHostname;
		this.redirectUri = "http://localhost:8030";
		this.clientId = "b63mso0el64xpa7";
		this.clientSecret = "b63mso0el64xpa7";

		this.token = Storage.getValue('token');
	}

	load(options) {
		options = options || {
			 type: "",
				value: ""
			};

			console.log(this.authorizationUri);


		return $.ajax({
				type: "POST",
				url: this.authorizationUri,
				data: this.getTokenOptions(options),
				dataType: 'json'
			})
			.done((data) => {
				console.log(data, 'token');

				this.token = data.token.token;

				this.saveToken();
			});
	}

	saveToken(value) {
		Storage.setValue("token", value || this.token);
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

	refreshToken() {
		console.log(this);

		return this.load();
	}
}

let instance = new Token();

module.exports = (() => {
	return instance;
})();
