// import config from 'envConfig';
module.exports = function (pathToImg) {
	// let imgPath = process.env.NODE_ENV === "dev" ? 'build/' : '';

	let imgPath = '';
	
	if (Array.isArray(pathToImg)) {
		pathToImg = pathToImg.map((path) => {
			return imgPath + path;
		});
	} else {
		pathToImg = imgPath + pathToImg;
	}

	return pathToImg;
}
