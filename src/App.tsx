import React, { Component } from 'react';
import * as mx from './mxlibcut';

const sVersion = "ver 0.2.2 (J210)";

export class App extends Component {
  render() {
    let time_ver = `[${mx.sFTime()}]: ${sVersion}`;
    console.log(`hot-edit textareas tests ${time_ver}...`)
    return (
      <div className="App">
        <header className="App-header">
          <div id="input"></div>
        </header>
        <br />
        <footer>{time_ver}</footer>
      </div>
    );
  }
}

// =====================================================
interface IState {
  temperature: string;
}
interface IProps {
  celsius?: number;
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
