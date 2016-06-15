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
			.then(() => {
				let
					currentIdOfDialplan = this.props.params.id,
					currentIndex = DialplanList.getIndexOfItemByDefAttrValue(currentIdOfDialplan);

				currentIndex = currentIndex !== -1 ? currentIndex : 0;

				DialplanList.updateState({
					activePage: currentIndex + 1
				});

				return Dialplan.load({
					id: currentIdOfDialplan || DialplanList.getValueOfDefAttrByIndex( currentIndex )
				});
			})
			.done(() => {
				this.setState({
					loading: false
				});

				hashHistory.replace(DialplanList.getUrl())
			});
	}

	_loadResources() {
		return Session
			._getSessionData()
			.then(DialplanList.load.bind(DialplanList))
	}

	render() {
		return (
			<div style={{height: "100%"}}>
				{(() => {
					if (!this.state.loading) {
						return this.props.children;
					} else {
						// TODO: create loader!!!!!!! add it to different file
						return <div className="app-loadBlock"></div>;
					}
				})()}
			</div>
		);
	}
}