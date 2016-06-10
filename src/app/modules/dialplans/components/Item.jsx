import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

import imageLoader from 'lib/imageLoader';

import Dialplan from "models/Dialplan";
import DialplanList from "models/DialplanList";

import Personal from './item/Personal.jsx';
import Company from './item/Company.jsx';

class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplan: "",
			previous: "",
			next: "",
			previousClass: "",
			nextClass: ""
		};
	}

	componentWillMount() {
		this._changePreviousAndNextState();
	}

	_changePreviousAndNextState() {
		console.log(DialplanList.getCurrent())
		let
			prevURL = DialplanList.getPreviousUrl(),
			nextURL = DialplanList.getNextUrl();

		console.log(" =============== URLS ==================", prevURL, nextURL);

		this.setState({
			previous: prevURL,
			next: nextURL,
			Dialplan: Dialplan.getModel(),
			previousClass: !prevURL ? ' disabled' : '',
			nextClass: !nextURL ? ' disabled' : ''
		});
	}

	renderDialplan(dialplan) {
		let dialplanCurrent = DialplanList['get' + dialplan]();

		DialplanList.setCurrent(dialplanCurrent);
		Dialplan.assignAttributes(dialplanCurrent);

		this._changePreviousAndNextState();
		hashHistory.push(DialplanList.getCurrentUrl());

		// TODO: every time update data for dialplans on render it updateModelWithAttributes() from Model
	}

	render() {
		console.log(this.state, DialplanList.getNextUrl(), DialplanList.getPreviousUrl());

		return (
			<div className="l-adaptive-wrapper">
				<div className="l-adaptive l-fixed">
					<div className="m-angle">
						<div className="m-angle-wrapper">
							<div className="m-angle-content">
								<div className="m-angle-top">
									<div className="m-angle-name">
										Call Routing
									</div>
									<Link className="m-angle-settings" to="/settings">
										<img src={imageLoader(require("images/icons/nav-list.png"))} alt="Qr background"/>
									</Link>
								</div>

								<div className="m-angle-info">
									<div className="m-angle-info-photo">
										<img className="img-responsive img-circle" src={imageLoader(require("images/photo-placeholder.png"))} alt="Photo"/>
									</div>
									<div className="m-angle-info-text">
										<h2>
											{this.state.Dialplan.title}
										</h2>
										<p>
											{this.state.Dialplan.ex_number || this.state.Dialplan.in_number}
										</p>
									</div>
								</div>

								<div className="m-angle__arrows">
									<button className={"m-angle-arrow __left" + this.state.previousClass} onClick={this.renderDialplan.bind(this, 'Previous')}>
										<img className="img-responsive" src={imageLoader(require("images/icons/arrow-left.png"))} alt="Left"/>
									</button>
									<button className={"m-angle-arrow __right" + this.state.nextClass} onClick={this.renderDialplan.bind(this, 'Next')}>
										<img className="img-responsive" src={imageLoader(require("images/icons/arrow-right.png"))} alt="Left"/>
									</button>
								</div>
							</div>

							<Link activeClassName="active" className="m-angle__button btn btn-round btn-sm btn-list" to="/dialplans/list">
								<img src={imageLoader(require("images/icons/list.png"))} alt="Right"/>
							</Link>
						</div>
					</div>

					{(() => {
						if (this.state.Dialplan.personal) {
							return <Personal dialplan={this.state.Dialplan}/>;
						} else {
							return <Company dialplan={this.state.Dialplan}/>;
						}
					})()}
				</div>
			</div>
		);
	}
}

module.exports = Item;