/**
 * define language for app
 * @type {{getCurrentLanguage: (function())}}
 */

module.exports = {

	getCurrentLanguage() {
		return (new Promise((res) => {
			res("en");
		}));
	}
	
};