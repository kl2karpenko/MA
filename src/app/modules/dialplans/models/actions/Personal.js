import Actions from '../Actions';

let instance = new Actions({
	personal: true
});

module.exports = (() => {
	return instance;
})();