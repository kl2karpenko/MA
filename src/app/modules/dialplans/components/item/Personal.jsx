import React, { Component } from 'react';

import Dialplan from "models/Dialplan";

export default class Personal extends Component {
	constructor(props) {
		super(props);

		this.actions = [
			{
				name: "Follow original dialplan",
				info: "",
				className: "",
				value: "original"
			},
			{
				name: "Forward to my mobile",
				info: "+38093 403 23 79",
				className: "",
				value: "mobile"
			},
			{
				name: "Forward to my voicemail",
				info: "",
				className: "",
				value: "voicemail"
			},
			{
				name: "Forward to",
				info: "Tap to choose a contact",
				className: "with-search",
				value: "contact"
			}
		];
	}

	render() {
		return (
			<div className="l-main">
				<div className="l-dialplan">
					<div className="l-dialplan__list">
						<ul>
							{this.actions.map(function(object, i){
								return <li key={i} className={object.className}>
									<label htmlFor={object.value}>
										<input type="radio" name="personal" value={object.value} id={object.value}/>
										<div className="l-dialplan-radio"></div>
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