import React, {Component} from 'react';

export default class Enter extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div className="l-adaptive-top">
			{this.props.children}
		</div>);
	}
}