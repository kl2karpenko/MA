import Index from './components/Index.jsx';
import Enter from './components/item/Enter.jsx';
import Qr from './components/item/Qr.jsx';
import Pin from './components/item/Pin.jsx';

module.exports = {
	path: '/connect',
	component: Index,
	childRoutes: [
		{
			path: '/connect/main',
			component: Enter
		},
		{
			path: '/connect/qr',
			component: Qr
		},
		{
			path: '/connect/pin',
			component: Pin
		}
	]
};
