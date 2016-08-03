import helpers         from "lib/helpers";

class Language {
	constructor() {
		this.possibleLanguages = [ "en", "ru" ];
		this.languagesFromPhone = [ "en", "ru-RU" ];
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
			console.log(lang, 'setCurrentLanguageOfDevice');

			this.setLanguage("ru");
			
			return lang;
		});
	}

	setLanguage(name) {
		if (!name || this.possibleLanguages.indexOf(name) === -1) {
			name = this.defaultLanguage;
		}

		this.language = name;
		this.languageFile = require("json!lang/" + name + ".json");
		this.languageFileDefault = require("json!lang/en.json");
	}

	$t(path) {
		let translation = this.languageFile && (helpers.getValueByPath(path, this.languageFile) ||
			helpers.getValueByPath(path, this.languageFileDefault));

		return translation;
	}
}

let language = new Language();

module.exports = language;