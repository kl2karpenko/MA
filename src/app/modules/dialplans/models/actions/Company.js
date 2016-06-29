import Actions from '../Actions';

let instance = new Actions({
	personal: false
});

module.exports = (() => {
	return instance;
})();
