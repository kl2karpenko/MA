import Storage from 'models/Storage';
import config from 'envConfig';
import messenger from 'messenger';
import { hashHistory } from 'react-router';
import { $t } from 'lib/locale';

class Token {
	constructor() {
		this.authorizationUri = config.schema.tokenHostname;
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
			requestBody = Token.getBodyForRequest(options);

		return this.getTokenRequest(requestBody).then((data) => {
			this.tokenData = data;
			this.saveToken(data.access_token);
		}).catch((fl) => {
			console.log('cant load token, error: ', fl);
		});
	}

	saveToken(value) {
		this.token = value;
		Storage.setValue("token", value || this.token);
	}

	_getBase64EncodeForClient() {
		return btoa(encodeURIComponent(this.clientId + ":" + this.clientSecret).replace(/%([0-9A-F]{2})/g, function(match, p1) {
			return String.fromCharCode('0x' + p1);
		}));
	}

	getTokenRequest(requestBody) {
	  return $.ajax({
		  type: "POST",
		  url: this.authorizationUri,
		  data: requestBody,
		  timeout: 10000,
		  dataType: "json",
		  beforeSend: (xhr) => {
			  xhr.setRequestHeader("Authorization", "Basic " + this._getBase64EncodeForClient());
		  },
		  statusCode: {
			  401: function(res) {
				  messenger.error(
				  	res.responseJSON && res.responseJSON.error_description,
					  $t("error")
				  );
			  },
			  403: function(res) {
				  messenger.error(
				  	res.responseJSON && res.responseJSON.error_description,
					  $t("error")
				  );
			  },
			  500: function() {
				  messenger.error($t("errors.500"), $t("error"));

				  $(document).trigger('system:fail');
			  }
		  }
	  });
	}

	static getBodyForRequest(options) {
		let tokenOptions = {
			"grant_type": options.type
		};

		tokenOptions[options.type] = options.value;

		return tokenOptions;
	}

	refreshToken() {
		if (!this.token || !this.tokenData.refresh_token) {
			if (!location.hash.match("connects")) {
				hashHistory.replace('/connects/qr');
			}

			return (new Promise((res) => { }));
		}

		return this.getTokenRequest({
			"grant_type": "refresh_token",
			"refresh_token": this.tokenData.refresh_token
		}).then((data) => {
			this.tokenData = data;
			this.saveToken(data.access_token);
		}).catch((fl) => {
			console.log('cant refresh token, error: ', fl);
		});
	}
}

let instance = new Token();

module.exports = (() => {
	return instance;
})();
