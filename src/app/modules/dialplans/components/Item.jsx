import React, { Component }   from 'react';
import { Link, hashHistory }  from 'react-router';

import imageLoader            from 'imageLoader';

import Tappable               from 'react-tappable';
import Swipeable              from "react-swipeable";

import Dialplan               from "models/Dialplan";
import DialplanList           from "models/DialplanList";

import Personal               from './item/Personal.jsx';
import Company                from './item/Company.jsx';

import AdaptiveFixed          from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper        from 'components/layouts/adaptive/Wrapper.jsx';

import Angle                  from 'components/modules/angle/Index.jsx';
import AngleTop               from 'components/modules/angle/Top.jsx';
import AngleInfo              from 'components/modules/angle/InfoCenter.jsx';
import AngleArrows            from 'components/modules/angle/Arrows.jsx';

import { $t }                 from 'lib/locale';

/** Import ================================================================== */

export default class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplan: Dialplan.getModel(),
			previous: DialplanList.getPreviousPage(),
			next: DialplanList.getNextPage(),
			loading: false
		};

		this.isSwiping = false;

		this._loadDialplan = this._loadDialplan.bind(this);
		this._renderDialplan = this._renderDialplan.bind(this);
	}

	componentWillMount() {
		this._changeState();
	}

	_loadDialplan() {
		return Dialplan
			.load({
				id: DialplanList.getValueOfDefAttrByIndex(DialplanList.getActivePage() - 1)
			})
			.then(() => {
				this._changeState();

				hashHistory.push(DialplanList.getUrl());
				this.setState({
					loading: false
				});
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
		this.setState({
			loading: true
		});

		let activatePage;
		if (event.target) {
			activatePage = ($(event.target).hasClass('next') || $(event.target).hasClass('__right')) ? 'next' : 'previous';
		} else {
			activatePage = event;
		}

		DialplanList[activatePage]();
		this._loadDialplan();
	}

	static _goToSettings() {
		hashHistory.push("/settings");
	}

	render() {
		return (
			<Swipeable
				className="swipeable"
				onSwipingRight={(e, swipeX) => {
					clearTimeout(this.isSwiping);
					
					this.isSwiping = setTimeout(() => {
						if (this.state.previous && !this.state.loading) {
							this.isSwiping = false;
							this._renderDialplan('previous');
						}
					}, 50);
				}}
				onSwipingLeft={(e, swipeX) => {
					clearTimeout(this.isSwiping);

					this.isSwiping = setTimeout(() => {
						if (this.state.next && !this.state.loading) {
							this.isSwiping = false;
							this._renderDialplan('next');
						}
					}, 50);
				}}
				flickThreshold={0.1}
			>
			<AdaptiveWrapper>
				<Angle header={false}>
					<div className="m-angle-content">

						<AngleTop title={$t("dialplans.call_routing")}>
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
		</Swipeable>
		);
	}
}