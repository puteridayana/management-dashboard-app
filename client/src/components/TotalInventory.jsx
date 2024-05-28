import React from 'react';

const TotalInventory = ({ count }) => {
    return (
        <div className="metric-card">
            <h4>Total Inventory Count</h4>
            <p>{count}</p>
        </div>
    );
};

export default TotalInventory;
