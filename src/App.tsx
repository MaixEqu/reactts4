import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as mx from './mxlibcut';

class App extends Component {
  render() {
    let ver = "ver 0.1.5 (J208)";
    let ss = `[${mx.sFTime().trim()}]: ${ver}`;
   
    console.log(`hot-edit test ${ss}...`)
//    <!-- img src={logo} className="App-logo" alt="logo" />
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <br/>
          {ver}
          <hr/>
          <div id="app">dsfsd</div>
        </header>
        <footer>{ss}</footer>
      </div>
    );
  }
}

export default App;
