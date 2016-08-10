import Storage                from 'models/Storage';
import config                 from 'envConfig';
import messenger              from 'messenger';
import { hashHistory }        from 'react-router';
import { $t }                 from 'lib/locale';
import { logError, logInfo }  from "lib/logger";

class Token {
	constructor() {
		this.authorizationUri = config.schema.tokenHostname;
		this.clientId = "2909abc18ab27bea41f531705d0dcf55";
		this.clientSecret = "b63mso0el64xpa7";

		console.log(this._getActiveValue(), this._getActiveTokenData() && this._getActiveTokenData().refresh_token);
	}

	load(options) {
		options = options || {
		 type: "",
			value: ""
		};

		let
			requestBody = Token.getBodyForRequest(options);

		return this.getTokenRequest(requestBody)
			.then((data) => {
				Token.saveTokenData(data);
				Token.saveToken(data.access_token);
			})
			.fail((tokenError) => {
				logError('Token', tokenError);
			});
	}
	
	static saveTokenData(objValue) {
		Storage.setValue("tokenData", JSON.stringify(objValue));
	}

	static saveToken(value) {
		Storage.setValue("token", value);
	}
	
	_getActiveValue() {
		return Storage.getValue("token");
	}

	_getActiveTokenData() {
		let tokenData = Storage.getValue("tokenData");

		if (tokenData) {
			try {
				tokenData = JSON.parse(tokenData);
			} catch (e) {
				console.log(e);
				Storage.deleteValue("tokenData");
			}

			return tokenData;
		}

		return null;
	}

	_getBase64EncodeForClient() {
		return btoa(encodeURIComponent(this.clientId + ":" + this.clientSecret)
			.replace(/%([0-9A-F]{2})/g, function(match, p1) {
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
		let tokenData = this._getActiveTokenData();

		if (!tokenData || !tokenData.refresh_token) {
			if (!location.hash.match("connects")) {
				hashHistory.replace('/connects/qr');
			}

			return (new Promise((res) => { }));
		}

		return this.getTokenRequest({
			"grant_type": "refresh_token",
			"refresh_token": tokenData.refresh_token
		})
		.then((data) => {
			Token.saveTokenData(data);
			Token.saveToken(data.access_token);
		})
		.fail((tokenError) => {
			console.log("refresh failed");
			Storage.disconnect();

			logError('Token', tokenError);
		});
	}
}

let instance = new Token();

module.exports = (() => {
	return instance;
})();
