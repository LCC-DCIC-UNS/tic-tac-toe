import React from 'react';
import { numberToColor } from './util';

class Square extends React.Component {
    render() {
        const { value, onClick, onMouseEnter, className } = this.props;
        return (
            <div
                className={"square" + (className ? " " + className : "")}
                style={{ backgroundColor: numberToColor(this.props.value) }}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
            >
                {value}
            </div>
        );
    }
}

export default Square;