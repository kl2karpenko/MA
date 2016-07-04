import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import PersonalActions from "../../models/actions/Personal";
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
		switch(object.name) {
			case "contact":
				let contact = Dialplan.getValueByPath('follow.contact');

				if (contact.value.number) {
					Dialplan._followTo("contact", contact.value);
				} else {
					hashHistory.push('/contacts');
				}
				break;
			case "mobile":
				Dialplan._followTo("mobile", {
					number: object.info
				});
				break;
			default:
				Dialplan._followTo(object.name);
				break;
		}

		this._updateDialplan();
	}

	_updateDialplan() {
		this.setState({
			Dialplan: Dialplan.getModel()
		});
	}

	render() {
		return (
			<div className="l-main">
				<div className="l-main-scroll">
					<div className="l-dialplan__list l-main-content">
						<ul>
							{this.state.actions.map((object, i) => {
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