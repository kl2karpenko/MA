import React, {Component} from 'react';
import { hashHistory } from 'react-router';

import Loader from 'components/layouts/Loader.jsx';

export default class Index extends Component {
	constructor(props) {
		super(props);

		/**
		 * delete pin from storage
		 */
		Storage.clear();
		hashHistory.push('/connects/main');
	}

	render() {
		return <Loader/>;
	}
}