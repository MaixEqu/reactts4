import React, { Component, ChangeEventHandler } from 'react';
import * as mx from './mxlibcut';

const sVersion = "ver 0.1.11 (J209)";

export class App extends Component {
  render() {
    let time_ver = `[${mx.sFTime().trim()}]: ${sVersion}`;
   
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
    //           <div className="VerInfo">{ver}</div>

  }
}

const log = (event: React.ChangeEvent<HTMLInputElement>):void => {
    console.log("value: ", event.target.value);
    console.log("defaultValue: ", event.target.defaultValue);
}

const logT = (event: React.ChangeEvent<HTMLTextAreaElement>):void => {
    console.log("valueT: ", event.target.value);
    console.log("defaultValueT: ", event.target.defaultValue);
}

export class Textareas extends React.Component {
    render() {
        return (
        <div>
            <textarea cols={25} rows={15} defaultValue="textarea-1" />
            <span> </span>
            <textarea cols={25} rows={15} onChange={logT.bind(this)} defaultValue="textarea-2" />
        </div>
      );
    }
}

export class Input extends React.Component {
    render() {
        return (
            <div>
                <input type="text" onChange={log.bind(this)} defaultValue="input field 75" /><br/>
            </div>
        );
    }
}
