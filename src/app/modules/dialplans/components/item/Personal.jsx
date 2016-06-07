import React, { Component } from 'react';

import PersonalActions from "../../models/PersonalActions";

export default class Personal extends Component {
	constructor(props) {
		super(props);

		this.actions = PersonalActions.getModel();
	}

	render() {
		return (
			<div className="l-main">
				<div className="l-main-scroll">
					<div className="l-dialplan__list l-main-content">
						<ul>
							{this.actions.map(function(object, i){
								return <li key={i} className={object.className}>
									<label htmlFor={object.value} className="radio-block">
										<input type="radio" name="personal" value={object.value} id={object.value}/>
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