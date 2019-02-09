import React, { Component, ChangeEventHandler } from 'react';
//import './App.css';
import * as mx from './mxlibcut';

const sVersion = "ver 0.1.10 (J209)";

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
export class Textareas extends React.Component {
    render() {
        return (
        <div>
            <textarea cols={25} rows={15} defaultValue="textarea-1" />
            <span> </span>
            <textarea cols={25} rows={15} defaultValue="textarea-2" />
        </div>
      );
    }
}

export class Input extends React.Component {
    log = (event: React.ChangeEvent<HTMLInputElement>):void => {
        console.log("value: ", event.target.value);
        console.log("defaultValue: ", event.target.defaultValue);
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement> ): void => {
        console.log("v6 " + mx.sFTime() + this)
        //this.setState({typed: event.target.value});
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.log.bind(this)} defaultValue="input field 78" /><br/>
            </div>
        );
                // <input type="text" onChange={this.onChange.bind(this)} defaultValue="input field 77" /><br/>
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

  
