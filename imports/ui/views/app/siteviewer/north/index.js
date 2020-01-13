import React, { Component } from "react";
import CommonPage from '../common';

export default class NorthPage extends Component {
  render() {
    return (
      <CommonPage {...this.props}/>
    );
  }
}