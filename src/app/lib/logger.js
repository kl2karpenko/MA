module.exports = {
	logInfo(text, response) {
		console.log(text, " response: ", response);
	},

	logInfoGroup(text, response) {
		console.log(text, " response: ", response);
	},

	logError(entity, error) {
		let jsonResponse = error.responseText;

		if (jsonResponse) {
			jsonResponse = jsonResponse.error_description || jsonResponse;
		}

		throw new Error(`Error for ${entity}: response: ${jsonResponse}`);
	}
};