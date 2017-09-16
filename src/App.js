import React, {Component} from 'react';
import {Game} from './Game';
import {parseGrid, grids} from './grids';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { gridIndex: 0 }
  }

  changeGrid = event => {
    this.setState( { gridIndex : event.target.value });
  }

  render() {
    const { gridIndex } = this.state;
    return (
      <div className="App">
        <select value={ gridIndex } onChange={ this.changeGrid }>
          { grids.map( (g, index) => <option key={index} value={index}>{ index }</option>)}
        </select>
        <div className="App__grid">
          <Game grid={ parseGrid(gridIndex) }/>
        </div>
      </div>
    );
  }
}

export default App;
