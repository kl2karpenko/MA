import React from 'react';

class ConnectPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {		
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

module.exports = ConnectPage;