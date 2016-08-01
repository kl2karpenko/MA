import config from "../../../config";

var statusesObject = {
	android: {
		DENIED: "DENIED",
		DENIED_ALWAYS: "DENIED_ALWAYS",
		GRANTED: "GRANTED",
		NOT_REQUESTED: "NOT_REQUESTED"
	},

	ios: {
		NOT_REQUESTED: "NOT_REQUESTED",
		DENIED: "DENIED",
		RESTRICTED: "RESTRICTED",
		GRANTED: "GRANTED",
		GRANTED_WHEN_IN_USE: "GRANTED_WHEN_IN_USE"
	}
};

var platform = config.getActivePlatform();

module.exports = {
	switchToSettings() {
		return true;
	},

	diagnostic: {
		permissionStatus: statusesObject[platform]
	}
};