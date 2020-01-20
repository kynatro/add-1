import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import './Game.scss';

class Game extends Component {
  static propTypes = {
    add: PropTypes.number.isRequired,
    beatInput: PropTypes.number.isRequired,
    beatInterval: PropTypes.number.isRequired,
    beatWait: PropTypes.number.isRequired,
    digitsAmount: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      baseNumber: this.baseNumber(),
      beat: 0,
      inputValue: '',
      inputDisabled: true,
      inputStatus: null,
      tick: 0
    };

    this.inputRef = createRef();
  }

  componentDidMount = () => {
    const { beatInterval } = this.props;

    this.timer = setInterval(
      () => this.tick(),
      beatInterval
    );
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { inputDisabled } = this.state;
    const { inputDisabled: prevInputDisabled } = prevState;

    if (!inputDisabled && inputDisabled !== prevInputDisabled) {
      this.inputRef.current.focus();
    }
  }

  addNumber = ({ add, baseNumber }) => {
    return parseInt(
      `${baseNumber}`.split('')
        .map(num => {
          const int = parseInt(num)
          const added = int + add
          return added >= 10 ? added - 10 : added
        })
        .join('')
    )
  }

  baseNumber = () => {
    const { digitsAmount } = this.props;
    const min = Math.pow(10, digitsAmount - 1);
    const max = Math.pow(10, digitsAmount) - 1;

    return parseInt(Math.random() * (max - min) + min)
  }

  handleInput = (event) => {
    const { value } = event.target;

    this.setState({
      inputValue: value
    });
  }

  inputField = () => {
    const { inputValue, inputDisabled } = this.state;
    const atts = {
      onChange: this.handleInput,
      ref: this.inputRef,
      value: inputValue
    }

    if (inputDisabled) {
      atts.disabled = true;
    }

    return (
      <input {...atts} />
    )
  }

  tick = () => {
    const { baseNumber, beat, inputValue, tick } = this.state;
    const { add, beatInput, beatWait } = this.props;
    const addNumber = this.addNumber({ baseNumber, add });
    const newBeat = (beat + 1) % (beatWait + beatInput);
    let newState = {
      tick: tick + 1,
      beat: newBeat
    };

    if (newBeat === beatWait) {
      newState.inputDisabled = false;
    }

    if (newBeat === 0) {
      newState.baseNumber = this.baseNumber();
      newState.inputDisabled = true;
      newState.inputStatus = null;

      if (inputValue !== '') {
        newState.inputStatus = (addNumber === parseInt(inputValue) ? '✅ Correct!' : '❌ Incorrect!') + ` (${addNumber})`;
        newState.inputValue = '';
      }
    }

    this.setState(newState);
  }

  render() {
    const { beat, baseNumber, inputStatus } = this.state;

    return (
      <div className="game">
        <header>
          <h2>{baseNumber}</h2>
        </header>

        <article>
          <div className="beat">
            {new Array(beat + 1).fill('•').map(bullet => bullet)}
          </div>

          <div className="answer">
            {this.inputField()}
          </div>
        </article>

        <footer>
          {inputStatus && (
            <div className="status">
              {inputStatus}
            </div>
          )}
        </footer>
      </div>
    )
  }
}

export default Game