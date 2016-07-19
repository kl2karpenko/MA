import Index from './components/Index.jsx';
import Qr from './components/item/Qr.jsx';
import Pin from './components/item/Pin.jsx';

module.exports = {
	path: '/connects',
	component: Index,
	childRoutes: [
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
