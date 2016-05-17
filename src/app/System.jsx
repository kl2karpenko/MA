// import './vendor/modernizr';
import { Router, hashHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

import schema from 'schema';

export default class System {
	getAuthentication() {
		schema.add('login');

		return schema.login.read().then((loginInfo) => {
			return loginInfo ? '/contacts/mobile' : '/connect/main';
		});
	}

	_createRoutes(redirectPage) {
		this.rootRoute = {
			component: 'div',
			childRoutes: [
				{
					path: '/',
					component: require('./mdls/App.jsx'),
					indexRoute: {
						onEnter: (nextState, replace) => replace(redirectPage)
					},
					childRoutes: [
						require('./mdls/connect/index.jsx'),
						require('./mdls/pin/index.jsx'),
						require('./mdls/contacts/index.jsx')
					]
				}
			]
		};
	}

	_addStyles() {
		require("../css/app.less");
	}

	_addRoutes() {
		ReactDOM.render(
			<Router history={hashHistory} routes={this.rootRoute} />,
			document.getElementById('app')
		);
	}

	init(redirectPage) {
		this._createRoutes(redirectPage);
		this._addRoutes();
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