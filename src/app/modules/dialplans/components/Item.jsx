import React, { Component }   from 'react';
import { hashHistory }        from 'react-router';

import imageLoader            from 'imageLoader';

import Tappable               from 'react-tappable';
import Swipeable              from "react-swipeable";

import Dialplan               from "models/Dialplan";
import DialplanList           from "models/DialplanList";
import PhoneNumber            from "models/PhoneNumber";

import InputOnKeyDown         from 'components/inputs/InputOnKeyDown.jsx';

import Personal               from './item/Personal.jsx';
import Company                from './item/Company.jsx';

import AdaptiveFixed          from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper        from 'components/layouts/adaptive/Wrapper.jsx';

import Angle                  from 'components/modules/angle/Index.jsx';
import AngleTop               from 'components/modules/angle/Top.jsx';
import AngleInfo              from 'components/modules/angle/InfoCenter.jsx';
import AngleArrows            from 'components/modules/angle/Arrows.jsx';
import LinkButton             from 'components/buttons/LinkButton.jsx';

import { $t }                 from 'lib/locale';
import config                 from 'envConfig';

import ReactCSSTransitionGroup  from 'react/lib/ReactCSSTransitionGroup';

/** Import ================================================================== */

export default class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplan: Dialplan.getModel(),
			accessOnlyPersonal: DialplanList.getModel().length === 1,
			previous: DialplanList.getPreviousPage(),
			next: DialplanList.getNextPage(),
			loading: false,
			enterTransitionName: "visibility-pages",
			isPersonal: Dialplan.getValueByPath("personal"),
			isVisiblePhoneModal: false,
			phoneValue: PhoneNumber.getModel().value,
			phoneValueIsValid: true
		};

		this.isSwiping = false;

		this._loadDialplan = this._loadDialplan.bind(this);
		this._renderDialplan = this._renderDialplan.bind(this);

		this.closeModalForPhoneNumber = this.closeModalForPhoneNumber.bind(this);
		this.openModalForPhoneNumber = this.openModalForPhoneNumber.bind(this);
		this.savePhoneNumber = this.savePhoneNumber.bind(this);
	}

	componentDidMount() {
		this._changeState();
	}

	closeModalForPhoneNumber() {
		this.setState({
			isVisiblePhoneModal: false,
			phoneValue: "",
			phoneValueIsValid: true
		});
	}

	openModalForPhoneNumber() {
		this.setState({
			isVisiblePhoneModal: true,
			phoneValueIsValid: true
		});

		this.refs["inputPhone"].focus();
	}

	savePhoneNumber(inputValue) {
		if (inputValue.target) {
			inputValue = inputValue.target.value;
		}

		this.setState({
			phoneValue: inputValue,
			phoneValueIsValid: !!inputValue
		});
	}

	_loadDialplan() {
		return Dialplan
			.load({
				id: DialplanList.getValueOfDefAttrByIndex(DialplanList.getActivePage() - 1)
			})
			.then(() => {
				this._changeState();

				hashHistory.replace(DialplanList.getUrl());
				this.setState({
					loading: false
				});
			});
	}

	_changeState() {
		this.setState({
			previous: DialplanList.getPreviousPage(),
			next: DialplanList.getNextPage(),
			Dialplan: Dialplan.getModel(),
			accessOnlyPersonal: DialplanList.getModel().length === 1,
			isPersonal: Dialplan.getValueByPath("personal")
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
		hashHistory.replace("/settings");
	}

	render() {
		let modalForPhone = "";

		let InputRender = <InputOnKeyDown
			ref="inputPhone"
			type="number"
			onChange={this.savePhoneNumber}
			value={this.state.phoneValue}
			name="phoneNumber"
			className="form-control"
			style={!this.state.phoneValueIsValid ? {"border": "red"} : {}}
		/>;

		if (!config.process.isIOS()) {
			InputRender = <input
				autoFocus="true"
				ref="inputPhone"
				type="number"
				onChange={this.savePhoneNumber}
				value={this.state.phoneValue}
				name="phoneNumber"
				className="form-control"
				style={!this.state.phoneValueIsValid ? {"border": "red"} : {}}
			/>;
		}

		modalForPhone = <div id="myModal" className={"modal fade" + (this.state.isVisiblePhoneModal ? " in" : "")} role="dialog">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-body">
						<h4 className="modal-title">{$t("phone.title")}</h4>

						<div className="form-group">
							{InputRender}
						</div>
					</div>
					<div className="modal-footer">
						<Tappable
							component="button"
							type="button"
							className="btn btn-success"
							onTap={() => {
							  if (this.state.phoneValueIsValid) {
									PhoneNumber.updateAttributesFor("value", this.state.phoneValue);

									PhoneNumber.save()
										.then(() => {
											this.closeModalForPhoneNumber();
											$(document).trigger('forward:phone');
										});
							  }
						  }}
						>{$t("ok")}</Tappable>
						<Tappable
							component="button"
							type="button"
							className="btn btn-default"
							onTap={this.closeModalForPhoneNumber}
						>{$t("cancel")}</Tappable>
					</div>
				</div>
			</div>
		</div>;

		return (
			<ReactCSSTransitionGroup
				key={"dialplan-page-" + Dialplan.getValueByPath("_id")}
				transitionName = {this.state.enterTransitionName}
				transitionAppear = {true}
				transitionAppearTimeout = {300}
				transitionEnter = {true}
				transitionEnterTimeout = {300}
				transitionLeaveTimeout = {300}
				transitionLeave = {true}
			>
			<Swipeable
				className="swipeable"
				onSwipingRight={() => {
					clearTimeout(this.isSwiping);
					
					this.isSwiping = setTimeout(() => {
						if (this.state.previous && !this.state.loading) {
							this.isSwiping = false;
							this._renderDialplan('previous');
						}
					}, 50);
				}}
				onSwipingLeft={() => {
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
								component="a"
								className="m-angle-settings"
								onTap={Item._goToSettings}
								>
								<img
									src={imageLoader(require("images/icons/nav-list.svg"))}
									onClick={(e) => {
										e.stopPropagation();
									}}
									alt="Qr background"
								/>
							</Tappable>
						</AngleTop>

						<AngleInfo>
							<div className="m-angle-info-photo">
								<img
									className="img-responsive img-circle"
									src={imageLoader(require(this.state.isPersonal ?
									"images/placeholder/extension.png" :
									"images/placeholder/dialplan-white.svg"
									))}
									alt="Photo"
								/>
							</div>
							<div className="m-angle-info-text">
								<h2> {this.state.Dialplan.title} </h2>
								<p> {this.state.Dialplan.ex_number || this.state.Dialplan.in_number} </p>
							</div>
						</AngleInfo>

						{(() => {
							if (!this.state.accessOnlyPersonal) {
								return <AngleArrows
									previous={this.state.previous}
									next={this.state.next}
									onClick={this._renderDialplan}
								/>;
							}
						})()}
					</div>

					{(() => {
						if (!this.state.accessOnlyPersonal) {
							return <LinkButton
								component="a"
								className="m-angle__button btn btn-round btn-sm btn-right"
								text={<img src={imageLoader(require("images/icons/list.svg"))} alt="List of dialplans"/>}
								href="/dialplans/list"/>;
						}
					})()}
				</Angle>
				<AdaptiveFixed class={DialplanList.getState().pagesCount <= 1 ? "dialplans-only" : ""}>
					{this.state.isPersonal ? <Personal
						parentScope={this}
					/> : <Company
						parentScope={this}
					/>}
				</AdaptiveFixed>
				{modalForPhone}
			</AdaptiveWrapper>
		</Swipeable>
		</ReactCSSTransitionGroup>
		);
	}
}