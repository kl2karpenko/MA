import Index    from './components/Index.jsx';

import Storage  from "models/Storage";
import xhrPool from "lib/abort";

/** Import ================================================================== */

module.exports = {
	path: '/pin',
	component: Index,
	onEnter: (nextState, replace) => {
		if (!Storage.existValue('lockCode')) {
			$('.app-loadBlock').addClass('show');
			replace('/dialplans');
		} else {
			$('.app-loadBlock').removeClass('show');
			xhrPool.abortLast();
		}
	}
};