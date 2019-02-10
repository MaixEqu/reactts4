import React, { Component } from 'react';
import * as mx from './mxlibcut';

const sVersion = "ver 0.1.14 (J210)";

export class App extends Component {
  render() {
    let time_ver = `[${mx.sFTime()}]: ${sVersion}`;
    console.log(`hot-edit textareas tests ${time_ver}...`)
    return (
      <div className="App">
        <header className="App-header">
          <div id="input"></div>
          <div id="button"></div>
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
        <textarea name="t1" cols={25} rows={15} onChange={this.onChange1.bind(this)} defaultValue="textarea-1" />
        <span> </span>
        <textarea name="t2" cols={25} rows={15} onChange={this.onChange2.bind(this)} defaultValue="textarea-2" />
      </div>
    );
  }
}

export class Input extends React.Component {
  onChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    console.log("valueI: ", event.target.value);
    console.log("defaultValueI: ", event.target.defaultValue);
    this.set(mx.sFTime(), event);
    console.log("valueI new: ", event.target.value);
  }
  set = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = value;
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.onChange.bind(this)} defaultValue="input field 73" /><br/>
      </div>
    );
  }
}

interface IState {
  input1: string;
  input2: string;
  e1: React.ChangeEvent<HTMLInputElement> | undefined
  e2: React.ChangeEvent<HTMLInputElement> | undefined
}
interface IProps {}
export class Button extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
        input1: '1',
        input2: '2',
        e1: undefined,
        e2: undefined,
    };
  }
  handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.state.e1) this.setState({ e1: e });
    this.setState({ input1: e.target.value });
    console.log(mx.sFTime()+". 1:"+this.state.input1+", 2:"+this.state.input2);
    //e.target.value = this.state.input2;
    if (this.state.e2) this.state.e2.target.value = e.target.value;
  }
  handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.state.e2) this.setState({ e2: e });
    this.setState({ input2: e.target.value });
    console.log(mx.sFTime()+". 1:"+this.state.input1+", 2:"+this.state.input2);
    //e.target.value = this.state.input1;
  }

  render() {
    return (
      <div>
        <input name="mxinput1" type="text" onChange={ this.handleChange1 } />
        <input name="mxinput2" type="text" onChange={ this.handleChange2 } />
      </div>
    );
  }
}

