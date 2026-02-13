import React from 'react';

interface ConnectorProps {
    type: "horizontal" | "vertical";
    color?: string;
}

function Connector({ type, color }: ConnectorProps) {
    return (
        <div className="connector">
            <div className={"connectorLine " + type} style={{ background: color }} />
        </div>
    );
}

export default Connector;