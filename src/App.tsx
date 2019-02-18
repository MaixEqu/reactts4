import React, { Component } from 'react';
import * as mx from './mxlib';
import * as ipa from './ipa.lib';

const sVersion = "ver 0.6.1 (J218)";

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
  text: string
  width2?: string
  height2?: string
  fetched?: boolean
}

interface IProps {
  text?: string;
  readonly?: boolean;
  width?: string
  height?: string
  datapath?: string
  onTextChange?: (value: string, e: any) => void;
  onMDown?: (e: any) => void;
}

const BoilingVerdict = (state: IState) => {
  return <p>Length of the text is [{state.text.length}] symbols.</p>;
}

const doUnderlines = (s: string) => s.replace(/ /g, "_");
const sConvert = (str: string, convert: Function): string => {
  return convert(str);
}

const scaleNames: Map<string, string> = new Map([
  ['txt', 'Text'],
  ['res', 'Result'],
]);

class TextArea extends React.Component<IProps, IState> {
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

  componentDidMount(): void {
    if (this.props.text) {
      console.log("comp. DidMount2: " + this.props.text);
      console.log("data: " + this._sData);
    }
    this.setState({text: this._sData})
  }

  sGetData = (path: string): void => {
    //let sRes = "no data";
    fetch(path)
      .then((response) => response.text())
      .then((sRes) => {
        console.log(sRes)
        this.setState({text: sRes}); // ._sData = sRes
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
    const text = this.props.text;
    const taStyle = {
      width: this.props.width+'px',
      height: this.props.height+'px',
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
    this.state = {text: "'. // hello to Mx\n", height2: '300'};
  }
  
  handleTextChange(text: string, e: any) {
    this.setState({text});
    this.setState({height2: e.target.scrollHeight});
    // this.setState({width2: e.target.scrollWidth});
    // console.log("onChange W2: " + e.target.scrollWidth);
    // console.log("onChange H2: " + e.target.scrollHeight);
  }

  handleMDown(e: any) {
    // console.log("MDown10")
    this.setState({height2: e.target.scrollHeight});
    this.setState({width2: e.target.scrollWidth});
    // console.log("onChange WD: " + e.target.scrollWidth);
    // console.log("onChange HD: " + e.target.scrollHeight);
  }

  render() {
    const text = this.state.text;
    const heigth = this.state.height2;
//    const width = this.state.width2;
//               width={width}
    return (
      <div>
        <fieldset>
          <legend>Enter text:</legend>
          <div style={{border: "0px solid", verticalAlign: "top"}}>
            <TextArea
              text={text}
              height={heigth}
              onTextChange={this.handleTextChange}
              datapath='data/5.txt'
              onMDown ={this.handleMDown} />
            {' '}
            <TextArea
              text={text}
              datapath='data/4.txt'
              height={heigth}
              onMDown ={this.handleMDown} />
          </div>
        </fieldset>
        <BoilingVerdict text={this.state.text} />
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