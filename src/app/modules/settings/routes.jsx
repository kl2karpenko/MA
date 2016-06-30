import Index from './components/Index.jsx';

import { Keyboard } from 'components/Keyboard.jsx';

module.exports = {
	path: '/settings',
	component: Index,
	onEnter: () => {
		Keyboard.addEventHide();
	},
	onLeave() {
		Keyboard.removeEventHide();
	}
};