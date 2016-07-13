import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import Tappable from 'react-tappable';

export default class LinkButton extends Component {
	constructor(props) {
		super(props);

		this._goto = this._goto.bind(this);
	}

	_goto() {
		hashHistory.push(this.props.href);
	}

	render() {
		return (
			<Tappable
				component="button"
				pressDelay={500}
				className={this.props.className}
				onTap={this._goto}
			>
			{this.props.text}
		</Tappable>
		);
	}
}