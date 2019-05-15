import React, { Component, Fragment } from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Linkme from "./component/main/linkme";
import "./style/App.scss";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Linkme />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
