import React, { Component } from 'react';
import * as mx from './mxlib';

const sVersion = "ver 0.4.10 (J213)";

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
}

interface IProps {
  text?: string;
  readonly?: boolean;
  width?: string
  height?: string
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
  constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMDown = this.handleMDown.bind(this);
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
    // <textarea style={taStyle} className="halfsize" rows={5} cols={45}
    return (
        <textarea style={taStyle} className="halfsize" value={text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMDown}
          onMouseUp={this.handleMDown}
          readOnly={this.props.readonly}
        />
    );
  }
}

export class TextAreas extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleMDown = this.handleMDown.bind(this);
    this.state = {text: 'hello to Mx 2', height2: '100'};
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
              onMDown ={this.handleMDown} />
            {' '}
            <TextArea
              text={sConvert(text, doUnderlines)}
              height={heigth}
              onMDown ={this.handleMDown} />
          </div>
        </fieldset>
        <BoilingVerdict text={this.state.text} />
      </div>
    );
  }
}
