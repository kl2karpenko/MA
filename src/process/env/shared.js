import ProcessInfo from '../config';

function getTokenHostName() {
	let tokenHostName = "http://185.19.237.126:4445";
	let tokenUrl = "/token";

	return tokenHostName + tokenUrl;
}

module.exports = {
	modules: [
		"core",
		"connects",
		"pin",
		"settings",
		"dialplans",
		"contacts",
		"mailboxes"
	],
	schema: {
		hostname: "/",
		tokenHostname: getTokenHostName()
	},
	process: ProcessInfo
};
