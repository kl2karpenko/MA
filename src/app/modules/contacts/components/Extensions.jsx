import React, { Component } from 'react';

import Extensions from "../models/Extensions";
import ListComponent from "components/list/Index.jsx";

function _configData(data) {
	return data.map((item) => {
		var obj = {};

		obj.number = item.in_number;
		obj.image = true;
		obj.title = item.name;

		return obj;
	});
}

export default class Contacts extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ListComponent
				model={Extensions}
				listClass="m-list-contacts"
				onClick={() => {console.log('click') }}
				configData={_configData}
				withImg={true}
			/>
		);
	}
}