import React, { Component } from 'react';

import DialplanListItem from './list/Item.jsx';

import DialplanList from "models/DialplanList";

export default class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			DialplanList: DialplanList.getModel()
		};
	}

	componentWillMount() {
		DialplanList.update();

		this.setState({
			DialplanList: DialplanList.getModel()
		});
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="m-list m-list-dialplan">
					{this.state.DialplanList.map((object, i) => {
						return <DialplanListItem dialplan={object} key={i} index={i}/>;
					})}
				</div>
			</div>
		);
	}
}