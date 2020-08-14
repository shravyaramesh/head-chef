import React, { Component } from "react";
import "./App.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serving: 0,
    };
  }

  render() {
    return (
      <div>
        <div className="header-img">
          <div style={{ textAlign: "center" }}>
            <h1 className="header">Head Chef.</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
