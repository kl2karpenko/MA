if (!navigator.notification) {
	throw new Error("you don't have installed >> notification << cordova plugin");
}

module.exports = {
	prompt: navigator.notification.prompt,
	confirm: navigator.notification.confirm,
	alert: navigator.notification.alert
};