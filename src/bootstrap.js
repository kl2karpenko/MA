import System from './app/System.jsx';
import $ from 'jquery';
import envConfig from 'envConfig';

var application = new System();

application.boot();

$.get(envConfig.routesData.login, (loginInfo) => {
	return loginInfo;
}).then((loginInfo) => {
	let redirectPage = loginInfo ? '/contacts/mobile' : '/connect/main';
	console.log(loginInfo, redirectPage)

	if (process.env.NODE_ENV === "prod") {
		/* on device ready init app */
		document.addEventListener("deviceready", function() {
			application.init(redirectPage);
		}.bind(this), false);
		/* on device ready init app */
	} else {
		application.init(redirectPage);
	}
});
