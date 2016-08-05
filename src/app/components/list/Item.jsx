import React, { Component } from 'react';
import Tappable from 'react-tappable';

import Image from "./item/Image.jsx";
import Color from "./item/Color.jsx";

export default class DialplanListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: props.data,
			model: props.model
		};
	}

	componentWillReceiveProps(p) {
		this.setState({
			data: p.data,
			model: p.model
		});
	}

	render() {
		return (
			<div className="m-list-item clearfix">
				<Tappable
					pressDelay={500}
					component="div"
					className="m-list-item-wrap clearfix"
					moveThreshold={30}
					onTap={this.props.onClick}>
					{(() => {
						if (this.state.data.image) {
							return <Image
								light={this.props.light || false}
								title={this.state.data.name}
	              src={this.state.data.image}
	              type={this.state.data.type}
							/>;
						} else {
							return <Color color={this.state.data.color}/>;
						}
					})()}
					<div className="m-list-info">
						<h3 className="m-list-name">{this.state.data.name}</h3>
						<div className="m-list-phone">{this.state.data.number}</div>
					</div>
				</Tappable>
			</div>
		);
	}
}