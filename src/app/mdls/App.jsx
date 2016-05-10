import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="col-group">
					{this.props.children}
				</div>
			</div>
		);
	}
}

module.exports = App;