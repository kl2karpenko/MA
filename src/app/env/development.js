import config from "./config";

function getAddressOfHost() {
	let devServerHostName = "http://mobile-app.dev.kwebbl.net:8030/";
	let hostName =  "/";

	return hostName;
}

module.exports = $.extend(config, {
	schema: {
		hostname: getAddressOfHost()
	}
});