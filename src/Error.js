import React, { Component } from "react";
import "./App.css";

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serving: 0,
    };
  }

  render() {
    return (
      <div>
        <h1>Error!</h1>
      </div>
    );
  }
}

export default Error;
