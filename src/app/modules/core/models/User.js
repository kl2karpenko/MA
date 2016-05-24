import Model from 'mainModel';

class User extends Model {
	init() {
		this.resources = {
			dialplan: this.schema.user.dialplan
		};
	}

	_defaultUser() {
		return {
			"_id": "",
			"_rev": "",
			"first_name": "Liliia",
			"second_name": "",
			"email": "",
			"image_id": "",
			"organization_id": "",
			"username": "",
			"type": "user",
			"extension": {
				"_id": "",
				"in_number": "",
				"com_id": "",
				"caller_id": "",
				"caller_number": "",
				"user_id": "",
				"type": ""
			},
			"mailbox": {
				"_id": "",
				"_rev": "",
				"enabled": false,
				"number": "",
				"owner_id": ""
			}
		};
	}
}

let instance = new User();

module.exports = (() => {
	return instance;
})();
