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
				if (errorText.error_description || errorText.message) {
					errorText = errorText.error_description || errorText.message;
				} else if (errorText.status || errorText.statusCode) {
					errorText = errorText.status || errorText.statusCode;
				}
			}
		} catch(error) {
			console.log('fail parse response, invalid json');
		}

		console.error(`Error for ${entity}, response: `, errorText);
	}
};