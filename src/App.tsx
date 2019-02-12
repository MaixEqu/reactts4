import React, { Component } from 'react';
import * as mx from './mxlib';

const sVersion = "ver 0.4.3 (J211)";

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
  scale?: string
}

interface IProps {
  id?: string;
  temperature?: string;
  celsius?: number;
  scale?: string;
  onTemperatureChange?: (value: string) => void;
  readonly?: boolean;
  width?: string
  height?: string}

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

class TemperatureTArea extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (this.props.onTemperatureChange)
       this.props.onTemperatureChange(e.target.value);
  }

  handleKeyDown(e: any) {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`; 
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale || 'txt';
    //const scaleName = scaleNames.get(scale);
    const sID = this.props.id ? `"${this.props.id}"` : `"noID"`;
    const sW = this.props.width  || 400;
    const sH = this.props.height || 200;
    const sStyle = `width: "${sW}px", height: "200px"`
    const taStyle = {
      width: sW+'px',
      height: sH+'px'
    };
    // {width: "244px", height: "300px"}
    return (
        <textarea id={sID} style={taStyle} className="halfsize_" rows={5} cols={45} 
          value={temperature}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          readOnly={this.props.readonly}
        />
    );
  }
}
// <textarea style={{width: "49%"}} rows={15} cols={45} value={temperature} onClick={this.handleClick} onChange={this.handleChange} />

export class TextAreas extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {text: 'hello to Mx', scale: 'txt'};
  }

  handleCelsiusChange(text: string) {
    this.setState({scale: 'txt', text});
  }

  handleFahrenheitChange(text: string) {
    this.setState({scale: 'res', text});
  }
  render() {
    const scale = this.state.scale;
    const text = this.state.text;
    const celsius = scale === 'res' ? sConvert(text, doSpaces) : text;
    const fahrenheit = scale === 'txt' ? sConvert(text, doUnderlines) : text;

    return (
      <div>
        <fieldset>
          <legend>Enter text:</legend>
          <div>
            <TemperatureTArea
              scale="txt"
              temperature={celsius}
              height="400"
              onTemperatureChange={this.handleCelsiusChange} />
            {' '}
            <TemperatureTArea
              scale="res"
              temperature={fahrenheit}
              readonly={true}
              onTemperatureChange={this.handleFahrenheitChange} />
          </div>
        </fieldset>
        <BoilingVerdict text={this.state.text}  />
      </div>
    );
  }
}
