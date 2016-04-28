import React from 'react';
import { Link } from 'react-router';

class MobileContact extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<li>
				{this.props.name} - {this.props.phone}
			</li>
		);
	}
}

export default class MobileContacts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contacts: []
		};

		this._getContacts();
	}

	_getContacts() {
		let options = {
			filter: "",
			multiple: true
		};

		console.log('get contacts');
		navigator.contacts.find([navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.phoneNumbers], function(listContacts) {
			console.log(listContacts);
			console.log('end of get contacts');

			listContacts = listContacts.filter(function(contactItem) {
				return contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contactItem : false
			});

			console.log(listContacts);

			this.setState({
				contacts: listContacts
			});
		}.bind(this), null, options);
	}

	render() {
		return (
			<div>
				<h1>
					List of contacts from users phone
				</h1>

				<ul>
					{this.state.contacts.forEach(function(contactItem) {
						return <MobileContact name={contactItem.displayName} phone={contactItem.phoneNumbers[0].value}/>
					})}
				</ul>
				<Link activeClassName="-active" to="/">Main</Link>
			</div>
		);
	}
}