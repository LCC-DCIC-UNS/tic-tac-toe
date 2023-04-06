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
    this.handlePengineCreate = this.handlePengineCreate.bind(this);

    this.pengine = new PengineClient(this.handlePengineCreate);
  }

  handlePengineCreate() {
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

  onPathChange(path) {
    // No effect if waiting.
    if (this.state.waiting) {
      return;
    }
    this.setState({ path }); 
    console.log(JSON.stringify(path));
  }

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

  animateEffect(rGrids) {
    if (rGrids.length === 0) {
      this.setState({
        waiting: false
      });
      return;
    }
    this.setState({
      grid: rGrids[0]
    });
    setTimeout(() => {
      this.animateEffect(rGrids.slice(1));
    }, 1000);
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