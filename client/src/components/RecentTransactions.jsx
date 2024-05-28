// RecentTransactions.jsx
import React from 'react';

const RecentTransactions = ({ transactions }) => {
    return (
        <div className="recent-transactions">
            <h4>Recent Transactions</h4>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>{transaction}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecentTransactions;
