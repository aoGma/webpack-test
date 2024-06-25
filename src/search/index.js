"use strict";

import React from "react";
import ReactDOM from "react-dom";
import logo from "./images/logo.png";
// import "./search.css";
// import "../../common";
import "./search.less";
// import { a } from "./tree-shaking";

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
		return (
			<div className="search-text">
				Search 寺院
				{Text ? <Text /> : null}
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

ReactDOM.render(<Search />, document.getElementById("root"));
