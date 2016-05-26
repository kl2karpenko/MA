import React, { Component } from 'react';
import { Link } from 'react-router';

import Item from './list/Item.jsx';

import Dialplans from "models/Dialplans";

export default class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dialplans: Dialplans.Model
		};
	}

	componentWillMount() {
		Dialplans.update();

		this.setState({
			dialplans: Dialplans.Model
		});
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="m-list m-list-dialplan">
					{this.state.dialplans.map(function(object, i){
						return <Item dialplan={object} key={i} />;
					})}
				</div>
			</div>
		);
	}
}