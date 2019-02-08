import React, { Component, ChangeEventHandler } from 'react';
//import './App.css';
import * as mx from './mxlibcut';

export class App extends Component {
  render() {
    let ver = "ver 0.1.9 (J208)";
    let time_ver = `[${mx.sFTime().trim()}]: ${ver}`;
   
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
    onChange = (event: React.ChangeEvent<HTMLInputElement> ): void => {
        console.log("v6 " + mx.sFTime() + this)
        //this.setState({typed: event.target.value});
    };
    render() {
        return (
            <div>
                <input type="text" onChange={this.onChange.bind(this)}/><br/>
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

  
