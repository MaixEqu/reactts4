import React, { Component } from 'react';
// import * as mx from './mxlibcut';
import * as mx from './mxlib';

const sVersion = "ver 0.3.1 (J210)";

export class Main extends Component {
  render() {
    let time_ver = `[${mx.sFTime()}]: ${sVersion}`;
    // console.log(`hot-edit textareas tests ${time_ver}...`)
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
  temperature: string
  scale?: string
}
interface IProps {
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
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
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
    if (this.props.onTemperatureChange)
       this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale || 'c';
    const scaleName = scaleNames.get(scale);
    return (
      <fieldset>
        <legend>Enter temperature in {scaleName}:</legend>
        <textarea rows={15} cols={45} value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
export class TextAreas extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '0', scale: 'c'};
  }

  handleCelsiusChange(temperature: string) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature: string) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureTArea
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureTArea
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
