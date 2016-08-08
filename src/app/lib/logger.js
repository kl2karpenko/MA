import _ from "underscore";

module.exports = {
	logInfo(text, response) {
		console.info(text, (response ? " response: " : ""));
	},

	logInfoGroup(groupTitle, resource, responseData) {
		console.groupCollapsed(`${groupTitle} ${resource}`);
		console.info("response", responseData);
		console.groupEnd(`${groupTitle} ${resource}`);
	},

	logError(entity, error) {
		let errorText = error.response || error.responseText || error;

		try {
			errorText = JSON.parse(errorText);

			if (errorText && _.isObject(errorText)) {
				if (errorText.error_description) {
					errorText = errorText.error_description;
				}

				if (errorText.status) {
					errorText = errorText.status;
				}
			}
		} catch(error) { }

		console.error(`Error for ${entity}: response: ${errorText}`);
	}
};