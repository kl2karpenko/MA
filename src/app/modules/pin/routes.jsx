import Index from './components/Index.jsx';

import Session from "models/Session";

module.exports = {
	path: '/pin',
	component: Index,
	onEnter: (nextState, replace) => {
		if (!Session._hasPinCode()) {
			replace('/dialplans');
		}
	}
};
