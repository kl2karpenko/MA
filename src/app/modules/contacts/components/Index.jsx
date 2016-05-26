import React, { Component } from 'react';
import { Link } from 'react-router';

import Contacts from './item/Contacts.jsx';
import Extensions from './item/Extensions.jsx';

class ContactPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var pageRender;
		
		if (this.props.params.name === "mobile") {
			pageRender = <Contacts />;
		} else {
			pageRender = <Extensions />;
		}

		return (
			<div>
				<div className="nav contacts-nav">
					<div>Forward to</div>
					<ul>
						<li>
							<Link activeClassName="active" to="/contacts/mobile">Mobile</Link>
						</li>
						<li>
							<Link activeClassName="active" to="/contacts/extensions">Extensions</Link>
						</li>
					</ul>
				</div>
				
				{pageRender}

				{this.props.children}
			</div>
		);
	}
}

module.exports = ContactPage;