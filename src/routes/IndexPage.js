import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.css';

@connect(({ index }) => ({
  index
}))
export default class IndexPage extends Component {
  render() {
    const { index } = this.props;
    const { text } = index;

    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>{text}</h1>
        <ul>
          <li>
            <Link to="/list">点击跳转列表页(不需要登录)</Link>
          </li>
          <li>
            <Link to="/auth/profile/basic">点击跳转详情页(需要user权限)</Link>
          </li>
          <li>
            <Link to="/auth/profile/advanced">点击跳转高级详情页(需要admin权限)</Link>
          </li>
        </ul>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        </ul>
      </div>
    );
  }


}

IndexPage.propTypes = {
};

