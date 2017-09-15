import React, {Component} from 'react';

export class Game extends Component {
  render() {
    const spacing = 100;
    const grid = [
      [0, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 0]
    ];

    const transform = `scale(${spacing}) translate(0.5, 0.5) `;
    const radius = 0.1;
    const points = [];
    for (let y = 0; y < grid.length; y++) {
      let row = grid[y];
      for (let x = 0; x < row.length; x++) {
        let value = row[x];
        if (value === 1) {
          points.push(
            <circle
              cx={ x }
              cy={ y }
              transform={ transform }
              r={radius}
              fill="black"
              onClick={ () => alert(`${x} ${y}`)}
              key={`point-${x}-${y}`}/>
          );
        }
      }
    }

    return (
      <svg width={spacing * 7} height={spacing * 7}>
        { points }
      </svg>
    )
  }
}
