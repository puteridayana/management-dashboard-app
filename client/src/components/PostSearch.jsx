import React from 'react';

const PostSearch = ({ searchTerm, handleSearchChange }) => {
    return (
        <div className="search-container">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by post title"
            />
        </div>
    );
};

export default PostSearch;
