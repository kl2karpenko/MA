import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import Session from "models/Session";
import Dialplan from "models/Dialplan";
import Dialplans from "models/Dialplans";

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ready: false
		}
	}

	componentWillMount() {
		this
			._loadResources()
			.done(() => {
				Dialplans.setCurrent(Dialplans.getFirst());
				Dialplan.assignAttributes(Dialplans.getCurrent());

				this.setState({ ready: true });

				hashHistory.push(Dialplans.getUrl(Dialplans.getFirst()));
			});
	}

	_loadResources() {
		return Session
			._getSessionData()
			.then(Dialplans.load.bind(Dialplans));
	}

	render() {
		let Page;

		if (this.state.ready) {
			Page = this.props.children;
		}

		return (
			<div style={{height: "100%"}}>
				{Page}
			</div>
		);
	}
}