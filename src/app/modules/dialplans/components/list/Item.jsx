import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import imageLoader from 'imageLoader';

import DialplanList from "../../models/DialplanList";
import Dialplan from "../../models/Dialplan";

class DialplanListItem extends Component {
	constructor(props) {
		super(props);

		this.state = props.dialplan;

		this.goToItem = this.goToItem.bind(this);
	}

	goToItem() {
		DialplanList.updateState({
			activePage: this.props.index + 1
		});

		Dialplan.load({
			id: DialplanList.getValueOfDefAttrByIndex(this.props.index)
		}).then(() => {
			hashHistory.push(DialplanList.getUrl());
		});
	}

	render() {
		return (
			<div className="m-list-item clearfix" onClick={this.goToItem.bind(this)}>
				<div className="m-list-item-wrap clearfix">
					<img className="img-circle pull-left" src={imageLoader(require("images/photo-placeholder.png"))} alt="Qr background"/>
					<div className="m-list-info">
						<h3 className="m-list-name">{this.state.title}</h3>
						<div className="m-list-phone">{this.state.ex_number || this.state.in_number}</div>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = DialplanListItem;