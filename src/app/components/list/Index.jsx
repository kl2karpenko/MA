import React, { Component } from 'react';

import Item from "./Item.jsx";

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			model: props.model,
			list: props.model.getModel(),
			config: props.configData
		};

		this._load.bind(this)();
	}

	_load() {
		return this.state.model
			.load()
			.then((data) => {
				let configData = this.state.config(data[this.state.model._getModelName()]);

				this.setState({
					model: this.state.model,
					list: configData
				});
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