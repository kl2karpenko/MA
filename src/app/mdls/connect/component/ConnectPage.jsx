import React from 'react';
import { Link } from 'react-router';

class ConnectByQR extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>
					Scan QR code
				</h1>
				<Link to="/connect/pin">Connect by PIN code</Link>
			</div>
		);
	}
}

class ConnectByPIN extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>
					Enter PIN code
				</h1>
				<Link to="/connect/qr">Connect by QR code</Link>
			</div>
		);
	}
}

class ConnectPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var pageRender;
		if (this.props.params.name === "qr") {
			pageRender = <ConnectByQR />;
		} else {
			pageRender = <ConnectByPIN />;
		}

		return (
			<div>
				{pageRender}

				{this.props.children}
			</div>
		);
	}
}

module.exports = ConnectPage;