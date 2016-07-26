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
				component={this.props.component || "button"}
				classBase={this.props.activeClassName}
				pressDelay={500}
				className={this.props.className + (location.href.match(this.props.href.replace("/", "\/")) ? " active" : "")}
				onTap={this._goto}
			>
			{this.props.text}
		</Tappable>
		);
	}
}