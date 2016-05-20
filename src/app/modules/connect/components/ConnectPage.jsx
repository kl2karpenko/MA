import React, { Component } from 'react';

class ConnectPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {		
		return (
			<div className="l-adaptive-wrapper">
				{this.props.children}
			</div>
		);
	}
}

module.exports = ConnectPage;