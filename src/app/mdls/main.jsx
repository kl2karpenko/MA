import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Link to="connect">Connect to the app</Link>

				{this.props.children}
			</div>
		);
	}
}