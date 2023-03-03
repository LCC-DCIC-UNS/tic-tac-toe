import React from 'react';
import { numberToColor } from './util';

class Square extends React.Component {
    render() {
        const { value, onClick, onMouseEnter } = this.props;
        return (
            <div
                className={"square"}
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