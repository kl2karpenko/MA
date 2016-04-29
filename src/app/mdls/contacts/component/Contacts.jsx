import React from 'react';
import { Link } from 'react-router';

import envConfig from 'envConfig';
import ContactItem from './ContactItem.jsx';

function _getContacts(contacts, cb) {
	return envConfig.routesData.contacts(contacts, cb);
}

export default class Contacts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contacts: []
		};

		_getContacts(navigator.contactsPhoneNumbers, (contactsList) => {
			this.setState({
				contacts: contactsList
			});
		}).bind(this);
	}

	render() {
		var contacts = [];

		this.state.contacts.forEach((contactItem) => {
			// TODO: refactor this logic add to function eg: "formatDataForNumbers"
			contacts.push(<ContactItem name={contactItem.displayName} phone={contactItem.phoneNumbers[0].normalizedNumber} key={contactItem.id}/>);
		});

		return (
			<div>
				<h1>
					List of contacts from users phone
				</h1>

				<ul>
					{ contacts }
				</ul>

				<Link activeClassName="active" to="/">Main</Link>
			</div>
		);
	}
}