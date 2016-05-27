import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

import imageLoader from 'lib/imageLoader';

import Dialplans from "models/Dialplans";
import Dialplan from "models/Dialplan";

class DialpanListItem extends Component {
	constructor(props) {
		super(props);

		this.state = props.dialplan;
	}

	goToItem(index) {
		Dialplans
			.setCurrent(Dialplans.Model[index]);

		Dialplan
			.assignAttributes(Dialplans.getCurrent());

		hashHistory
			.push(Dialplans.getCurrentUrl());
	}

	render() {
		return (
			<div className="m-list-item clearfix" onClick={this.goToItem.bind(this, this.props.index)}>
				<img className="img-circle pull-left" src={imageLoader(require("images/photo-placeholder.png"))} alt="Qr background"/>
				<div className="m-list-info">
					<h3 className="m-list-name">{this.state.title}</h3>
					<div className="m-list-phone">{this.state.ex_number || this.state.in_number}</div>
				</div>
			</div>
		);
	}
}

module.exports = DialpanListItem;