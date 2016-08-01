import React, { Component }   from 'react';
import { hashHistory }        from 'react-router';
import imageLoader            from 'imageLoader';

import ListComponent          from "components/list/Index.jsx";
import LinkButton             from 'components/buttons/LinkButton.jsx';

import DialplanList           from "models/DialplanList";
import Dialplan               from "models/Dialplan";

import Adaptive               from 'components/layouts/adaptive/Index.jsx';
import AdaptiveWrapper        from 'components/layouts/adaptive/Wrapper.jsx';

/** Import ================================================================== */

function _configData(data) {
	return data.map((item) => {
		var obj = {};

		obj.number = item.ex_number || item.in_number;
		obj.image = true;
		obj.name = item.title;

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
		<AdaptiveWrapper>
			<div className="dialplan-button">
				<LinkButton
					text={<img src={imageLoader(require("images/icons/cross-white-big.png"))} alt="Right"/>}
					component="a"
					className="m-angle__button btn btn-round btn-sm btn-right btn-round-grey"
					href={DialplanList.getUrl()}
				/>
			</div>
			<Adaptive class="dialplans">
				<div className="m-list m-list-dialplan m-list-withImg">
					<ListComponent
						model={DialplanList}
						listClass="m-list-dialplans"
						onClick={this.renderDialplanBy}
						configData={_configData}
					/>
				</div>
			</Adaptive>
		</AdaptiveWrapper>
		);
	}
}