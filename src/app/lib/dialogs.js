import config from 'envConfig';

function promptCustom(text, callback) {

	var result = prompt.call(window, text);

	return callback({
		input1: result
	});
}

function confirmCustom(text, callback) {
	var result = confirm.call(window, text);

	return callback( result ? 1 : 0 );
}

module.exports = {
	prompt: config.process.isProd() ? navigator.notification.prompt : promptCustom,
	confirm: config.process.isProd() ? navigator.notification.confirm : confirm.bind(window),
	alert: config.process.isProd() ? navigator.notification.alert : alert.bind(window)
};