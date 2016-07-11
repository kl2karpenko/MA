import Index from './components/Index.jsx';

import Storage from "models/Storage";

import { Keyboard } from 'components/Keyboard.jsx';

module.exports = {
	path: '/pin',
	component: Index,
	onEnter: (nextState, replace) => {
		if (!Storage.getValue("pin")) {
			replace('/dialplans');
		}
	},
	onLeave() {
		Keyboard.removeEventHide();
	}
};
