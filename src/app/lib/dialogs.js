import config from 'envConfig';

module.exports = {
	prompt: config.process.isProd() ? navigator.notification.prompt : prompt.bind(window),
	confirm: config.process.isProd() ? navigator.notification.confirm : confirm.bind(window),
	alert: config.process.isProd() ? navigator.notification.alert : alert.bind(window)
};