import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

import imageLoader from 'lib/imageLoader';

import Dialplan from "../models/Dialplan";
import DialplanList from "../models/DialplanList";

import Personal from './item/Personal.jsx';
import Company from './item/Company.jsx';

class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplan: Dialplan.getModel(),
			previous: "",
			next: "",
			previousClass: "",
			nextClass: ""
		};

		this._loadDialplan = this._loadDialplan.bind(this);
	}

	componentWillMount() {
		this._setState();
	}

	_save() {
		return Dialplan.save();
	}

	_loadDialplan() {
		return Dialplan
			.load({
				id: DialplanList.getValueOfDefAttrByIndex(DialplanList.getActivePage() - 1)
			})
			.then(() => {
				this._setState();

				hashHistory.push(DialplanList.getUrl());
			});
	}

	_setState() {
		let
			prevURL = DialplanList.getPreviousPage(),
			nextURL = DialplanList.getNextPage();

		this.setState({
			previous: prevURL,
			next: nextURL,
			Dialplan: Dialplan.getModel(),
			previousClass: !prevURL ? ' disabled' : '',
			nextClass: !nextURL ? ' disabled' : ''
		});
	}

	_goToPath(path) {
		this
			._save()
			.then(() => {
				hashHistory.push(path);
			});
	}

	_renderDialplan(activatePage) {
		this
			._save()
			.then(() => {
				DialplanList[activatePage]();
			})
			.then(this._loadDialplan);
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
									<div className="m-angle-settings" onClick={this._goToPath.bind(this, "/settings")}>
										<img src={imageLoader(require("images/icons/nav-list.png"))} alt="Qr background"/>
									</div>
								</div>

								<div className="m-angle-info">
									<div className="m-angle-info-photo">
										<img className="img-responsive img-circle" src={imageLoader(require("images/photo-placeholder.png"))} alt="Photo"/>
									</div>
									<div className="m-angle-info-text">
										<h2> {this.state.Dialplan.title} </h2>
										<p> {this.state.Dialplan.ex_number || this.state.Dialplan.in_number} </p>
									</div>
								</div>

								<div className="m-angle__arrows">
									<button className={"m-angle-arrow __left" + this.state.previousClass} onClick={this._renderDialplan.bind(this, 'previous')}>
										<img className="img-responsive" src={imageLoader(require("images/icons/arrow-left.png"))} alt="Left"/>
									</button>
									<button className={"m-angle-arrow __right" + this.state.nextClass} onClick={this._renderDialplan.bind(this, 'next')}>
										<img className="img-responsive" src={imageLoader(require("images/icons/arrow-right.png"))} alt="Left"/>
									</button>
								</div>
							</div>

							<button className="m-angle__button btn btn-round btn-sm btn-list" onClick={this._goToPath.bind(this, "/dialplans/list")}>
								<img src={imageLoader(require("images/icons/list.png"))} alt="Right"/>
							</button>
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