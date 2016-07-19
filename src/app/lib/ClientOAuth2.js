let ClientOAuth2 = require('client-oauth2');
let kwebblOAuth;
let userToken;

console.log('oauth');

module.exports = {
	authorize(token) {
		if (!kwebblOAuth) {
			kwebblOAuth = new ClientOAuth2({
				clientId: '2909abc18ab27bea41f531705d0dcf55',
				clientSecret: 'b63mso0el64xpa7',
				authorizationUri: 'http://10-60-28-150.ams.kwebbl.dev:4444/token',
				redirectUri: 'http://localhost:8030',
				grant_type: "password",
				qr_code: token
			});
		}

		return kwebblOAuth;
	},

	getAuthorizeHeader(token) {
		return this.authorize(token)
			.request({
				method: 'post',
				url: 'http://10-60-28-150.ams.kwebbl.dev:4444/token',
				body: {
					clientId: '2909abc18ab27bea41f531705d0dcf55',
					clientSecret: 'b63mso0el64xpa7',
					grant_type: "password",
					qr_code: token
				}
			})
			.then(function (res) {
				userToken = res;
			});
	},

	refresh() {
		return kwebblOAuth.refresh();
	}
};

