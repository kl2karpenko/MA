import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import Dialplan from "models/Dialplan";
import DialplanList from "../models/DialplanList";

import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			id: props.params.id
		};

		this._init();

		this._config = this._config.bind(this);
		this._goToActiveDialplan = this._goToActiveDialplan.bind(this);
	}

	_config() {
		let
			currentIdOfDialplan = this.state.id || Dialplan.getValueByPath("_id"),
			currentIndex = DialplanList.getIndexOfItemByDefAttrValue(currentIdOfDialplan);

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
		this.setState({
			loading: false
		});

		hashHistory.replace(DialplanList.getUrl())
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
					Dialplan
						.load({
							id: id
						})
						.done(this._goToActiveDialplan);
				}
			})
	}

	render() {
		return (
			<AdaptiveWrapper>
				{!this.state.loading && this.props.children}
			</AdaptiveWrapper>
		);
	}
}