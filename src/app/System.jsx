import './lib/vendor/modernizr/custom';
import React                  from 'react';
import ReactDOM               from 'react-dom';
import {Router, hashHistory}  from 'react-router';

import Main                   from "./modules/core/components/Enter.jsx";
import config                 from 'envConfig';

/** Import ================================================================== */

export default class System {
	static _setStyles() {
		return require("../css/app.less");
	}

	_createRoutes() {
		this.rootRoute = {
			component: 'div',
			createHistory: {
				queryKey: false
			},
			childRoutes: [
				{
					path: '/',
					component: Main,
					childRoutes: [
						require('./modules/connects/routes.jsx'),
						require('./modules/pin/routes.jsx'),
						require('./modules/contacts/routes.jsx'),
						require('./modules/settings/routes.jsx'),
						require('./modules/dialplans/routes.jsx'),
						require('./modules/mailboxes/routes.jsx')
					]
				}
			],
			onLeave: (nextState, replace) => {
				let pathname = nextState.location.pathname;

				if (pathname.indexOf("dialplans") !== -1) {
					$('#app').addClass('light').removeClass('dark');
				} else {
					$('#app').addClass('dark').removeClass('light');
				}
			}
		};

		return this;
	}

	_changeBodyClass() {

	}

	_renderApp() {
		ReactDOM.render(
			<Router history={hashHistory} routes={this.rootRoute}/>,
			document.getElementById('app')
		);
	}

	_initApp() {
		this
			._createRoutes()
			._renderApp();
	}

	/**
	 * Init the app, and check if we are on prod set event for device ready
	 * if we in dev env we will work in browser so just init the app
	 */
	init() {
		if (config.process.isBuildApp()) {
			/* on device ready init app */
			document.addEventListener("deviceready", this._initApp.bind(this), false);
			/* on device ready init app */
		} else {
			this._initApp();
		}
	}

	/**
	 * require main stylesheet and config for all modules (add schema)
	 * @returns {*|Promise.<TResult>}
	 */
	boot() {
		return $.when(System._setStyles)
			.then(require('./modules/core/config')).fail((fl) => {
				console.log('cant load config file');
			});
	}
}
