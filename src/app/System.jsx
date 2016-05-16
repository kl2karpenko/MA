import { Router, hashHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

export default class System {
	constructor() {
	}

	_createRoutes() {
		return this._checkIfAlreadyConnect().then((loginInfo) => {
			let isConnected = loginInfo;
			let routes = [
				require('./mdls/contacts/index.jsx')
			];

			if (!isConnected) {
				routes.unshift(require('./mdls/connect/index.jsx'));
			}

			return {
				component: 'div',
				childRoutes: [
					{
						path: '/',
						component: require('./mdls/App.jsx'),
						indexRoute: {
							// TODO: think about login of redirect after login
							onEnter: (nextState, replace) => replace(isConnected ? '/contacts/mobile' : '/connect/main')
						},
						childRoutes: routes
					}
				]
			};
		});
	}

	_checkIfAlreadyConnect() {
		return $.get("/ajax/login", (loginInfo) => {
			return loginInfo;
		});
	}

	_addStyles() {
		require("../css/app.less");
	}

	_addRoutes(rootRoute) {
		console.log(rootRoute);

		ReactDOM.render(
			<Router history={hashHistory} routes={rootRoute} />,
			document.getElementById('app')
		)
	}

	init() {
		this._createRoutes().then((routes) => {
			this._addRoutes(routes);
		});
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