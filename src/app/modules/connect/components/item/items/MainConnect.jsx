import React from 'react';

export default class MainConnect extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="l-main l-main-connect">
				<div className="l-main-center">
					<h2 className="l-main__header">{this.props.header}</h2>
					<p className="l-main__text">{this.props.text}</p>
				</div>
			</div>
		);
	}
}