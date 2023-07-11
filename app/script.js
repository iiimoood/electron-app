import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'off',
      time: 0,
      timer: null,
    };

    this.stopTimer = this.stopTimer.bind(this);
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = String(minutes).padStart(2, '0');

    const remainingSeconds = seconds % 60;
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  startTimer = () => {
    const { status, timer } = this.state;

    const playBell = () => {
      const bell = new Audio('./sounds/bell.wav');
      bell.play();
    };

    this.setState({
      time: 1200,
      status: 'work',
      timer: setInterval(() => {
        this.setState((prevState) => {
          const updatedTime = prevState.time - 1;

          if (updatedTime === 0 && prevState.status === 'work') {
            playBell();
            return {
              time: 20,
              status: 'rest',
            };
          }

          if (updatedTime === 0 && prevState.status === 'rest') {
            playBell();
            return {
              time: 1200,
              status: 'work',
            };
          }

          return {
            time: updatedTime,
          };
        });
      }, 1000),
    });
  };

  stopTimer() {
    clearInterval(this.state.timer);
    this.setState({
      time: 0,
      status: 'off',
    });
  }

  closeApp() {
    window.close();
  }

  render() {
    const { status, time, timer } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' && (
          <div className="content">
            <p>
              According to optometrists in order to save your eyes, you should
              follow the 20/20/20. It means you should to rest your eyes every
              20 minutes for 20 seconds by looking more than 20 feet away.
            </p>
            <p>
              This app will help you track your time and inform you when it's
              time to rest.
            </p>
          </div>
        )}
        {status === 'work' && <img src="./images/work.png" />}
        {status === 'rest' && <img src="./images/rest.png" />}
        {status !== 'off' && (
          <div className="timer">{this.formatTime(time)}</div>
        )}
        {status === 'off' && (
          <button className="btn" onClick={this.startTimer}>
            Start
          </button>
        )}
        {status !== 'off' && (
          <button className="btn" onClick={this.stopTimer}>
            Stop
          </button>
        )}
        <button className="btn btn-close" onClick={this.closeApp}>
          X
        </button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
