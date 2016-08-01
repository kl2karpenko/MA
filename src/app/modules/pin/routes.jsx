import Index    from './components/Index.jsx';

import Storage  from "models/Storage";

/** Import ================================================================== */

module.exports = {
	path: '/pin',
	component: Index,
	onEnter: (nextState, replace) => {
		if (!Storage.existValue('lockCode')) {
			replace('/dialplans');
		}
	}
};
