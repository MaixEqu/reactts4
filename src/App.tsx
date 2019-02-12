import React, { Component } from 'react';
import * as mx from './mxlib';

const sVersion = "ver 0.4.5 (J212)";

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
  //scale?: string
  height2?: string
}

interface IProps {
  id?: string;
  text?: string;
  scale?: string;
  readonly?: boolean;
  width?: string
  height?: string
  onTemperatureChange?: (value: string) => void;
}

const BoilingVerdict = (state: IState) => {
  return <p>Length of the text is [{state.text.length}] symbols.</p>;
}

const doUnderlines = (s: string) => s.replace(/ /g, "_");
const doSpaces = (s: string) => s.replace(/_/g, " ");
const sConvert = (str: string, convert: Function): string => {
  return convert(str);
}

const scaleNames: Map<string, string> = new Map([
  ['txt', 'Text'],
  ['res', 'Result'],
]);

class TextArea3 extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    //this.setState({width2: "200"});
    //this.setState({height2: "200"});
  }

  handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (this.props.onTemperatureChange)
       this.props.onTemperatureChange(e.target.value);
  }

  handleKeyDown(e: any ) {
    //e.target.style.height = 'inherit';
    //e.target.style.height = `${e.target.scrollHeight}px`; 
  }
  
  handleMouseDown(e: any ) {
    //alert("Mdown, " + `${e.target.scrollHeight}px`);
    console.log("Mdown2, " + `${e.target.scrollHeight}px`);
    //this.setState({height2: "590"});
    //e.target.style.height = `${e.target.scrollHeight+20}px`;
  }
  render() {
    const temperature = this.props.text;
    //const scale = this.props.scale || 'txt';
    const sID = this.props.id ? `"${this.props.id}"` : `"noID"`;
    const sW = this.props.width  || '300';
    //const sH = this.props.height || '200';
    const sH = this.props.height;
    const taStyle = {
      width: sW+'px',
      height: sH+'px'
    };
    // {width: "244px", height: "300px"}
    return (
        <textarea id={sID} style={taStyle} className="halfsize_" rows={5} cols={45}
          name={this.props.scale}
          value={temperature}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          readOnly={this.props.readonly}
        />
    );
  }
}
// <textarea style={{width: "49%"}} rows={15} cols={45} value={temperature} onClick={this.handleClick} onChange={this.handleChange} />

export class TextAreas extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    // this.handleResultChange = this.handleResultChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    //this.state = {text: 'hello to Mx', scale: 'txt', height2: '300'};
    this.state = {text: 'hello to Mx', height2: '300'};
  }

  handleTextChange(text: string) {
    //this.setState({scale: 'txt', text});
    this.setState({text});
    let sNew = this.state.height2;
    sNew = sNew ? (parseFloat(sNew)+4).toString() : "212";
    this.setState({height2: sNew});
  }
/*
  handleResultChange(text: string) {
    this.setState({scale: 'res', text});
  }
*/
  handleHeightChange(height: string) {
    this.setState({height2: height});
  }

  render() {
    //const scale = this.state.scale;
    const text = this.state.text;
    const heigth = this.state.height2;
    //const sText = scale === 'res' ? sConvert(text, doSpaces) : text;
    //const sResult = scale === 'txt' ? sConvert(sText, doUnderlines) : sText;

    return (
      <div>
        <fieldset>
          <legend>Enter text:</legend>
          <div>
            <TextArea3
              scale="txt"
              text={text}
              height={heigth}
              onTemperatureChange={this.handleTextChange} />
            {' '}
            <TextArea3
              scale="res"
              text={sConvert(text, doUnderlines)}
              height={heigth}
              readonly={true} />
          </div>
        </fieldset>
        <BoilingVerdict text={this.state.text}  />
      </div>
    );
  }
}
//           onTemperatureChange={this.handleResultChange} />
