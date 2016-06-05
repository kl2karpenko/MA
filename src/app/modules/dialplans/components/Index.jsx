import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import Session from "models/Session";
import Dialplan from "models/Dialplan";
import Dialplans from "models/Dialplans";

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoaded: false
		};
	}

	componentWillMount() {
		this
			._loadResources()
			.done(() => {
				let
					currentIdOfDialplan = this.props.params.id,
					currentDialplan = Dialplans.getFirst();

				if (currentIdOfDialplan) {
					currentDialplan = Dialplans.findByField("_id", currentIdOfDialplan)
				}

				Dialplans
					.setCurrent(currentDialplan);

				Dialplan
					.assignAttributes(currentDialplan);

				this.setState({
					isLoaded: true
				});

				hashHistory.replace(Dialplans.getUrl(currentDialplan));
			});
	}

	_loadResources() {
		return Session
			._getSessionData()
			.then(Dialplans.load.bind(Dialplans));
	}

	render() {
		return (
			<div style={{height: "100%"}}>
				{(() => {
					if (this.state.isLoaded) {
						return this.props.children;
					} else {
						// TODO: create loader!!!!!!! for when load smth add it to screen
						return <div>Loading</div>;
					}
				})()}
			</div>
		);
	}
}