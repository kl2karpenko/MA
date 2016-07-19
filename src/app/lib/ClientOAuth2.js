let ClientOAuth2 = require('client-oauth2');
let kwebblOauth;

module.exports = {
	authorize(token) {
		if (!kwebblOauth) {
			kwebblOauth = new ClientOAuth2({
				clientId: '2909abc18ab27bea41f531705d0dcf55',
				clientSecret: 'b63mso0el64xpa7',
				authorizationUri: 'http://10-60-28-150.ams.kwebbl.dev:4444/token',
				redirectUri: 'http://localhost:8030',
				grant_type: "password",
				qr_code: token
			});
		}

		return kwebblOauth;
	},

	getAuthorizeHeader() {
		return this.authorize().request({
			method: 'post',
			url: 'http://10-60-28-150.ams.kwebbl.dev:4444/token'
		})
			.then(function (res) {
				console.log(res);
			})
	},

	refresh() {

	}
};

