import Model from 'mainModel';

class User extends Model {
	initialize() {
		this.managedResource = 'user';

		this.resources = {
			dialplan: this.schema.user.dialplan
		};

		return user;
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

let user = new User();

module.exports = user.initialize();
