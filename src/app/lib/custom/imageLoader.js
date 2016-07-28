module.exports = function (pathToImg) {
	let imgPath = '';
	
	if (Array.isArray(pathToImg)) {
		pathToImg = pathToImg.map((path) => {
			return imgPath + path;
		});
	} else {
		pathToImg = imgPath + pathToImg;
	}

	return pathToImg;
};
