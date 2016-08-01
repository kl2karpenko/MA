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
	prompt: promptCustom,
	confirm: confirm.bind(window),
	alert: alert.bind(window)
};