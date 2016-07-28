import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import Dialplan from "models/Dialplan";
import DialplanList from "../models/DialplanList";

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
		$(document).trigger('system:loading');
		this._init();
	}

	_config() {
		let
			currentIdOfDialplan = this.state.id || Dialplan.getValueByPath("_id"),
			currentIndex = DialplanList.getIndexOfItemById(currentIdOfDialplan);

		currentIndex = currentIndex !== -1 ? currentIndex : 0;

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
		$(document).trigger('system:loading');

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