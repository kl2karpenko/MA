import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LinkButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Link
				activeClassName={this.props.activeClassName}
			      className={this.props.className}
			      to={this.props.href}>
				{this.props.text}
			</Link>
		);
	}
}