import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

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
			<button
			      className={this.props.className}
			      onTouchStart={this._goto}>
				{this.props.text}
			</button>
		);
	}
}