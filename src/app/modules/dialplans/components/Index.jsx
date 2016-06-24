import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import Dialplan from "../models/Dialplan";
import DialplanList from "../models/DialplanList";

import Loader from 'components/layouts/Loader.jsx';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};

		this._init();
	}

	_init() {
		DialplanList
			.load()
			.then(() => {
				let
					currentIdOfDialplan = this.props.params.id,
					currentIndex = DialplanList.getIndexOfItemByDefAttrValue(currentIdOfDialplan);

				currentIndex = currentIndex !== -1 ? currentIndex : 0;

				DialplanList.updateState({
					activePage: currentIndex + 1
				});

				return Dialplan.load({
					id: currentIdOfDialplan
							|| DialplanList.getValueOfDefAttrByIndex( currentIndex )
				});
			})
			.done(() => {
				this.setState({
					loading: false
				});

				hashHistory.replace(DialplanList.getUrl())
			});
	}

	render() {
		return (
			<AdaptiveWrapper>
				{(() => {
					if (!this.state.loading) {
						return this.props.children;
					} else {
						return <Loader/>;
					}
				})()}
			</AdaptiveWrapper>
		);
	}
}