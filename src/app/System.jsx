import { Router, hashHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

export default class System {
	constructor() {
		this.rootRoute = {
			component: 'div',
			childRoutes: [
				{
					path: '/',
					component: require('./mdls/App.jsx'),
					indexRoute: {
						// TODO: check if person is already login and if is don't show this module connect
						onEnter: (nextState, replace) => replace('/connect/main')
					},
					childRoutes: [
						// TODO: check if person is already login and if is don't show this module connect
						require('./mdls/connect/index.jsx'),
						require('./mdls/contacts/index.jsx')
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
		 <Route path="contacts/:name" component={ContactPage} />
	 </Route>
 </Router>
 */