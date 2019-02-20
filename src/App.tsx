import React, { Component } from 'react';
import * as mx from './mxlib';
import * as ipa from './ipa.lib';

const sVersion = "ver 0.7.2 (J2K)";

export class Main extends Component {
  render() {
    let time_ver = `[${mx.sFTime()}]: ${sVersion}`;
    return (
      <div className="App">
        <header className="App-header">
          <div id="textareas">textareas</div>
        </header>
        <br />
        <footer>{time_ver}</footer>
      </div>
    );
  }
}

const sGetDataX = async (path: string, callback: Function) => {
  console.log("async X: " + path)
  try {
    const response = await fetch(path);
    const text = await response.text();
    //console.log("X: " + text);
    //this.setState({text_s: text});
    callback(path, text)
  } catch(error) {
    console.error(error);
  }
}

let sFData = "no data";
// =====================================================
interface IState {
  text_s: string
  width_s?: string
  height_s?: string
  stage_s?: number
}
interface IProps {
  text_p?: string;
  width_p?: string
  height_p?: string
}

export class TextAreas extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleMDown = this.handleMDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {text_s: "'. // hello to Mx\n", height_s: '300'};
  }

  handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({text_s: e.target.value});
  }
  handleMDown(e: React.MouseEvent<HTMLTextAreaElement>) {
    // this.setState({height2: e.target.scrollHeight});
    // this.setState({width2: e.target.scrollWidth});
  }
  handleKeyDown(e: any ) {
    // console.log("Kdown1, " + `${e.target.scrollHeight}px`);
    // e.target.style.height = 'inherit';
    // e.target.style.height = `${e.target.scrollHeight}px`;
  }

  render() {
    const heigth = this.state.height_s;
    const taStyle = {
      height: this.state.height_s+'px',
      width: this.state.width_s+'px',
      border: "1px solid", 
      verticalAlign: "top",
    };
    return (
      <div>
        <fieldset>
          <legend>Enter text:</legend>
          <div style={{border: "0px solid", verticalAlign: "top"}}>
          <textarea style={taStyle} className="halfsize"
            defaultValue={this.state.text_s}
            onChange={this.handleTextChange}
            onKeyDown={this.handleKeyDown}
            onMouseUp={this.handleMDown}
          />
          {' '}
          <textarea style={taStyle} className="halfsize" 
            defaultValue={this.state.text_s}
            readOnly={true}
          />
          </div>
        </fieldset>
        <TAInfo text_s={this.state.text_s} />
      </div>
    );
  }
}

const TAInfo = (state: IState) => {
  return <p>2 Symbols in 1st textarea: [{state.text_s.length}]</p>;
}
