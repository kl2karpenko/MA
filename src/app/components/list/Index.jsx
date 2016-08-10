import React, {Component}     from 'react';

import Item                     from "./Item.jsx";

import ReactCSSTransitionGroup  from 'react/lib/ReactCSSTransitionGroup';

import {$t}                   from 'lib/locale';

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

		this._getErrorText = this._getErrorText.bind(this);
	}

	componentDidMount() {
		this._load.bind(this)();
	}

	componentWillReceiveProps(newProps) {
		let
			searchString = newProps.search,
			updateState;

		if ("search" in newProps) {
			if (searchString) {
				updateState = {
					searchQuery: searchString,
					list: newProps.configData(newProps.model.search(searchString, {by: ['name', 'number', 'in_number', 'ex_number']}))
				};
				this.setState(updateState);
			} else {
				updateState = {
					list: newProps.configData(newProps.model.getModel())
				};
				this.setState(updateState);
			}
		}
	}

	_load() {
		if (this.state.loading) {
			return;
		}

		this.setState({
			loading: true
		});

		return this.state.model
			.load()
			.then((data) => {
				let configData = data ? ( this.state.config ?
					this.state.config(data[this.state.model._getModelName()]) : data[this.state.model._getModelName()]) : [];

				this.setState({
					model: this.state.model,
					list: configData,
					loading: false
				});
			});
	}

	_getErrorText() {
		// TODO: fix error or empty message
		return this.props.onError && $t(this.props.onError);
	}

	_getEmptyText() {
		return $t("empty");
	}

	_getLoadingText() {
		return $t("loading_empty");
	}

	render() {
		let items = this.state.list && this.state.list.map((object, i) => {
				return <ReactCSSTransitionGroup
					key={"list-" + (object._id || object.id || i)}
					transitionName="visibility"
					transitionAppear={true}
					transitionAppearTimeout={300}
					transitionEnter={true}
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
					transitionLeave={true}
				><Item
					light={this.state.model._getModelName() == "dialplans"}
					data={object}
					model={this.state.model}
					key={"name-" + i}
					onClick={this.props.onClick.bind(this, i, object)}
					index={object._id || object.id || i}
				/></ReactCSSTransitionGroup>;
			});

		return (
			<div className={"m-list" + (this.props.listClass ? (" " + this.props.listClass) : "")
			+ (this.props.withImg ? " m-list-withImg" : " m-list-withColor")}>
				{(() => {
					if (!this.state.loading) {
						if (this.state.list && this.state.list.length) {
							return items;
						} else {
							// TODO: not right text
							return <ReactCSSTransitionGroup
								key={"list-empty"}
								transitionName="visibility"
								transitionAppear={true} transitionAppearTimeout={500}
								transitionEnter={false} transitionLeave={false}
							>
								<div className="m-list-denied">
									<div>{this._getErrorText() || this._getEmptyText()}
									</div>
								</div>
							</ReactCSSTransitionGroup>
						}
					} else {
						return <ReactCSSTransitionGroup
							key={"list-empty"}
							transitionName="visibility"
							transitionAppear={true} transitionAppearTimeout={500}
							transitionEnter={false} transitionLeave={false}
						>
							<div className="m-list-loading">
								<div>{this._getLoadingText()}</div>
							</div>
						</ReactCSSTransitionGroup>
					}
				})()}
			</div>
		)
	}
}