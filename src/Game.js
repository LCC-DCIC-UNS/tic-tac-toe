import React from 'react';
import PengineClient from './PengineClient';
import Board from './Board';

/**
 * Representation of color enumerate as object where each property key defines an enum value (a color), and the
 * associated property value (the string) defines the color name.
 *
 * Values: RED, VIOLET, PINK, GREEN, BLUE, YELLOW
 */

const colors = Object.freeze({
  RED: "red",
  VIOLET: "violet",
  PINK: "pink",
  GREEN: "green",
  BLUE: "blue",
  YELLOW: "yellow"
});

/*
 * Returns the CSS representation of the received color.
 */

export function colorToCss(color) {
  return colors[color];
}

/*
 * Returns the Prolog representation of the received color
 */

function colorToProlog(color) {
  return colors[color].charAt(0);
}

/*
 * Returns the color in colors enum associated to pColor, in Prolog representation.
 */

function colorFromProlog(pColor) {
  for (let color in colors) {
    if (colorToProlog(color) == pColor)
      return color;
  }
  return null;
}

function gridToProlog(grid) {
  return grid.map(row => row.map(cell => colorToProlog(cell)));
}

function gridFromProlog(grid) {
  return grid.map(row => row.map(cell => colorFromProlog(cell)));
}

class Game extends React.Component {

  pengine;

  constructor(props) {
    super(props);
    this.state = {
      turns: 0,
      grid: null,
      complete: false,  // values: 'X' (X is the winner), 'O' (O is the winner), 'T' (tie), '?' (game in progress)
      waiting: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePengineCreate = this.handlePengineCreate.bind(this);
    this.pengine = new PengineClient(this.handlePengineCreate);
  }

  handlePengineCreate() {
    const queryS = 'init(Grid)';
    this.pengine.query(queryS, (success, response) => {
      if (success) {
        this.setState({
          grid: gridFromProlog(response['Grid'])
        });
      }
    });
  }

  handleClick(color) {
    // No action on click if game is complete or we are waiting for game status.
    if (this.state.complete) {
      return;
    }
    // Build Prolog query to make a move and get the updated game status.
    // Calls to PengineClient.stringify() are to explicitly quote terms for player and board cells ('X', 'Y' and '-')
    // The query will be like: put('X',0,['-','-','-','-','-','-','-','-','-'],BoardRes),gameStatus(BoardRes, Status) 
    const gridS = PengineClient.stringify(gridToProlog(this.state.grid));
    const queryS = "flick(" + gridS + "," + PengineClient.stringify(colorToProlog(color)) + ", Grid)";
    this.setState({
      waiting: true
    });
    this.pengine.query(queryS, (success, response) => {
      if (success) {
        this.setState({
          grid: gridFromProlog(response['Grid']),
          waiting: false
        });
      } else {
        // Prolog query will fail when the user clicked on a non empty cell.
        this.setState({
          waiting: false
        });
      }
    });
  }

  render() {
    if (this.state.grid === null) {
      return null;
    }
    return (
      <div className="game">
        <div className="leftPanel">
          <div className="buttonsPanel">
            {Object.keys(colors).map(color =>
              <button
                className="colorBtn"
                style={{ backgroundColor: colorToCss(color) }}
                onClick={() => this.handleClick(color)}
                key={color}
              />)}
          </div>
          <div className="turnsPanel">
            <div className="turnsLab">Turns</div>
            <div className="turnsNum">{this.state.turns}</div>
          </div>
        </div>
        <Board
          grid={this.state.grid}
        />
      </div>
    );
  }
}

export default Game;
