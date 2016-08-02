import config from "./shared";

let IPMac = 'http://192.168.2.105:8030/';
// let IPMac = 'http://10.10.201.49:8030/';
let IPDesktop = 'http://10.10.200.28:8030/';

function getAddressOfHost() {
	let hostName =  config.process.isIOS() ? IPMac : IPDesktop;

	return hostName;
}

module.exports = $.extend(true, config, {
	schema: {
		hostname: getAddressOfHost()
	}
});