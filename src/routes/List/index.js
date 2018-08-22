import React, { Component } from 'react';
import { connect } from 'dva';


@connect(({list}) => ({
  list
}))
export default class Details extends Component {
  render() {
    return (
      <h1>list</h1>
    )
  }
}