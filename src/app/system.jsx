import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import React from 'react';

import ConnectPage from './mdls/connect.jsx';
import App from './mdls/main.jsx';

import config from './config';

// import all pages

export default class System {
	constructor() {
		
	}

	addRoute(routes) {

		// for(let route in routes) {
		// 	let routesPath = routes[route];
		//
		// 	console.log(routesPath, route);
		//
		// 	this.router.addRoute(route.toString(), function() {
		// 		System.import(routesPath.toString()).then(function (PageSmth) {
		// 				React.render(
		// 				<PageSmth />,
		// 					document.body
		// 				);
		// 		})
		// 	});
		//
		// 	console.log(this.router)
		// }

		console.log('render main');

		React.render(
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<Route path="/connect" component={ConnectPage}>
						<Route path="/pin" component={ConnectPage}/>
						<Route path="/qr" component={ConnectPage}/>
					</Route>
				</Route>
			</Router>, document.getElementById('app')
		)
	}
	
	boot() {
		this.addRoute(config.routes);
	}
}