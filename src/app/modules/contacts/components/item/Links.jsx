import React, { Component } from 'react';
import LinkButton from 'components/buttons/LinkButton.jsx';

export default class LinksToContacts extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="m-angle-links">
				<LinkButton
					text="Mobile"
					component="a"
					className=""
					href="/contacts/mobile"
				/>

				<LinkButton
					text="Extensions"
					component="a"
					className=""
					href="/contacts/extensions"
				/>
			</div>
		);
	}
}