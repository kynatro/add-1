import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';
class App extends Component {
  static defaultProps = {
    add: 1,
    beatWait: 2,
    metronone: 1000,
    numberLength: 4
  }

  static propTypes = {
    add: PropTypes.number.isRequired,
    beatWait: PropTypes.number.isRequired,
    metronone: PropTypes.number.isRequired,
    numberLength: PropTypes.number.isRequired
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
    const { metronone } = this.props;

    this.timer = setInterval(
      () => this.tick(),
      metronone
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
    const { numberLength } = this.props;
    const min = Math.pow(10, numberLength - 1);
    const max = Math.pow(10, numberLength) - 1;

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
    const { add, beatWait } = this.props;
    const addNumber = this.addNumber({ baseNumber, add });
    const newBeat = (beat + 1) % (beatWait + 1);
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
    const { add, numberLength } = this.props;

    return (
      <div className="App">
        <h1>{baseNumber}</h1>

        <div className="beat">
          {new Array(beat+1).fill('•').map(bullet => bullet)}
        </div>

        <div className="answer">
          {this.inputField()}
        </div>
        
        {inputStatus && (
          <div className="status">
            {inputStatus}
          </div>
        )}

        <div className="instructions">
          <p>Add {add} to each number in the {numberLength} digit number shown above.</p>
        </div>
      </div>
    );
  }
}

export default App;
