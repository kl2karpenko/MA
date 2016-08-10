import React, { Component }   from 'react';
import { hashHistory }        from 'react-router';

import ConnectCode            from "models/ConnectCode";
import Token                  from "models/Token";

import WantToScanQr         from './items/WantToScanQr.jsx';
import PinForm                from 'components/inputs/Pin.jsx';
import MainConnect            from './items/MainConnect.jsx';

import Adaptive               from 'components/layouts/adaptive/Index.jsx';
import Angle                  from 'components/modules/angle/Index.jsx';

import Swipeable              from "react-swipeable";

import { $t }                 from 'lib/locale';

import ReactCSSTransitionGroup  from 'react/lib/ReactCSSTransitionGroup';

/** Import ================================================================== */

export default class Pin extends Component {
	constructor(props) {
		super(props);

		this.state = ConnectCode.getModel();

		this.connect = this.connect.bind(this);
	}

	_reset() {
		ConnectCode.updateAttributesFor('value', '');
		this.setState(ConnectCode.getModel());
	}

	connect(value) {
		return Token.load({
			type: "connect_code",
			value: value
		}).then(() => {
			this._reset();

			if (Token._getActiveValue()) {
				hashHistory.replace('/pin');
			}

			return ConnectCode.getModel();
		}).fail(() => {
			this._reset();
		});
	}

	render() {
		return (
			<ReactCSSTransitionGroup
				key="qr-code-page"
				transitionName = "visibility-pages"
				transitionAppear = {true}
				transitionAppearTimeout = {300}
				transitionEnter = {true}
				transitionEnterTimeout = {300}
				transitionLeaveTimeout = {300}
				transitionLeave = {true}
			>
			<Swipeable
				className="swipeable"
				onSwipingRight={() => {
					hashHistory.replace("/connects/qr");
				}}
			>
			<Adaptive key="connect_code">
				<Angle class="main" header={false}>
					<div className="l-pin-connect">
						<div className="l-pin">
							<PinForm
								model={this.state}
								text={$t("connects.pin.enter_code")}
								inputType="number"
								form="connectPin"
								onSubmit={this.connect.bind(this)}
							/>
						</div>
					</div>
				</Angle>

				<MainConnect>
					<h2 className="l-main__header">{$t("connects.pin.where_find_code")}</h2>
					<p className="l-main__text">{$t("connects.find_code")}</p>
				</MainConnect>

				<WantToScanQr/>
			</Adaptive>
		</Swipeable>
		</ReactCSSTransitionGroup>
		);
	}
}