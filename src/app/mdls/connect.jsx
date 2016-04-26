import React from 'react';

class ConnectByQR extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				Scan QR code
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
				Enter PIN code
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
			</div>
		);
	}
}

export default ConnectPage;