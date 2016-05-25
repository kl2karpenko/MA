import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import Session from "models/Session";
import Dialplan from "models/Dialplan";
import Dialplans from "models/Dialplans";

class DialplanComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ready: false
		}
	}

	componentWillMount() {
		this
			._loadResources()
			.then(() => {
				if (Dialplans.getIndexOf(Dialplan.Model) == -1) {
					return this._addPersonalDialplan(Dialplan.Model);
				} else {
					return Dialplans.Model;
				}
			})
			.done((dialplansList) => {
				Dialplans.updateWithAttributes(dialplansList);
				console.log(dialplansList, Dialplans.getFirst());

				Dialplans.setCurrent(Dialplans.getFirst());

				this.setState({
					ready: true
				});

				hashHistory.push(Dialplans.getUrl(Dialplans.getFirst()));
			});
	}

	_addPersonalDialplan() {
		let listOfDialPlans = Dialplans.Model;
		console.log('_addPersonalDialplan')

		listOfDialPlans.unshift(Dialplan.Model);

		return listOfDialPlans;
	}

	_loadResources() {
		return Session
			._getSessionData()
			.then(() => {
				let { dialplan } = Session.Model.user;

				return Dialplan.load({
					id: dialplan.id
				});
			})
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

module.exports = DialplanComponent;