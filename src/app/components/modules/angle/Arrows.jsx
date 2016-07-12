import React, { Component } from 'react';
import imageLoader from 'imageLoader';

export default class Angle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			previous: props.previous ? '' : ' disabled',
			next: props.next ? '' : ' disabled'
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			previous: props.previous ? '' : ' disabled',
			next: props.next ? '' : ' disabled'
		});
	}

	render() {
		return (
			<div className="m-angle__arrows">
				<button className={"m-angle-arrow __left" + this.state.previous} onTouchStart={this.props.onClick}>
					<img className="img-responsive previous" src={imageLoader(require("images/icons/arrow-left.png"))} alt="Left"/>
				</button>
				<button className={"m-angle-arrow __right" + this.state.next} onTouchStart={this.props.onClick}>
					<img className="img-responsive next" src={imageLoader(require("images/icons/arrow-right.png"))} alt="Left"/>
				</button>
			</div>
		);
	}
}