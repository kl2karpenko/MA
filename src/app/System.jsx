import { Router, hashHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

export default class System {
	constructor() {
		this.rootRoute = {
			childRoutes: [
				{
					path: '/',
					component: require('./mdls/App.jsx'),
					childRoutes: [
						require('./mdls/connect/index.jsx')
					]
				}
			]
		}
	}

	_addStyles() {
		require("../css/app.less");
	}

	_createRoutes() {
		ReactDOM.render(
			<Router history={hashHistory} routes={this.rootRoute} />,
			document.getElementById('app')
		)
	}

	init() {
		this._createRoutes();
	}
	
	boot() {
		this._addStyles();
	}
}

/*

 <Router history={routerHistory}>
	 <Route path="/" component={App}>
		 <Route path="connect/:name" component={ConnectPage} />
	 </Route>
 </Router>

 */