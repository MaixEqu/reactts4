import React, { Component } from 'react';
import * as mx from './mxlibcut';

const sVersion = "ver 0.2.4 (J210)";

export class App extends Component {
  render() {
    let time_ver = `[${mx.sFTime()}]: ${sVersion}`;
    console.log(`hot-edit textareas tests ${time_ver}...`)
    return (
      <div className="App">
        <header className="App-header">
          <div id="input"></div>
          <br />
          <div id="input2"></div>
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

function BoilingVerdict(props: IProps) {
  let sMsg = <p>1 Water would NOT boil.</p>;
  if (props.celsius && props.celsius >= 100) {
    sMsg = <p>Water would boil.</p>;
  }
  return sMsg
}

export class Calculator extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>02 Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}

function toCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius: number): number {
  return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature: string, convert: Function) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.onTemperatureChange)
       this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in ???:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
// <legend>Enter temperature in {scaleNames[scale]}:</legend>

export class Calculator2 extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
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
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

