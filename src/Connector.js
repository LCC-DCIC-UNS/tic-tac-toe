import React from 'react';

class Connector extends React.Component {
    render() {
        const { type, color } = this.props;
        return (
            <div className="connector">
                <div className={"connectorLine " + type} style={{ background: color }} />
            </div>
        );
    }
}

export default Connector;