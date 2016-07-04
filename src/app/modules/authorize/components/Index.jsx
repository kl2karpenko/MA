import React, {Component} from 'react';
import { hashHistory } from 'react-router';

import Storage from 'models/Storage';

import Loader from 'components/layouts/Loader.jsx';

export default class Index extends Component {
	constructor(props) {
		super(props);

		/**
		 * delete pin from storage
		 */
		Storage.deleteValue('pin');
		hashHistory.push('/connects/main');

		console.log(this);
	}

	render() {
		return <Loader/>;
	}
}