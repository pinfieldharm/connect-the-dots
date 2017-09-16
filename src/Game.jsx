import React, {Component} from 'react';
import cx from 'classnames';

import './Game.css';

const d2 = ([x1, y1], [x2, y2]) => {
  return (x2 - x1)**2 + (y2 - y1)**2;
};

const isSquare = ([p1, p2, p3, p4]) => {
  const d13 = d2(p1, p3);
  const d24 = d2(p2, p4);
  const d12 = d2(p1, p2);
  const d23 = d2(p2, p3);
  const d34 = d2(p3, p4);
  const d41 = d2(p4, p1);

  return (d13 === d24 && d12 === d34 && d23 === d41 && d12 === d23);
};

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
      if (isSquare(selections)) {
        this.setState({
          selections: [],
          squares: [...squares, selections]
        });
      } else {
        this.setState({
          selections: []
        });
      }
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
