import config from "./shared";

function getAddressOfHost(isApp) {
	const publicHostName = "http://185.19.237.126:7887";
	const privetHostName = "http://10.60.28.150:7887";
	const hostName = isApp ? publicHostName : privetHostName;
	return hostName;
}

function getTokenHostName(isApp) {
	let tokenHostName = isApp ? "http://185.19.237.126:4445" : "http://10.60.28.150:4445";;
	let tokenUrl = "/token";

	return tokenHostName + tokenUrl;
}

module.exports = $.extend(true, config, {
	schema: {
		hostname: getAddressOfHost(config.process.isBuildApp()),
		tokenHostname: getTokenHostName(config.process.isBuildApp())
	}
});
