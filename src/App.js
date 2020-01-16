import React, { createRef, Component } from 'react';
import './App.scss';
class App extends Component {
  static defaultProps = {
    metronone: 1000,
    add: 1,
    beatWait: 2
  }

  constructor(props) {
    super(props);

    this.state = {
      baseNumber: this.baseNumber(),
      beat: 0,
      input: '',
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
    return parseInt(Math.random() * (9999 - 1000) + 1000)
  }

  handleInput = (event) => {
    const { value } = event.currentTarget;

    this.setState({
      input: value
    });
  }

  inputField = () => {
    const { input, inputDisabled } = this.state;
    const atts = {
      onChange: this.handleInput,
      ref: this.inputRef,
      value: input
    }

    if (inputDisabled) {
      atts.disabled = true;
    }

    return (
      <input {...atts} />
    )
  }

  tick = () => {
    const { baseNumber, beat, input, tick } = this.state;
    const { add, beatWait } = this.props;
    const addNumber = this.addNumber({ baseNumber, add });
    let newState = {
      tick: tick + 1,
      beat: (beat + 1) % (beatWait + 1)
    };

    if (beat === beatWait) {
      newState.inputDisabled = false;
    }

    if (beat === 0) {
      newState.baseNumber = this.baseNumber();
      newState.inputDisabled = true;
      newState.inputStatus = null;

      if (input !== '') {
        newState.inputStatus = (addNumber === parseInt(input) ? '✅ Correct!' : '❌ Incorrect!') + ` (${addNumber})`;
        newState.input = '';
      }
    }

    this.setState(newState);
  }

  render() {
    const { baseNumber, inputStatus } = this.state;

    return (
      <div className="App">
        <h1>{baseNumber}</h1>

        {this.inputField()}
        
        {inputStatus && (
          <div className="status">
            {inputStatus}
          </div>
        )}
      </div>
    );
  }
}

export default App;
