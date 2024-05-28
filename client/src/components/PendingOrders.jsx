import React from 'react';

const PendingOrders = ({ count }) => {
    return (
        <div className="metric-card">
            <h4>Pending Orders</h4>
            <p>{count}</p>
        </div>
    );
};

export default PendingOrders;
