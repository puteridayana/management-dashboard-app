import React, { useState } from 'react';

const UpdateInventory = ({ selectedItem, handleUpdateInventory }) => {
    const [updatedName, setUpdatedName] = useState(selectedItem.name);
    const [updatedQuantity, setUpdatedQuantity] = useState(selectedItem.quantity);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedItem = { ...selectedItem, name: updatedName, quantity: parseInt(updatedQuantity) };
        handleUpdateInventory(updatedItem);
    };

    return (
        <div className="crud-component">
            <h3>Update Inventory</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    value={updatedQuantity}
                    onChange={(e) => setUpdatedQuantity(e.target.value)}
                    required
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateInventory;
