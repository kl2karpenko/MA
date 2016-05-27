import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

import imageLoader from 'lib/imageLoader';

import Dialplans from "models/Dialplans";
import Dialplan from "models/Dialplan";

import Personal from './item/Personal.jsx';
import Company from './item/Company.jsx';

class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplans: Dialplans,
			Dialplan: Dialplan,
			previous: "",
			next: ""
		};
	}

	componentWillMount() {
		this._changePreviousAndNextState();
	}

	_changePreviousAndNextState() {
		this.setState({
			previous: Dialplans.getPreviousUrl(),
			next: Dialplans.getNextUrl(),
			Dialplan: Dialplan
		});
	}

	renderDialplan(dialplan) {
		let currentDialplan = Dialplans.setCurrent(Dialplans['get' + dialplan]());

		Dialplan.assignAttributes(currentDialplan);

		this._changePreviousAndNextState();
		hashHistory.push(Dialplans.getCurrentUrl());
	}

	static _getButtonClass(url) {
		return !url ? ' disabled' : '';
	}

	render() {
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
											{this.state.Dialplan.Model.title}
										</h2>
										<p>
											{this.state.Dialplan.Model.ex_number || this.state.Dialplan.Model.in_number}
										</p>
									</div>
								</div>

								<div className="m-angle__arrows">
									<button className={"m-angle-arrow __left" + Item._getButtonClass(this.state.previous)} onClick={this.renderDialplan.bind(this, 'Previous')}>
										<img className="img-responsive" src={imageLoader(require("images/icons/arrow-left.png"))} alt="Left"/>
									</button>
									<button className={"m-angle-arrow __right" + Item._getButtonClass(this.state.next)} onClick={this.renderDialplan.bind(this, 'Next')}>
										<img className="img-responsive" src={imageLoader(require("images/icons/arrow-right.png"))} alt="Left"/>
									</button>
								</div>
							</div>

							<Link activeClassName="active" className="m-angle__button btn-round btn-sm btn-settings" to="/dialplans/list">
								<img src={imageLoader(require("images/icons/list.png"))} alt="Right"/>
							</Link>
						</div>
					</div>

					{(() => {
						if (this.state.Dialplan.Model.personal) {
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