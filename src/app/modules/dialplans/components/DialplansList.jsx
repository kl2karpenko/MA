import React, { Component } from 'react';
import { Link } from 'react-router';

import DialpanListItem from './items/DialplanListItem.jsx';

import Dialplans from "models/Dialplans";

class DialplansList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dialplans: Dialplans.Model
		};
	}

	render() {
		console.log(Dialplans);

		return (
			<div className="l-adaptive">
				<div className="m-list m-list-dialplan">
					{this.state.dialplans.map(function(object, i){
						return <DialpanListItem dialplan={object} key={i} />;
					})}
				</div>
			</div>
		);
	}
}

module.exports = DialplansList;