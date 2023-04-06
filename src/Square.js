import React from 'react';
import { numberToColor } from './util';

class Square extends React.Component {
    render() {
        // value === 0 means the square is empty.
        const { value, onClick, onMouseEnter, className } = this.props;
        return (
            <div
                className={"square" + (className ? " " + className : "")}
                style={value === 0 ? undefined : { backgroundColor: numberToColor(this.props.value) }}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
            >
                {value === 0 ? "" : value}
            </div>
        );
    }
}

export default Square;