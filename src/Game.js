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

/**
 * Returns the CSS representation of the received color.
 */

export function colorToCss(color) {
  return colors[color];
}

/**
 * Returns the Prolog representation of the received color
 */

function colorToProlog(color) {
  return colors[color].charAt(0);
}

/**
 * Returns the color in colors enum associated to pColor, in Prolog representation.
 */

function colorFromProlog(pColor) {
  for (const color in colors) {
    if (colorToProlog(color) == pColor)
      return color;
  }
  return null;
}

/**
 * Transforms grid to Prolog representation 
 */

function gridToProlog(grid) {
  return grid.map(row => row.map(cell => colorToProlog(cell)));
}

/**
 * Transforms grid from Prolog representation 
 */

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
      complete: false,  // true if game is complete, false otherwise
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
    // No action on click if game is complete or we are waiting.
    if (this.state.complete || this.state.waiting) {
      return;
    }
    // Build Prolog query to apply the color flick.
    // Calls to PengineClient.stringify() are to explicitly quote terms for player and board cells.
    // The query will be like:
    // flick([["g","g","b","g","v","y","p","v","b","p","v","p","v","r"],
    //        ["r","r","p","p","g","v","v","r","r","b","g","v","p","r"],
    //        ["b","v","g","y","b","g","r","g","p","g","p","r","y","y"],
    //        ["r","p","y","y","y","p","y","g","r","g","y","v","y","p"],
    //        ["y","p","y","v","y","g","g","v","r","b","v","y","r","g"],
    //        ["r","b","v","g","b","r","y","p","b","p","y","r","y","y"],
    //        ["p","g","v","y","y","r","b","r","v","r","v","y","p","y"],
    //        ["b","y","v","g","r","v","r","g","b","y","b","y","p","g"],
    //        ["r","b","b","v","g","v","p","y","r","v","r","y","p","g"],
    //        ["v","b","g","v","v","r","g","y","b","b","b","b","r","y"],
    //        ["v","v","b","r","p","b","g","g","p","p","b","y","v","p"],
    //        ["r","p","g","y","v","y","r","b","v","r","b","y","r","v"],
    //        ["r","b","b","v","p","y","p","r","b","g","p","y","b","r"],
    //        ["v","g","p","b","v","v","g","g","g","b","v","g","g","g"]],"r", Grid)
    const gridS = PengineClient.stringify(gridToProlog(this.state.grid));
    const queryS = "flick(" + gridS + "," + PengineClient.stringify(colorToProlog(color)) + ", Grid)";
    this.setState({
      waiting: true
    });
    this.pengine.query(queryS, (success, response) => {
      if (success) {
        this.setState({
          grid: gridFromProlog(response['Grid']),
          turns: this.state.turns + 1,
          waiting: false
        });
      } else {
        // Prolog query will fail when the clicked color coincides with that in the top left cell.
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
        <Board grid={this.state.grid} />
      </div>
    );
  }
}

export default Game;