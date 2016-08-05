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
			actions: PersonalActions.getModel(),
			enableMailbox: Dialplan.getValueByPath("mailbox_enabled")
		};

		console.log(this.state.enableMailbox, Dialplan.getModel(), 'this.state.enableMailbox');
	}

	/* call on change props in parent scope */
	componentWillReceiveProps() {
		this.setState({
			Dialplan: Dialplan.getModel(),
			enableMailbox: Dialplan.getValueByPath("mailbox_enabled")
		});
	}

	onChange() {
		this._updateDialplan();
	}

	_updateDialplan() {
		this.setState({
			Dialplan: Dialplan.getModel(),
			enableMailbox: Dialplan.getValueByPath("mailbox_enabled")
		});
	}

	render() {
		let actionsList = [];
		let mailboxDisabled = !this.state.enableMailbox;

		if (mailboxDisabled) {
			actionsList = this.state.actions.map((item) => {
				if (item.name === "mailbox") { return false; }

				return item;
			});

			actionsList = actionsList.filter((item) => {
				return item || false;
			});
		} else {
			actionsList = this.state.actions;
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