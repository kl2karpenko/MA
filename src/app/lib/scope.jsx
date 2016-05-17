import React from 'react';

export default class Scope extends React.Component {
	constructor(props) {
		super(props);

		console.log('init');

		this.init();
	}

	init() {
		console.log('init scope');
	}

	render() {
		return <div></div>;
	}
}