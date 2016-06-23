import Index from './components/Index.jsx';
import Enter from './components/item/Enter.jsx';
import Qr from './components/item/Qr.jsx';
import Pin from './components/item/Pin.jsx';

module.exports = {
	path: '/connects',
	component: Index,
	childRoutes: [
		{
			path: '/connects/main',
			component: Enter
		},
		{
			path: '/connects/qr',
			component: Qr
		},
		{
			path: '/connects/pin',
			component: Pin
		}
	]
};
