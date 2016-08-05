import config from "./shared";

// let IPMac = 'http://192.168.2.105:8030/';
const IPMac = 'http://10.10.201.49:8030/';
const IPDesktop = 'http://10.10.200.28:8030/';

function getAddressOfHost(isApp) {
	const locHostName =  config.process.isIOS() ? IPMac : IPDesktop;
	const hostName = isApp ? locHostName : "/";

	return hostName;
}

function getTokenHostName(isApp) {
	const tokenHostName = "http://185.19.237.126:4445";
	const tokenUrl = "/token";

	return tokenHostName + tokenUrl;
}

module.exports = $.extend(true, config, {
	schema: {
		hostname: getAddressOfHost(config.process.isBuildApp()),
		tokenHostname: getTokenHostName(config.process.isBuildApp())
	}
});
