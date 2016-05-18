import React from 'react';

class ConnectPage extends React.Component {
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