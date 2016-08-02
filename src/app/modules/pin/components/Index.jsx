import React, { Component }   from 'react';
import { hashHistory }        from 'react-router';

import PinForm                from './PinForm.jsx';

import LockCode               from 'models/LockCode';
import Storage                from "models/Storage";

import Adaptive               from 'components/layouts/adaptive/Index.jsx';
import AdaptiveWrapper        from 'components/layouts/adaptive/Wrapper.jsx';

import { $t }                 from 'lib/locale';

/** Import ================================================================== */

export default class Index extends Component {
	constructor(props) {
		super(props);

		LockCode.lockCode.value = "";

		this.state = {
			model: LockCode.lockCode,
			isValid: false,
			element: ""
		};

		this._save = this._save.bind(this);
	}

	_reset() {
		LockCode.lockCode.value = "";

		this.setState({
			model: LockCode.lockCode,
			isValid: false
		});
	}

	_save() {
		let currentPin = LockCode.isExist();

		if (currentPin && LockCode.getValueByPath('value') === Storage.getValue('lockCode')) {
			return LockCode
				.save()
				.then(() => {
					this._reset();
					$('.app-loadBlock').addClass('show');
					hashHistory.push('/dialplans');
					Storage.setValue("unlock", true);
				})
		} else {
			this._reset();
			Storage.setValue("unlock", false);
			LockCode.messenger.error($t("pin.wrong_code"), $t("error"));
		}
	}

	render() {
		$(document).trigger('system:loaded');
		$('.app-loadBlock').removeClass('show');

		return (<AdaptiveWrapper>
			<Adaptive>
				<PinForm
					options={{
						form: 'pinCheck',
						text: $t("pin.enter_code"),
						inputType: "password",
						onSubmit: this._save,
						model: this.state.model
					}}
				/>
			</Adaptive>
		</AdaptiveWrapper>);
	}
}