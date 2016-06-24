import React, {Component} from 'react';
import { hashHistory } from 'react-router';

import Session from "models/Session";

import Loader from 'components/layouts/Loader.jsx';

export default class Index extends Component {
	constructor(props) {
		super(props);

		this._init();
	}

	_init() {
		hashHistory.push('/connects/main');
	}

	render() {
		return <Loader/>;
	}
}