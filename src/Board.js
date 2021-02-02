import React from 'react';
import styles from './Board.module.css';

function Square(props) {
    return (
        <button className={styles.square} onClick={props.onClick}>
            {props.value !== '-' ? props.value : null}
        </button>
    );
}

class Board extends React.Component {
    render() {
        return (
            <div className={styles.board}>
                {this.props.squares.map((square, i) =>
                    <Square
                        value={square}
                        onClick={() => this.props.onClick(i)}
                        key={i}
                    />
                )}
            </div>
        );
    }
}

export default Board;