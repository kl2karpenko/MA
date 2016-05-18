// import './vendor/modernizr';
import { Router, hashHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

import schema from 'schema';
import config from 'envConfig';


export default class System {
	// TODO: have warning: "the request of a dependency is an expression"
	static _loadConfiguration() {
		let
			configList = config.mdls.map((module) => {
				return './mdls/' + module + '/config';
			});

		configList.forEach((config) => {
			require(config);
		});
	}

	static _setStyles() {
		return require("../css/app.less");
	}

	_createRoutes(redirectPage) {
		this.rootRoute = {
			component: 'div',
			childRoutes: [
				{
					path: '/',
					component: require('./mdls/core/components/App.jsx'),
					indexRoute: {
						onEnter: (nextState, replace) => replace(redirectPage)
					},
					childRoutes: [
						require('./mdls/connect/routes.jsx'),
						require('./mdls/pin/routes.jsx'),
						require('./mdls/contacts/routes.jsx')
					]
				}
			]
		};

		return this;
	}

	_renderApp() {
		ReactDOM.render(
			<Router history={hashHistory} routes={this.rootRoute} />,
			document.getElementById('app')
		);
	}

	/**
	 * check if the person is already connect, if connect goto contacts page
	 * else goto connect page
	 * @returns {*|Promise.<TResult>}
	 */
	// TODO: rename to connect
	login() {
		return schema.login.read().then((loginInfo) => {
			return loginInfo ? '/contacts/mobile' : '/connect/main';
		});
	}


	/**
	 * create routes for app and render app in block id="app"
	 * @param redirectPage
	 */
	_initApp(redirectPage) {
		this
			._createRoutes(redirectPage)
			._renderApp();
	}

	/**
	 * Init the app, and check if we are on prod set event for device ready
	 * if we in dev env we will work in browser so just init the app
	 * @param redirectPage
	 */
	init(redirectPage) {
		if (process.env.NODE_ENV === "prod") {
			/* on device ready init app */
			document.addEventListener("deviceready",() => {
				this._initApp(redirectPage);
			}, false);
			/* on device ready init app */
		} else {
			this._initApp(redirectPage);
		}
	}

	/**
	 * require main stylesheet and config for all modules (add schema)
	 * @returns {*|Promise.<TResult>}
	 */
	boot() {
		var constr = this.constructor;

		return $.when(constr._setStyles)
						.then(constr._loadConfiguration);
	}
}