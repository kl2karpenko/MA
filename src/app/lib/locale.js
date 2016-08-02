import helpers                  from "lib/helpers";
import { getCurrentLanguage }   from "appConfig";

class Language {
	constructor(lang) {
		this.possibleLanguages = [ "en", "ru" ];
		this.defaultLanguage = "en";

		this.$t = this.$t.bind(this);
		this.setLanguage = this.setLanguage.bind(this);
	}

	_init(langName) {
		this.setLanguage(langName);
	}

	changeLanguage(langName) {
		this.setLanguage(langName);
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