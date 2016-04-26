import React from 'react';

class ConnectByQR extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div>
					Scan QR code
				</div>
				<a href="/connect/pin">Connect by PIN code</a>
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
				<div>
					Enter PIN code
				</div>
				<a href="/connect/qr">Connect by QR code</a>
			</div>
		);
	}
}

class ConnectPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('render ConnectByQR');
		return (
			<div>
				<ConnectByQR />

				{this.props.children}
			</div>
		);
	}
}

export default ConnectPage;