import Index from './components/Index.jsx';

import Storage from "models/Storage";
import Pin from "models/Pin";

import { Keyboard } from 'components/Keyboard.jsx';

module.exports = {
	path: '/pin',
	component: Index,
	onEnter: (nextState, replace) => {
		Keyboard.addEventHide();

		if (!Storage.existValue('pin')) {
			replace('/dialplans');
		}
	},
	onLeave() {
		Keyboard.removeEventHide();
	}
};
