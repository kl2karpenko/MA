if (!navigator.globalization) {
	throw new Error("you don't have installed >> globalization << cordova plugin");
}

module.exports = {

	getCurrentLanguage() {
		return (new Promise((res) => {
			navigator.globalization.getPreferredLanguage((language) => {
				res(language.value);

				console.log(language.value);
			}, () => {
				res("en");
				console.log("error for location language");
			});
		}));
	}
	
};