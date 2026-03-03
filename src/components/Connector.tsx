import React from 'react';
import styles from './Connector.module.css';

interface ConnectorProps {
    type: "horizontal" | "vertical";
    color?: string;
}

function Connector({ type, color }: ConnectorProps) {
    return (
        <div className={styles.connector}>
            <div className={`${styles.connectorLine} ${type === 'vertical' ? styles.vertical : ''}`} style={{ background: color }} />
        </div>
    );
}

export default Connector;