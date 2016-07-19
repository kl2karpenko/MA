import System from './app/System.jsx';

var app = new System();

app
	.boot()
	.always(() => {
		app.init();
	});