import System from './app/System.jsx';

var app = new System();

app
	.boot()
	.then(app.init.bind(app));
