import config from "./shared";

function getAddressOfHost(isApp) {
	let devServerHostName = "http://10.60.28.150:7887"
	if (isApp) {
		devServerHostName = `https://${config.isIOS() ? "idev" : "adev"}.app.qaller.net`;
	}

	let devServerUrl =  "/";

	return devServerHostName + devServerUrl;
}

function getTokenHostName(isApp) {
	let tokenHostName = "http://10.60.28.150:4445";
	if (isApp) {
		tokenHostName = `https://${config.isIOS() ? "idev" : "adev"}.app.qaller.net`;
	}
	let tokenUrl = "/token";

	return tokenHostName + tokenUrl;
}

module.exports = $.extend(true, config, {
	schema: {
		hostname: getAddressOfHost(config.process.isBuildApp()),
		tokenHostname: getTokenHostName(config.process.isBuildApp())
	}
});
