import React from 'react';
import schema from 'schema';

import Keyboard from 'components/Keyboard.jsx';

class PinPage extends React.Component {
	constructor(props) {
		super(props);

		this.init();
	}

	init() {
		this.state = {
			inputFocused: ''
		};
		this.formName = 'pinCheck';

		schema.add('pin');
		console.log(schema);

		this._closeKeyboard();
	}

	_closeKeyboard() {
		if (process.env.NODE_ENV === 'prod' && cordova && cordova.plugins) {
			alert('hide buttons in mobile');

			cordova.plugins.Keyboard.close();
		}
	}

	_checkPinCode() {
		var pinArray = $("[name='" + this.formName + "']").serializeArray();

		let allisSet = pinArray.filter((prop) => {
			return prop.value != "";
		});
		
		if (allisSet) {
			schema.pin
				.create({
					'pin': $("[name='" + this.formName + "']").serialize()
				})
				.read();
		} else {
			
		}
	}

	_setFocusedElement(e) {
		console.log(e);
		this.setState({inputFocused: e.target});

		// this.setState({
		// 	'inputFocused': e.target
		// })
	}

	_setLength(e) {
		this._closeKeyboard();
		let value = e.target.value;

		if (value.length > 0) {
			e.preventDefault();
			e.stopPropagation();


			// console.log(e.target.value, value.length, $(this).closest('.l-pin__space').next().find('input'));
			// $(this).parents('.l-pin__space').next().find('input').focus()

			return false;
		}

		return value.length === 1;
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="l-pin">
					<div className="l-pin-wrapper">
						<div className="l-pin-center">
							<div className="l-pin__name">Enter the code</div>
							<div className="l-pin__spaces">
								<form name={this.formName} className="row" method="POST">
									{[...Array(5)].map((x, i) =>
										<div className="col-xs-3 l-pin__space" key={i}>
											<div>
												<input autoFocus={i===0} type="number" name="pin[]"
												       onKeyPress={this._setLength.bind(this)}
												       onFocus={this._setFocusedElement.bind(this)}
												       className="l-pin__pinLetters"/>
											</div>
										</div>
									)}
								</form>
							</div>
						</div>
					</div>
					<Keyboard onSubmit={this._checkPinCode.bind(this)} formName={this.formName} element={this.state.inputFocused}/>
				</div>
			</div>
		);
	}
}

module.exports = PinPage;