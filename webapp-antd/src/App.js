import React, { Component, Fragment } from 'react';
import Header from './component/Header';
import Main from './component/Main';
import Footer from './component/Footer';
import './style/App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </Fragment>
    );
  }
}


export default App;
