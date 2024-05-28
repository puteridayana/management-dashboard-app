import React from 'react';

const UserFilter = ({ users, selectedUser, handleUserChange }) => {
    return (
        <div className="filter-container">
            <label htmlFor="userFilter">Filter </label>
            <select id="userFilter" value={selectedUser} onChange={handleUserChange}>
                <option value="">All Users</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
        </div>
    );
};

export default UserFilter;
