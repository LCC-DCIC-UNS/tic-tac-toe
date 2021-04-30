import React from 'react';

class Clue extends React.Component {
    render() {
        const clue = this.props.clue;
        return (
            <div className={"clue"} >
                {clue.map((num, i) =>
                    <div key={i}>
                        {num}
                    </div>
                )}
            </div>
        );
    }
}

export default Clue;