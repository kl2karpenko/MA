import ProcessInfo from '../config';

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
		tokenHostname: "/token"
	},
	process: ProcessInfo
};
