import React, { Component } from 'react';
// import * as mx from './mxlibcut';
import * as mx from './mxlib';

const sVersion = "ver 0.4.0 (J211)";

export class Main extends Component {
  render() {
    let time_ver = `[${mx.sFTime()}]: ${sVersion}`;
    // console.log(`hot-edit textareas tests ${time_ver}...`)
    //           <div id="textareas0">textareas tests</div>
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
  //temperature: string
  text: string
  scale?: string
}
interface IProps {
  id?: string;
  temperature?: string;
  celsius?: number;
  scale?: string;
  onTemperatureChange?: (value: string) => void;
}

const BoilingVerdict = (props: IProps) => {
  let sMsg = <p>1 Water would not boil ({props.celsius}).</p>;
  if (props.celsius && props.celsius >= 100) {
    sMsg = <p>Water would boil ({props.celsius})!</p>;
  }
  return sMsg
}

const toCelsius = (fahrenheit: number): number => {
  return (fahrenheit - 32) * 5 / 9;
}

const toFahrenheit = (celsius: number): number => {
  return (celsius * 9 / 5) + 32;
}

const tryConvert = (temperature: string, convert: Function) => {
  /*
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
  */
  return "";
}

const doUnderlines = (s: string) => s.replace(/ /g, "_");
const doSpaces = (s: string) => s.replace(/_/g, " ");
const sConvert = (str: string, convert: Function): string => {
  return convert(str);
}


const scaleNames: Map<string, string> = new Map([
  ['c', 'Celsius'],
  ['f', 'Fahrenheit'],
]);

class TemperatureTArea extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    //console.log("changed")
    if (this.props.onTemperatureChange)
       this.props.onTemperatureChange(e.target.value);
  }

  handleKeyDown(e: any) {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`; 
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale || 'c';
    const scaleName = scaleNames.get(scale);
    const sID = this.props.id ? `"${this.props.id}"` : `"noID"`;
  /* */
    return (
        <textarea id={sID} className="halfsize" rows={5} cols={45} value={temperature} 
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
    );
  /* */
  /*
    return (
      <textarea style={{width: "49%"}} rows={15} cols={45} value={temperature} onClick={this.handleClick} onChange={this.handleChange} />
    );
  */
  }
}
export class TextAreas extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    //this.state = {temperature: '0', scale: 'c'};
    //this.state = {temperature: '111', scale: 'c'};
    this.state = {text: 'hello to Mx', scale: 'c'};
  }
/*
  handleCelsiusChange(temperature: string) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature: string) {
    this.setState({scale: 'f', temperature});
  }
*/
handleCelsiusChange(text: string) {
  this.setState({scale: 'c', text});
}

handleFahrenheitChange(text: string) {
  this.setState({scale: 'f', text});
}
render() {
    const scale = this.state.scale;
    const text = this.state.text;
    //const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    //const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    const celsius = scale === 'f' ? sConvert(text, doSpaces) : text;
    const fahrenheit = scale === 'c' ? sConvert(text, doUnderlines) : text;

    return (
      <div>
        <BoilingVerdict celsius={parseFloat(celsius)} />
        <fieldset>
          <legend>Enter temperature:</legend>
          <div>
            <TemperatureTArea
              id="input"
              scale="c"
              temperature={celsius}
              onTemperatureChange={this.handleCelsiusChange} />
            {' '}
            <TemperatureTArea
              id="output"
              scale="f"
              temperature={fahrenheit}
              onTemperatureChange={this.handleFahrenheitChange} />
          </div>
        </fieldset>
      </div>
    );
  }
}

