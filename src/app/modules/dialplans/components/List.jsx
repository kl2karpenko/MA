import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import ListComponent from "components/list/Index.jsx";

import DialplanList from "../models/DialplanList";
import Dialplan from "../models/Dialplan";

function _configData(data) {
	return data.map((item) => {
		var obj = {};

		obj.number = item.ex_number || item.in_number;
		obj.image = true;
		obj.title = item.title;

		return obj;
	});
}

export default class List extends Component {
	constructor(props) {
		super(props);

		this.renderDialplanBy = this.renderDialplanBy.bind(this);
	}

	renderDialplanBy(index) {
		DialplanList.updateState({
			activePage: index + 1
		});

		Dialplan.load({
			id: DialplanList.getValueOfDefAttrByIndex(index)
		}).then(() => {
			hashHistory.push(DialplanList.getUrl());
		});
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="m-list m-list-dialplan m-list-withImg">
					<ListComponent
						model={DialplanList}
						listClass="m-list-dialplans"
						onClick={this.renderDialplanBy}
						configData={_configData}
					/>
				</div>
			</div>
		);
	}
}