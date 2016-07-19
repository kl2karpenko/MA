import React, {Component} from 'react';
import { hashHistory } from 'react-router';

import Loader from 'components/layouts/Loader.jsx';
import Storage from "models/Storage";

export default class Index extends Component {
	constructor(props) {
		super(props);

		/**
		 * delete pin from storage
		 */
		Storage.clear();
		hashHistory.push('/connects/qr');
	}

	render() {
		return <Loader/>;
	}
}