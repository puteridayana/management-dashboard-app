import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddInventoryItem = ({ handleAddItem }) => {
    const [itemName, setItemName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddItem(itemName);
        setItemName('');
    };

    return (
        <div className="crud-component">
            <h4>Add Inventory</h4>
            <form onSubmit={handleSubmit} className="d-flex align-items-center">
                <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Item Name"
                    className="form-control"
                    style={{ width: "200px", fontSize: "12px", margin: "0 10px 0 0", backgroundColor: " #dbe9f6" }}
                    required
                />
                <button type="submit" className="btn btn-primary" style={{ width: "50px", fontSize: "12px", margin: "0 10px 0 0" }}>Add</button>
            </form>
        </div>
    );
};

export default AddInventoryItem;
