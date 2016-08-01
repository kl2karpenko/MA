import React, { Component } from 'react';
import { hashHistory }      from 'react-router';

import Dialplan             from "models/Dialplan";
import DialplanList         from "models/DialplanList";

/** Import ================================================================== */

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: props.params.id
		};

		this._config = this._config.bind(this);
		this._goToActiveDialplan = this._goToActiveDialplan.bind(this);
	}

	componentDidMount() {
		this._init();
	}

	_config() {
		let
			currentIdOfDialplan = this.state.id || Dialplan.getValueByPath("_id"),
			currentIndex = DialplanList.getIndexOfItemById(currentIdOfDialplan);

		if (currentIndex === -1) {
			currentIndex = 0;
			currentIdOfDialplan = DialplanList.getValueOfDefAttrByIndex(currentIndex);
		}

		DialplanList.updateState({
			activePage: currentIndex + 1
		});

		return {
			id: currentIdOfDialplan,
			index: currentIndex
		}
	}

	_goToActiveDialplan() {
		hashHistory.replace(DialplanList.getUrl());
	}

	_init() {
		DialplanList
			.load()
			.then(this._config.bind(this))
			.then((options) => {
				DialplanList.updateState({
					activePage: options.index + 1
				});

				let id = options.id || DialplanList.getValueOfDefAttrByIndex(options.index);

				if (id === Dialplan.getValueByPath('_id')) {
					this._goToActiveDialplan();
				} else {
					return Dialplan
						.load({
							id: id
						})
						.done(this._goToActiveDialplan)
						.then(() => {
							$(document).trigger('system:loaded');
						});
				}
			});
	}

	render() {
		return this.props.children;
	}
}