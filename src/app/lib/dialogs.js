import config from 'envConfig';

module.exports = {
	prompt: config.process.isProd() ? navigator.notification.prompt : prompt,
	confirm: config.process.isProd() ? navigator.notification.confirm : confirm,
	alert: config.process.isProd() ? navigator.notification.alert : alert
};