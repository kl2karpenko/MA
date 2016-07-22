import config from "./config";

function getAddressOfHost() {
	let devServerHostName = "http://10-60-28-150.ams.kwebbl.dev:7887/";
	let hostName =  "/";

	return devServerHostName;
}

console.log(getAddressOfHost())

module.exports = $.extend(true, config, {
	schema: {
		hostname: getAddressOfHost(),
		tokenHostname: "http://10-60-28-150.ams.kwebbl.dev:4445/token"
	}
});