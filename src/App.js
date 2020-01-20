import React, { Component } from 'react';
import {
  ADD1_ADD,
  ADD1_BEAT_INPUT,
  ADD1_BEAT_WAIT,
  ADD1_BEAT_INTERVAL,
  ADD1_DIGITS_AMOUNT
} from './constants';
import Game from './components/Game';
import Introduction from './components/Introduction';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticking: false
    };
  }

  handleStart = () => {
    this.setState({
      ticking: true
    });
  }

  render() {
    const { ticking } = this.state;

    return (
      <div className="App">
        {ticking && (
          <Game
            add={ADD1_ADD}
            beatInput={ADD1_BEAT_INPUT}
            beatInterval={ADD1_BEAT_INTERVAL}
            beatWait={ADD1_BEAT_WAIT}
            digitsAmount={ADD1_DIGITS_AMOUNT}
          />
        )}

        {!ticking && (
          <Introduction
            add={ADD1_ADD}
            beatInput={ADD1_BEAT_INPUT}
            beatInterval={ADD1_BEAT_INTERVAL}
            beatWait={ADD1_BEAT_WAIT}
            digitsAmount={ADD1_DIGITS_AMOUNT}
            handleStart={this.handleStart}
          />
        )}
      </div>
    );
  }
}

export default App;
