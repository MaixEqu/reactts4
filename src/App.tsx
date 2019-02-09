import React, { Component } from 'react';
import * as mx from './mxlibcut';

const sVersion = "ver 0.1.12 (J209)";

export class App extends Component {
  render() {
    let time_ver = `[${mx.sFTime()}]: ${sVersion}`;
    console.log(`hot-edit textareas tests ${time_ver}...`)
    return (
      <div className="App">
        <header className="App-header">
          <div id="input"></div>
          <div id="textareas"></div>
        </header>
        <footer>{time_ver}</footer>
      </div>
    );
  }
}

export class Textareas extends React.Component {
  onChange1 = (event: React.ChangeEvent<HTMLTextAreaElement>):void => {
    console.log("valueT1: ", event.target.value);
    console.log("defaultValueT1: ", event.target.defaultValue);
  }
  onChange2 = (event: React.ChangeEvent<HTMLTextAreaElement>):void => {
    console.log("valueT2: ", event.target.value);
    console.log("defaultValueT2: ", event.target.defaultValue);
  }
  render() {
    return (
      <div>
        <textarea cols={25} rows={15} onChange={this.onChange2.bind(this)} defaultValue="textarea-1" />
        <span> </span>
        <textarea cols={25} rows={15} onChange={this.onChange2.bind(this)} defaultValue="textarea-2" />
      </div>
    );
  }
}

export class Input extends React.Component {
  onChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    console.log("valueI: ", event.target.value);
    console.log("defaultValueI: ", event.target.defaultValue);
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.onChange.bind(this)} defaultValue="input field 75" /><br/>
      </div>
    );
  }
}
