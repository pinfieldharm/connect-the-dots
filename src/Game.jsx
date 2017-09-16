import React, {Component} from 'react';
import cx from 'classnames';

import './Game.css';

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [],
      selections: []
    }
  }

  selectDot = (x, y) => () => {
    const {selections: prevSelections, squares} = this.state;
    const selections = [...prevSelections, [x, y]];
    if (selections.length === 4) {
      this.setState({
        selections: [],
        squares: [...squares, selections]
      });
    } else {
      this.setState({selections});
    }
  };


  render() {
    const {grid} = this.props;
    const {squares, selections} = this.state;
    const points = [];

    for (let y = 0; y < grid.length; y++) {
      let row = grid[y];
      for (let x = 0; x < row.length; x++) {
        let value = row[x];
        if (value === 1) {
          const selected = selections.some(([x1, y1]) => x1 === x && y1 === y);
          const used = squares.some(square => square.some(([x1, y1]) => x1 === x && y1 === y));
          points.push(
            <circle
              cx={ x }
              cy={ y }
              className={ cx('dot', {
                'dot-selected': selected,
                'dot-available': !selected && !used
              }) }
              r={0.1}
              onClick={ selected ? () => {} : this.selectDot(x, y) }
              key={ `point-${x}-${y}` }
            />
          );
        }
      }
    }


    const squareBoxes = squares.map((points, i) => {
      return (
        <polygon
          points={ points.map(([x, y]) => `${x},${y}`).join(" ") }
          key={`square-${i}`}
          fill="none"
          strokeWidth="0.025"
          stroke="red"
        />
      )
    });
    return (
      <svg width="100%" viewBox="-0.5 -0.5 6 6">
        { squareBoxes }
        { points }
      </svg>
    )
  }
}
