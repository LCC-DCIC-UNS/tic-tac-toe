import React from 'react';
import PengineClient from './PengineClient';
import Board from './Board';
import { joinResult } from './util';

class Game extends React.Component {

  pengine;

  constructor(props) {
    super(props);

    this.state = {
      grid: null,
      numOfColumns: null,
      score: 0,
      path: [],
      waiting: false
    };

    // Make references to 'this' (e.g. this.state) inside methods to refer to the current object. 
    this.onPathChange = this.onPathChange.bind(this);
    this.onPathDone = this.onPathDone.bind(this);
    this.animateEffect = this.animateEffect.bind(this);
    this.onServerReady = this.onServerReady.bind(this);

    PengineClient.init(this.onServerReady);
  }

  /**
   * Called when the server was successfully initialized
   */
  onServerReady(instance) {
    this.pengine = instance;
    const queryS = 'init(Grid, NumOfColumns)';
    this.pengine.query(queryS, (success, response) => {
      if (success) {
        this.setState({
          grid: response['Grid'],
          numOfColumns: response['NumOfColumns']
        });
      }
    });
  }

  /**
   * Called while the user is drawing a path in the grid, each time the path changes.
   */
  onPathChange(path) {
    // No effect if waiting.
    if (this.state.waiting) {
      return;
    }
    this.setState({ path });
    console.log(JSON.stringify(path));
  }

  /**
   * Called when the user finished drawing a path in the grid.
   */
  onPathDone() {
    /*
    Build Prolog query, which will be like:
    join([
          64,4,64,32,16,
          64,8,16,2,32,
          2,4,64,64,2,
          2,4,32,16,4,
          16,4,16,16,16,
          16,64,2,32,32,
          64,2,64,32,64,
          32,2,64,32,4
          ], 
          5, 
          [[2, 0], [3, 0], [4, 1], [3, 1], [2, 1], [1, 1], [1, 2], [0, 3]],
          RGrids
        ).
    */
    const gridS = JSON.stringify(this.state.grid);
    const pathS = JSON.stringify(this.state.path);
    const queryS = "join(" + gridS + "," + this.state.numOfColumns + "," + pathS + ", RGrids)";
    this.setState({
      waiting: true
    });
    this.pengine.query(queryS, (success, response) => {
      if (success) {
        this.setState({
          score: this.state.score + joinResult(this.state.path, this.state.grid, this.state.numOfColumns),
          path: []
        });
        this.animateEffect(response['RGrids']);
      } else {
        this.setState({
          waiting: false
        });
      }
    });
  }

  /**
   * Displays each grid of the sequence as the current grid in 1sec intervals.
   * @param {number[][]} rGrids a sequence of grids.
   */
  animateEffect(rGrids) {
    this.setState({
      grid: rGrids[0]
    });
    const restRGrids = rGrids.slice(1);
    if (restRGrids.length > 0) {
      setTimeout(() => {
        this.animateEffect(restRGrids);
      }, 1000);
    } else {
      this.setState({
        waiting: false
      });
    }

  }

  render() {
    if (this.state.grid === null) {
      return null;
    }
    return (
      <div className="game">
        <div className="header">
          <div className="score">{this.state.score}</div>
        </div>
        <Board
          grid={this.state.grid}
          numOfColumns={this.state.numOfColumns}
          path={this.state.path}
          onPathChange={this.onPathChange}
          onDone={this.onPathDone}
        />
      </div>
    );
  }
}

export default Game;