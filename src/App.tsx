import React, { Component } from 'react';
import './App.css';
import * as mx from './mxlibcut';

export class App extends Component {
  render() {
    let ver = "ver 0.1.8 (J208)";
    let ss = `[${mx.sFTime().trim()}]: ${ver}`;
   
    console.log(`hot-edit test ${ss}...`)
    return (
      <div className="App">
        <header className="App-header">
          <div id="input"></div>
          <div id="textareas"></div>
          <div className="VerInfo">{ver}</div>
        </header>
        <footer>{ss}</footer>
      </div>
    );
  }
}
export class Textareas extends React.Component {
    render() {
      return (
        <div>
            <textarea cols={45} rows={25} defaultValue="textarea-1" />
            <span> </span>
            <textarea cols={45} rows={25} defaultValue="textarea-2" />
        </div>
      );
    }
}

export class Input extends React.Component {
    onChange = (event:any): void => {
        console.log(mx.sFTime())
        //this.setState({typed: event.target.value});
    };
    render() {
        return (
            <div>
                <input type="text" onChange={this.onChange.bind(this)}/><br/>
                You typed: <code>ddd</code>
            </div>
        );
            /*
      return (
        <div>
            <input type="text" onChange={this.onChange.bind(this)}/>
            You typed: <code>{this.state}</code>
        </div>
      );
      */
    }
}

  
