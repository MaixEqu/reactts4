import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as mx from './mxlibcut';

class App extends Component {
  render() {
    let ver = "ver 0.1.6 (J208)";
    let ss = `[${mx.sFTime().trim()}]: ${ver}`;
   
    console.log(`hot-edit test ${ss}...`)
//    <!-- img src={logo} className="App-logo" alt="logo" />
    return (
      <div className="App">
        <header className="App-header">
          <div id="app"></div>
          <div className="VerInfo">{ver}</div>
        </header>
        <footer>{ss}</footer>
      </div>
    );
  }
}

export default App;
