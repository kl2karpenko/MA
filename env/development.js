import config from "./config";

function getAddressOfHost() {
	let devServerHostName = "http://10.60.28.150:7887/";
	let hostName =  "/";

	return devServerHostName;
}

function getTokenHostName() {
	let tokenHostName = "http://10.60.28.150:4445/token";
	let localTokenHostName = "/token";

	return tokenHostName;
}

module.exports = $.extend(true, config, {
	schema: {
		hostname: getAddressOfHost(),
		tokenHostname: getTokenHostName()
	}
});