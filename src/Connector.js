import React from 'react';

function Connector({ type, color }) {
    return (
        <div className="connector">
            <div className={"connectorLine " + type} style={{ background: color }} />
        </div>
    );
}

export default Connector;