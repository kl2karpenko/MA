import config from 'envConfig';

module.exports = {
	switchToSettings() {
		return config.process.isProd() && cordova.plugins.diagnostic.switchToSettings(() => {
			console.log('go to settings');
		}, () => {
			alert('Cant load permission for data');
		});
	}
};