import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

import imageLoader from 'imageLoader';

import Dialplan from "../models/Dialplan";
import DialplanList from "../models/DialplanList";

import Personal from './item/Personal.jsx';
import Company from './item/Company.jsx';

import AdaptiveFixed from 'components/layouts/adaptive/IndexFixed.jsx';

import Angle from 'components/modules/angle/Index.jsx';
import AngleTop from 'components/modules/angle/Top.jsx';
import AngleInfo from 'components/modules/angle/InfoCenter.jsx';
import AngleArrows from 'components/modules/angle/Arrows.jsx';

export default class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplan: Dialplan.getModel(),
			previous: "",
			next: ""
		};

		this._loadDialplan = this._loadDialplan.bind(this);
		this._renderDialplan = this._renderDialplan.bind(this);
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
			Dialplan: Dialplan.getModel()
		});
	}

	_goTo(path) {
		this
			._save()
			.then(() => {
				hashHistory.push(path);
			});
	}

	_renderDialplan(event, e, a) {
		let activatePage = $(event.target).hasClass('next') ? 'next' : 'previous';

		this
			._save()
			.then(() => {
				DialplanList[activatePage]();
			})
			.then(this._loadDialplan);
	}

	render() {
		return (
			<AdaptiveFixed>
				<Angle header={false}>
					<div className="m-angle-content">

						<AngleTop title="Call Routing">
							<div className="m-angle-settings" onClick={this._goTo.bind(this, "/settings")}>
								<img src={imageLoader(require("images/icons/nav-list.png"))} alt="Qr background"/>
							</div>
						</AngleTop>

						<AngleInfo>
							<div className="m-angle-info-photo">
								<img className="img-responsive img-circle" src={imageLoader(require("images/photo-placeholder.png"))} alt="Photo"/>
							</div>
							<div className="m-angle-info-text">
								<h2> {this.state.Dialplan.title} </h2>
								<p> {this.state.Dialplan.ex_number || this.state.Dialplan.in_number} </p>
							</div>
						</AngleInfo>

						<AngleArrows
							previous={this.state.previous}
							next={this.state.next}
						  onClick={this._renderDialplan}
						/>
					</div>

					<button className="m-angle__button btn btn-round btn-sm btn-right" onClick={this._goTo.bind(this, "/dialplans/list")}>
						<img src={imageLoader(require("images/icons/list.png"))} alt="List of dialplans"/>
					</button>
				</Angle>

				{(() => {
					if (this.state.Dialplan.personal) {
						return <Personal dialplan={this.state.Dialplan}/>;
					} else {
						return <Company dialplan={this.state.Dialplan}/>;
					}
				})()}
			</AdaptiveFixed>
		);
	}
}