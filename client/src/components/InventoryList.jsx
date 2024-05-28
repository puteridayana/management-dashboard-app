import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InventoryList = ({ items, handleDeleteItem }) => {
    return (
        <div>
            <h4>Inventory List</h4>
            <ul className="list-group">
                {items.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ fontSize: "12px", width: "200px" }}>
                        {item.name}
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteItem(index)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryList;
