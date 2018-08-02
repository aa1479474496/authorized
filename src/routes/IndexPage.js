import React, { Component } from 'react';
import { connect } from 'dva';
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

