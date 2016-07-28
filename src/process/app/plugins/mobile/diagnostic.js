if (!cordova || !cordova.plugins || !cordova.plugins.diagnostic) {
	throw new Error("you don't have installed >> diagnostic << cordova plugin");
}

module.exports = {
	switchToSettings() {
		return cordova.plugins.diagnostic.switchToSettings(() => {
			console.log('go to settings');
		}, () => {
			alert('Cant load permission for data');
		});
	},

	diagnostic: cordova.plugins.diagnostic
};