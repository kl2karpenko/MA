import React, {Component} from 'react';
import { hashHistory } from 'react-router';

import MailboxesList from "../models/MailboxesList";
import ListComponent from "components/list/Index.jsx";

function _configData(data) {
	return data.map((item) => {
		var obj = {};

		obj.number = item.number;
		obj.image = false;
		obj.color = item.color;
		obj.title = item.name;

		return obj;
	});
}

export default class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="l-adaptive-wrapper">
				<div className="l-adaptive l-adaptive-sm l-fixed l-mailbox">
					<div className="m-angle">
						<div className="m-angle-wrapper">
							<div className="m-angle-content">
								<div className="m-angle-top">
									<div className="m-angle-name">
										Forward to:
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="l-main">
						<div className="l-main-scroll">
							<ListComponent
								model={MailboxesList}
								listClass="m-list-mailbox"
								onClick={() => {console.log('click') }}
								configData={_configData}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}