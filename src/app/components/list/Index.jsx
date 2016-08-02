import React, { Component }     from 'react';

import Item                     from "./Item.jsx";

import ReactCSSTransitionGroup  from 'react/lib/ReactCSSTransitionGroup';

import { $t }                   from 'lib/locale';

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			model: props.model,
			list: props.model.getModel(),
			config: props.configData,
			searchQuery: props.search || "",
			loading: false
		};
	}

	componentDidMount() {
		this._load.bind(this)();
	}

	componentWillReceiveProps(newProps) {
		let
			searchString = newProps.search,
			updateState;

		if (searchString) {
			updateState = {
				config: newProps.configData,
				searchQuery: searchString,
				list: newProps.model.search(searchString, { by: ['name', 'number'] })
			};
			this.setState(updateState);
		}
	}

	_load() {
		if (this.state.loading) {
			return;
		}

		console.log(this.state.loading);

		this.setState({
			loading: true
		});

		return this.state.model
			.load()
			.then((data) => {
				let configData = this.state.config ?
					this.state.config(data[this.state.model._getModelName()]) : data[this.state.model._getModelName()];

				this.setState({
					model: this.state.model,
					list: configData,
					loading: false
				});
			});
	}

	render() {
		let items = this.state.list && this.state.list.map((object, i) => {
			return <ReactCSSTransitionGroup
				key={"list-" + (object._id || i)}
				transitionName = "visibility"
				transitionAppear = {true}
				transitionAppearTimeout = {300}
				transitionEnter = {true}
				transitionEnterTimeout = {300}
				transitionLeaveTimeout = {300}
				transitionLeave = {true}
			><Item
				data={object}
				model={this.state.model}
				key={"name-" + i}
				onClick={this.props.onClick.bind(this, i, object)}
				index={object._id || i}
			/></ReactCSSTransitionGroup>;
		});

		return (
			<div className={"m-list" + (this.props.listClass ? " " + this.props.listClass : "") + (this.props.withImg ? " m-list-withImg" : " m-list-withColor")}>
				{(() => {
					if (this.state.list && this.state.list.length) {
							return items;
					} else {
						return <ReactCSSTransitionGroup
							key={"list-empty"}
							transitionName = "visibility"
							transitionAppear = {true} transitionAppearTimeout = {500}
							transitionEnter = {false} transitionLeave = {false}
						><div className="permission-denied">{this.props.onError || $t("empty")}</div></ReactCSSTransitionGroup>
					}
				})()}
			</div>
		)
	}
}