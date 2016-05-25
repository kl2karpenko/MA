import Model from 'Model';

class Session extends Model {
	_defaultSession() {
		return {
			"_id": "",
			"id": "",
			"username": "",
			"dialplan": {
				"id": ""
			}
		};
	}

	_getSessionData() {
		let userID = this.Model.user && this.Model.user.id || null;
		// here take data from authorize
		return this.load(userID);
	}
}

let session = new Session();

module.exports = (() => {
	return session;
})();