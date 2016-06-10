import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import Session from "models/Session";
import Dialplan from "models/Dialplan";
import DialplanList from "models/DialplanList";

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentWillMount() {
		this
			._loadResources()
			.done(() => {
				let
					currentDialplan = Index._getCurrentDialplan(this.props.params.id);

				Index._setCurrentDialplanFrom(currentDialplan);

				this.setState({
					loading: false
				});

				hashHistory.replace(DialplanList.getUrl(currentDialplan));
			});
	}

	static _setCurrentDialplanFrom(currentDialplan) {
		DialplanList
			.setCurrent(currentDialplan);

		Dialplan
			.assignAttributes(currentDialplan);
	}

	static _getCurrentDialplan(currentDialplanId) {
		if (!currentDialplanId) {
			return DialplanList.getFirst();
		}

		return DialplanList.findByField("_id", currentDialplanId);
	}

	_loadResources() {
		return Session
			._getSessionData()
			.then(DialplanList.load.bind(DialplanList));
	}

	render() {
		return (
			<div style={{height: "100%"}}>
				{(() => {
					if (!this.state.loading) {
						return this.props.children;
					} else {
						// TODO: create loader!!!!!!! for when load smth add it to screen
						return <div className="app-loadBlock"></div>;
					}
				})()}
			</div>
		);
	}
}