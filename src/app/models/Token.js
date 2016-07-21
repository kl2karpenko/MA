import Model from 'Model';

import Storage from 'models/Storage';

class Token extends Model {
	init() {
		this.managedResource = 'token';
		this.isSingle = true;

		this.authorizationUri = "http://10-60-28-150.ams.kwebbl.dev:4445/token";
		this.redirectUri = "http://localhost:8030";
		this.clientId = "b63mso0el64xpa7";
		this.clientSecret = "b63mso0el64xpa7";

		return Model.prototype.init();
	}

	afterInit() {
		this.assignAttributes({
			value: Storage.getValue('token')
		});
	}

	load(options) {
		options = options || {
			type: "connect_code",
			value: ""
		};

		$.ajax({
				type: "POST",
				url: this.authorizationUri,
				data: this.getTokenOptions(options),
				dataType: 'json'
			})
			.done((token) => {
				console.log(token);

				let t = {
					value: Storage.getValue('token')
				};

				this._setOriginalValues(t);
				this.assignAttributes(t);

				this.saveToken("567658878687");
			});
	}

	saveToken() {
		Storage.setValue("token", this.getValueByPath("value"));
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
		return this.token.load();
	}

	_defaultToken() {
		return {
			"value": ""
		};
	}
}

let instance = new Token();

module.exports = (() => {
	return instance;
})();
