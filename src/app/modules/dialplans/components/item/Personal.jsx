import React, { Component } from 'react';

import PersonalActions      from "../../models/actions/Personal";
import Follow               from './actions/Follow.jsx';

import Dialplan             from "models/Dialplan";

/** Import ================================================================== */

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

	onChange() {
		this._updateDialplan();
	}

	_updateDialplan() {
		this.setState({
			Dialplan: Dialplan.getModel()
		});
	}

	render() {
		let actionsList = this.state.actions;
		let mailboxDisabled = !Dialplan.isMailBoxEnabled();

		if (mailboxDisabled) {
			actionsList = actionsList.filter((item) => {
				if (item.name === "mailbox") {
					return false;
				}

				return item;
			});
		}

		return (
			<div className="l-main">
				<div className="l-main-scroll">
					<div className="l-dialplan__list l-main-content">
						<ul>
							{actionsList.map((object, i) => {
								return <Follow
									personal={true}
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