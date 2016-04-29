import React from 'react';
import { Link } from 'react-router';

import $ from 'jquery';

import envConfig from 'envConfig';

import ContactItem from './ContactItem.jsx';

export default class Extensions extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: []
		};

		this._getExtensionsList();
	}

	_getExtensionsList() {
		$.get(envConfig.routesData.users, (usersData) => {
			let users = usersData.users.map((userItem) => {
				return {
					id: userItem._id,
					name: userItem.first_name + ' ' + userItem.second_name,
					phone: userItem.caller_id
				}
			});

			this.setState({
				users: users
			});
		});
	}

	render() {
		var users = [];

		this.state.users.forEach((contactItem) => {
			users.push(<ContactItem name={contactItem.name} phone={contactItem.phone} key={contactItem.id}/>);
		});

		return (
			<div>
				<h1>
					List of contacts from users phone
				</h1>

				{users}

				<Link activeClassName="active" to="/contacts/pin">Connect by PIN code</Link>
			</div>
		);
	}
}