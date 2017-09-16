import React, { Component } from 'react';
import { Game } from './Game';
import './App.css';

class App extends Component {
  render() {
    const grid = [
      [0, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 0]
    ];

    return (
      <div className="App">
        <Game grid={ grid } />
      </div>
    );
  }
}

export default App;
