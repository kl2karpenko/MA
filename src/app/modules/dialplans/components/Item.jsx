import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

import imageLoader from 'imageLoader';

import Tappable from 'react-tappable';

import Dialplan from "models/Dialplan";
import DialplanList from "../models/DialplanList";

import Personal from './item/Personal.jsx';
import Company from './item/Company.jsx';

import AdaptiveFixed from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

import Angle from 'components/modules/angle/Index.jsx';
import AngleTop from 'components/modules/angle/Top.jsx';
import AngleInfo from 'components/modules/angle/InfoCenter.jsx';
import AngleArrows from 'components/modules/angle/Arrows.jsx';

export default class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplan: Dialplan.getModel(),
			previous: DialplanList.getPreviousPage(),
			next: DialplanList.getNextPage()
		};

		this._loadDialplan = this._loadDialplan.bind(this);
		this._renderDialplan = this._renderDialplan.bind(this);
	}

	componentWillMount() {
		this._changeState();
	}

	_loadDialplan() {
		$(document).trigger('system:loading');

		return Dialplan
			.load({
				id: DialplanList.getValueOfDefAttrByIndex(DialplanList.getActivePage() - 1)
			})
			.then(() => {
				this._changeState();

				hashHistory.push(DialplanList.getUrl());
				$(document).trigger('system:loaded');
			});
	}

	_changeState() {
		this.setState({
			previous: DialplanList.getPreviousPage(),
			next: DialplanList.getNextPage(),
			Dialplan: Dialplan.getModel()
		});
	}

	_renderDialplan(event) {
		let activatePage = ($(event.target).hasClass('next') || $(event.target).hasClass('__right')) ? 'next' : 'previous';

		DialplanList[activatePage]();
		this._loadDialplan();
	}

	static _goToSettings() {
		hashHistory.push("/settings");
	}

	render() {
		return (
		<AdaptiveWrapper>
			<Angle header={false}>
				<div className="m-angle-content">

					<AngleTop title="Call Routing">
						<Tappable
							pressDelay={500}
							component="a"
							className="m-angle-settings"
							onTap={Item._goToSettings}
							>
							<img src={imageLoader(require("images/icons/nav-list.png"))} alt="Qr background"/>
						</Tappable>
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

				<Link className="m-angle__button btn btn-round btn-sm btn-right" to="/dialplans/list">
					<img src={imageLoader(require("images/icons/list.png"))} alt="List of dialplans"/>
				</Link>
			</Angle>
			<AdaptiveFixed class={DialplanList.getState().pagesCount <= 1 ? "dialplans-only" : ""}>
				{this.state.Dialplan.personal ? <Personal/> : <Company/>}
			</AdaptiveFixed>
		</AdaptiveWrapper>
		);
	}
}