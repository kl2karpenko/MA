import System from './app/System.jsx';
import messenger from "messenger";

var app = new System();

app
	.boot()
	.always(() => {
		app.init();
	});