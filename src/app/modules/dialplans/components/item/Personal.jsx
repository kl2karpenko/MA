import React, { Component } from 'react';

import PersonalActions from "../../models/actions/PersonalActions";

export default class Personal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplan: props.dialplan
		};

		this.actions = PersonalActions.getModel();
	}

	/* call on change props in parent scope */
	componentWillReceiveProps(props) {
		this.setState({
			Dialplan: props.dialplan
		});
	}

	onChange(object) {
		var obj = {};

		obj[object.value] = true;

		this.state.Dialplan.follow = obj;

		this.setState({
			Dialplan: this.state.Dialplan
		});
	}

	render() {
		return (
			<div className="l-main">
				<div className="l-main-scroll">
					<div className="l-dialplan__list l-main-content">
						<ul>
							{this.actions.map((object, i) => {
								return <li key={i} className={object.className}>
									<label htmlFor={object.value} className="radio-block">
										<input
											type="radio"
											name="follow"
											value={object.value}
											checked={this.state.Dialplan.follow[object.value] ? "checked" : ""}
											id={object.value}
											onChange={this.onChange.bind(this, object)}
											/>
										<div className="radio-button"></div>
										<div className="l-dialplan-text">
											<div className="l-dialplan-name">{object.name}</div>
											<div className="l-dialplan-info">{object.info}</div>
										</div>
									</label>
								</li>;
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}