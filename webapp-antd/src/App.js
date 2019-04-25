import React, { Component, Fragment } from 'react';
import Header from './component/Header';
import Footer from './component/Footer';
import './style/App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header></Header>

        <Footer></Footer>
      </Fragment>
    );
  }
}


export default App;
