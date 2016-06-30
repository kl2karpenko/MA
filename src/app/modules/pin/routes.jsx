import Index from './components/Index.jsx';

import Session from "models/Session";

import { Keyboard } from 'components/Keyboard.jsx';

module.exports = {
	path: '/pin',
	component: Index,
	onEnter: (nextState, replace) => {
		Keyboard.addEventHide();

		if (!Session._hasPinCode()) {
			replace('/dialplans');
		}
	},
	onLeave() {
		Keyboard.removeEventHide();
	}
};
