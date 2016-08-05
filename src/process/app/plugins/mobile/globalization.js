/**
 * define language for app
 * @type {{getCurrentLanguage: (function())}}
 */

import { logError, logInfo }    from "lib/logger";

if (!navigator.globalization) {
	throw new Error("you don't have installed >> globalization << cordova plugin");
}

module.exports = {

	getCurrentLanguage() {
		return (new Promise((res) => {
			navigator.globalization.getPreferredLanguage((language) => {
				res(language.value);

				logInfo("Language", language.value);
			}, (error) => {
				res("en");
				logError("Language", error);
			});
		}));
	}
	
};