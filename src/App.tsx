import React, { Component } from 'react';
import * as mx from './mxlib';
import * as ipa from './ipa.lib';

const sVersion = "ver 0.7.1 (J2K)";

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

// =====================================================
interface IState {
  text_s: string
  width_s?: string
  height_s?: string
}

interface IProps {
  text_p?: string;
  width_p?: string
  height_p?: string
  datapath?: string
  readonly?: boolean;
  onTextChange?: (value: string, e: any) => void;
  onMDown?: (e: any) => void;
}

const TAInfo = (state: IState) => {
  return <p>Symbols in 1st textarea: [{state.text_s.length}]</p>;
}

const taNames: Map<string, string> = new Map([
  ['txt', 'Text'],
  ['res', 'Result'],
]);

class TextArea1 extends React.Component<IProps, IState> {
  private _sData = "";
  constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMDown = this.handleMDown.bind(this);
    const sDataUrl = location.href + this.props.datapath; //'/data/5.txt'
    console.log(sDataUrl)
    //const sData = this.sGetData(sDataUrl);
    this.sGetData(sDataUrl);
    //this.setState({'text': sData})
  }

  sGetData = (path: string): void => {
    //let sRes = "no data";
    fetch(path)
      .then((response) => response.text())
      .then((sRes) => {
        console.log(sRes)
        this.setState({text_s: sRes}); // ._sData = sRes
      })
      .catch((error: Error) => {
        console.error(error);
      });
    //return sRes;
  }

  handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (this.props.onTextChange) this.props.onTextChange(e.target.value, e);
  }
  handleMDown(e: React.MouseEvent<HTMLTextAreaElement>) {
    if (this.props.onMDown) this.props.onMDown(e);
  }
  handleKeyDown(e: any ) {
    // console.log("Kdown1, " + `${e.target.scrollHeight}px`);
    // e.target.style.height = 'inherit';
    // e.target.style.height = `${e.target.scrollHeight}px`;
  }

  render() {
    const text = this.props.text_p;
    const taStyle = {
      width: this.props.width_p+'px',
      height: this.props.height_p+'px',
      border: "2px solid", 
      verticalAlign: "top",
    };
    return (
        <textarea style={taStyle} className="halfsize" value={text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onMouseUp={this.handleMDown}
          readOnly={this.props.readonly}
        />
    );
  }
}

//           onMouseDown={this.handleMDown}

const sGetData2 = (path: string): string => {
  let sRes = "no data";
  fetch(path)
    .then((response) => response.text())
    .then((sRes) => {
      return sRes;
    })
    .catch((error: Error) => {
      console.error(error);
    });
  return sRes;
}

export class TextAreas extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleMDown = this.handleMDown.bind(this);
    this.state = {text_s: "'. // hello to Mx\n", height_s: '300'};
  }
  
  handleTextChange(text: string, e: any) {
    this.setState({text_s: text});
    //this.setState({height2: e.target.scrollHeight});
  }

  handleMDown(e: any) {
    // this.setState({height2: e.target.scrollHeight});
    // this.setState({width2: e.target.scrollWidth});
  }

  render() {
    const text = this.state.text_s;
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
            <TextArea1
              text_p={text}
              height_p={heigth}
              onTextChange={this.handleTextChange}
              datapath='data/5.txt'
              onMDown ={this.handleMDown} />
            {' '}
            <textarea style={taStyle} className="halfsize" defaultValue={this.state.text_s}
            />
          </div>
        </fieldset>
        <TAInfo text_s={this.state.text_s} />
      </div>
    );
  }
}
//               text={ipa.ipa2cyr(text)}
/*
            {' '}
            <TextArea
              text={sConvert(text, doUnderlines)}
              height={heigth}
              onMDown ={this.handleMDown} />
*/