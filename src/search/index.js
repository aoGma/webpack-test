"use strict";

import React from "react";
import ReactDOM from "react-dom";
import logo from "./images/logo.png";
// import "./search.css";
import "../../common";
import "./search.less";

class Search extends React.Component {
	render() {
		return (
			<div className="search-text">
				Search 寺院
				<img width={30} height={30} src={logo}></img>
			</div>
		);
	}
}

ReactDOM.render(<Search />, document.getElementById("root"));
