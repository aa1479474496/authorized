import React, { Component } from 'react';
import { connect } from 'dva';

@connect()
export default class Test extends Component {
  render() {
    console.log('test:', this.props);
    return (
      <h1>test</h1>
    )
  }
}