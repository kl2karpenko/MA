import React from 'react';

import ConnectByQR from './ConnectByQR.jsx';
import ConnectByPIN from './ConnectByPIN.jsx';

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