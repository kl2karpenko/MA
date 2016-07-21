import config from "./config";

function getAddressOfHost() {
	let devServerHostName = "http://10-60-28-150.ams.kwebbl.dev:7887/";
	let hostName =  "/";

	return hostName;
}

module.exports = $.extend(config, {
	schema: {
		hostname: getAddressOfHost()
	}
});