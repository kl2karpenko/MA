import config from "./shared";

function getAddressOfHost() {
	let hostName = `https://${config.process.isIOS() ? "ios" : "android"}.app.qaller.net`;
	return hostName + "/";
}

function getTokenHostName() {
	let tokenHostName = `https://${config.process.isIOS() ? "ios" : "android"}.app.qaller.net`;
	let tokenUrl = "/token";

	return tokenHostName + tokenUrl;
}

module.exports = $.extend(true, config, {
	schema: {
		hostname: getAddressOfHost(),
		tokenHostname: getTokenHostName()
	}
});
