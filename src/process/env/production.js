import config from "./shared";

function getAddressOfHost(isApp) {
	let hostName = `https://${config.isIOS() ? "ios" : "android"}.app.qaller.net`;
	return hostName + "/";
}

function getTokenHostName(isApp) {
	let tokenHostName = `https://${config.isIOS() ? "ios" : "android"}.app.qaller.net`;
	let tokenUrl = "/token";

	return tokenHostName + tokenUrl;
}

module.exports = $.extend(true, config, {
	schema: {
		hostname: getAddressOfHost(config.process.isBuildApp()),
		tokenHostname: getTokenHostName(config.process.isBuildApp())
	}
});
