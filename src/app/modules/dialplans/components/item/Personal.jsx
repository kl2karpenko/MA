import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import PersonalActions from "../../models/actions/PersonalActions";
import Follow from './actions/Follow.jsx';

import Dialplan from "models/Dialplan";

export default class Personal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplan: Dialplan.getModel(),
			actions: PersonalActions.getModel()
		};
	}

	/* call on change props in parent scope */
	componentWillReceiveProps() {
		this.setState({
			Dialplan: Dialplan.getModel()
		});
	}

	onChange(object) {
		if(object.value === "contact") {
			this._forwardToContact();
		} else {
			Dialplan._followTo(object.value, true);
		}

		this._updateDialplan();
	}

	_updateDialplan() {
		this.setState({
			Dialplan: Dialplan.getModel()
		});
	}

	_forwardToContact() {
		hashHistory.push('/contacts');
	}

	render() {
		return (
			<div className="l-main">
				<div className="l-main-scroll">
					<div className="l-dialplan__list l-main-content">
						<ul>
							{this.state.actions.map((object, i) => {
								return <Follow
									key={i}
									options={object}
									onChange={this.onChange.bind(this, object)}
								/>;
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}