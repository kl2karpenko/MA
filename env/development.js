import config from "./config";

function getAddressOfHost() {
	let devServerHostName = "http://10.60.28.150:7887/";
	let hostName =  "/";

	return devServerHostName;
}

module.exports = $.extend(true, config, {
	schema: {
		hostname: getAddressOfHost(),
		tokenHostname: "http://10.60.28.150:4445/token"
	}
});