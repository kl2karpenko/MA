import config from 'envConfig';

module.exports = function (pathToImg) {
	let imgPath = (config.process.isDev() || config.process.isLocal()) ? 'build/' : '';
	
	if (Array.isArray(pathToImg)) {
		pathToImg = pathToImg.map((path) => {
			return imgPath + path;
		});
	} else {
		pathToImg = imgPath + pathToImg;
	}

	return pathToImg;
};