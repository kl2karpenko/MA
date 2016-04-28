import React from 'react';
import { Link } from 'react-router';

export  default class ContactsMobile extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>
					List of contacts from users phone
				</h1>
				<Link activeClassName="-active" to="/contacts/pin">Connect by PIN code</Link>
			</div>
		);
	}
}