if (!cordova || !cordova.plugins || !cordova.plugins.barcodeScanner) {
	throw new Error("you don't have installed >> barcodeScanner << cordova plugin");
}

module.exports = cordova.plugins.barcodeScanner;