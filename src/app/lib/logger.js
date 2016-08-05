module.exports = {
	logInfo(text, response) {
		console.log(text, " response: ", response || "");
	},

	logInfoGroup(text, response) {
		console.log(text, " response: ", response);
	},

	logError(entity, error) {
		let errorText = error.responseText || error;

		if (errorText) {
			errorText = errorText.error_description || errorText;
		}

		throw new Error(`Error for ${entity}: response: ${errorText}`);
	}
};