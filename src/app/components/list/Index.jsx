import React, { Component } from 'react';

import Item from "./Item.jsx";

export default class Index extends Component {
	constructor(props) {
		super(props);

		console.log(props.model.getModel())

		this.state = {
			model: props.model,
			list: props.model.getModel(),
			config: props.configData
		};

		this._load.bind(this)();
	}

	componentWillReceiveProps(props) {
		console.log(props, 'componentWillReceiveProps', props.model._getModelName())
		this.setState({
			model: props.model,
			list: props.model.getModel(),
			config: props.configData
		});
	}

	_load() {
		return this.state.model
			.load()
			.then((data) => {
				this.setState({
					model: this.state.model,
					list: this.state.config(data[this.state.model._getModelName()])
				});

				console.log(this.state)
			});
	}

	render() {
		return (
			<div className={"m-list" + (this.props.listClass ? " " + this.props.listClass : "") + (this.props.withImg ? " m-list-withImg" : " m-list-withColor")}>
				{(() => {
					if (this.state.list && this.state.list.length) {
							return (this.state.list.map((object, i) => {
								return <Item
									data={object}
									model={this.state.model}
									key={i}
									onClick={this.props.onClick.bind(this, i, object)}
									index={i}
									/>
							}));
					} else {
						return <div className="permission-denied">No permission to your contact list</div>
					}
				})()}
			</div>
		)
	}
}