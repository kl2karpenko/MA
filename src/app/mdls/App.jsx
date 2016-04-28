import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="col-group">
					<Link to="/connect/qr">Connect to the app</Link>

					{this.props.children}
				</div>
			</div>
		);
	}
}

module.exports = App