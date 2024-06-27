"use strict";

// import React from "react";
// // import ReactDOM from "react-dom";
// import logo from "./images/logo.png";
// // import "./search.css";
// // import "../../common";
// import "./search.less";
// // import { a } from "./tree-shaking";
// import largeNumber from "large-number";

const React = require("react");
const largeNumber = require("large-number");
const logo = require("./images/logo.png");
require("./search.less");

class Search extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			Text: null,
		};
	}
	loadComponent() {
		import("./text.js").then((Text) => {
			this.setState({
				Text: Text.default,
			});
		});
	}
	render() {
		const { Text } = this.state;
		const result = largeNumber("9999999", "1");
		return (
			<div className="search-text">
				Search 寺院
				{Text ? <Text /> : null}
				{result ? result : null}
				<img
					width={30}
					height={30}
					src={logo}
					onClick={this.loadComponent.bind(this)}
				></img>
			</div>
		);
	}
}

module.exports = <Search />;
