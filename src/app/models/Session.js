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
		console.log(this)
		return this.load({
			id: userID
		});
	}
}

let session = new Session();

module.exports = (() => {
	return session;
})();