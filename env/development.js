import config from "./config";

function getAddressOfHost() {
	let devServerHostName = "http://10.60.28.150:7887";
	let devServerUrl =  "/";

	return devServerHostName + devServerUrl;
}

function getTokenHostName() {
	let tokenHostName = "http://10.60.28.150:4445";
	let tokenUrl = "/token";

	return tokenHostName + tokenUrl;
}

module.exports = $.extend(true, config, {
	schema: {
		hostname: getAddressOfHost(),
		tokenHostname: getTokenHostName()
	}
});