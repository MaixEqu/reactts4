import React, { Component } from 'react';
import * as mx from './mxlib';
import * as ipa from './ipa.lib';

const sVersion = "ver 0.7.3 (J2K)";

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
  text2_s?: string
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
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setTAText1 = this.setTAText1.bind(this)
    this.setTAText2 = this.setTAText2.bind(this)
    this.state = {text_s: "hello to Mx 3", height_s: '300', stage_s: 0};
    sGetDataX(location.href + '/data/' + '1.txt', this.setTAText1);
  }

  handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({text_s: e.target.value});
  }
  handleMouseDown(e: React.MouseEvent<HTMLTextAreaElement>) {
    // this.setState({height2: e.target.scrollHeight});
    // this.setState({width2: e.target.scrollWidth});
  }
  handleKeyDown(e: any ) {
    // console.log("Kdown1, " + `${e.target.scrollHeight}px`);
    // e.target.style.height = 'inherit';
    // e.target.style.height = `${e.target.scrollHeight}px`;
  }

  setTAText1(path: string, text: string) {
    console.log("infunc1: " + path + " done.");
    const nStage = this.state.stage_s || 0
    this.setState({text_s: "inner1: " + text, stage_s: nStage+1})
    this.setState({text2_s: ipa.ipa2cyr(text), stage_s: nStage+2})
    this._workCheck();
  }
  setTAText2(path: string, text: string) {
    console.log("infunc2: " + path + " done.");
    const nStage = this.state.stage_s || 0
    this.setState({text2_s: "inner2: " + text, stage_s: nStage+1})
    this._workCheck();
  }
  _workCheck() {
    const sMsg = (this.state.stage_s && this.state.stage_s >= 2) ? " ALL data" : "waiting more..."
    console.log(sMsg);

  }

  render() {
    const taStyle = {
      height: this.state.height_s+'px',
      width: this.state.width_s+'px',
      border: "1px solid",
      verticalAlign: "top",
    };
    return (
      <div>
        <fieldset>
          <legend>Enter text (stage:{this.state.stage_s}):</legend>
          <div style={{border: "0px solid", verticalAlign: "top"}}>
          <textarea style={taStyle} className="halfsize"
            value = {this.state.text_s}
            onChange={this.handleTextChange}
            onKeyDown={this.handleKeyDown}
            onMouseUp={this.handleMouseDown}
          />
          {' '}
          <textarea style={taStyle} className="halfsize"
            value={this.state.text2_s || "no text 2"}
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
