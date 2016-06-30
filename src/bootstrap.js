import System from './app/System.jsx';
import messenger from "messenger";

var app = new System();

app
	.boot()
	.always((data) => {
		if (data && data.message) {
			messenger.error(data.message);
		} else {
			app.init();
		}
	});