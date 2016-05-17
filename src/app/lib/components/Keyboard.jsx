import React from 'react';

export default class Keyboard extends React.Component {
	constructor(props) {
		super(props);


	}

	_setValue(el) {
		console.log(el, this.props.element);

		this.props.element.value = el;
	}

	render() {
		return (
			<div className="m-keyboard">
				<div className="m-keyboard-digits">
					{[...Array(9)].map((x, i) =>
						<div className="col-xs-5 m-keyboard-digit" key={i}>
							<button className="m-keyboard__key" data-val={i+1} onClick={this._setValue.bind(this, i+1)}>{i + 1}</button>
						</div>
					)}
				</div>
				<div className="m-keyboard-buttons">
					<div className="col-xs-5 m-keyboard-digit">
						<button className="m-keyboard__key buttons">

						</button>
					</div>
					<div className="col-xs-5 m-keyboard-digit">
						<button className="m-keyboard__key" data-val="0">0</button>
					</div>
					<div className="col-xs-5 m-keyboard-digit">
						<div className="m-keyboard__key buttons">
							<button className="btn-round btn-sm btn-check" onClick={this.props.onSubmit} form={this.props.formName}></button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}