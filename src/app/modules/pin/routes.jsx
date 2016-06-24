import Index from './components/Index.jsx';
import {hashHistory} from 'react-router';

import Session from "models/Session";
let isHasPinCode = Session._hasPinCode();

module.exports = {
	path: '/pin',
	component: Index,
	onEnter: (nextState, replace) => {
		console.log('onEnter pin')
		hashHistory.push(isHasPinCode ? '/pin' : '/dialplans');
	}
};
