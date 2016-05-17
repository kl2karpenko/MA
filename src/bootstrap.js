import System from './app/System.jsx';

var application = new System();

application.boot();

application
	.getAuthentication()
	.then((entryPage) => {
		console.log(entryPage)
		if (process.env.NODE_ENV === "prod") {
			/* on device ready init app */
			document.addEventListener("deviceready", function() {
				application.init(entryPage);
			}.bind(this), false);
			/* on device ready init app */
		} else {
			application.init(entryPage);
		}
	});
