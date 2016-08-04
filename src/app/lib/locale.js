import helpers from "lib/helpers";

class Language {
	constructor() {
		this.possibleLanguages = [ "en", "ru" , "nl" ];
		this.defaultLanguage = "en";

		this.$t = this.$t.bind(this);
		this.setLanguage = this.setLanguage.bind(this);
	}

	changeLanguage(langName) {
		this.setLanguage(langName);
	}

	setCurrentLanguageOfDevice() {
		let globalization = require('globalization');

		return globalization.getCurrentLanguage().then((lang) => {
			let langDefine = lang && lang.slice(0, 2);

			this.setLanguage(langDefine);

			return lang;
		}).catch((fl) => {
			console.log('cant load lang of device, error: ', fl);
			this.setLanguage(this.defaultLanguage);
		});
	}

	setLanguage(name) {
		if (!name || this.possibleLanguages.indexOf(name) === -1) {
			name = this.defaultLanguage;
		}

		this.language = name;
		this.languageFile = require("json!lang/" + name + ".json");
	}

	$t(path) {
		return this.languageFile && (helpers.getValueByPath(path, this.languageFile));
	}
}

let language = new Language();

module.exports = language;