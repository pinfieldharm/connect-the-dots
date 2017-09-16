import React, {Component} from 'react';
import cx from 'classnames';
import { isSquare } from './geometry';

import './Game.css';

const pointString = points => points.map(([x, y]) => `${x},${y}`).join(" ")

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
          squares: [...squares, selections],
          selectedSquare: undefined
        });
      } else {
        this.setState({
          selections: [],
          selectedSquare: undefined
        });
      }
    } else {
      this.setState({
        selections,
        selectedSquare: undefined
      });
    }
  };

  selectSquare = index => {
    const { selectedSquare } = this.state;
    if (selectedSquare === index) {
      this.setState({
        selectedSquare: undefined,
        selections: []
      });
    } else {
      this.setState({
        selectedSquare: index,
        selections: []
      })
    }
  };


  render() {
    const {grid} = this.props;
    const {squares, selections, selectedSquare} = this.state;
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
          className={ cx("square", { "square-selected": selectedSquare === i })}
          points={ pointString(points) }
          key={`square-${i}`}
          onClick={ () => this.selectSquare(i) }
        />
      )
    });

    const inProgress = (
      <polyline className="in-progress"
                points={ pointString(selections) }/>
    );

    return (
      <svg width="100%" height="100%" viewBox="-0.5 -0.5 6 6">
        { squareBoxes }
        { points }
        { inProgress }
      </svg>
    )
  }
}
