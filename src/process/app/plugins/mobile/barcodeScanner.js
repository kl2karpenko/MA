import config from '../../config';

if (config.isProd()) {
	if (!cordova || !cordova.plugins || !cordova.plugins.barcodeScanner) {
		throw new Error("you don't have installed >> barcodeScanner << cordova plugin");
	}
}

module.exports = {
	barcodeScanner: cordova.plugins.barcodeScanner
};