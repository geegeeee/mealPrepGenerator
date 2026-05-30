import { useState } from "react";

function ItemList({items, addItem, deleteItem}){
    const [newItem, setNewItem] = useState("");
    const handleAdd = () => {
        addItem(newItem);
        setNewItem("");
    };

    return (
        <div>
            <h2>Meal Prep Ideas:</h2>
            <div className="input-selection">
                <input 
                    type = "text"
                    placeholder="Add meal prep ideas..."
                    value={newItem}
                    onChange={(e)=> setNewItem(e.target.value)}
                />
                <button>
                    onClick={handleAdd}
                    Add item
                </button>

                <ul>
                    {items.map((item,index) => {
                        <li key={index}>
                            <span>{item}</span>
                            <button onClick={deleteItem}>
                                Delete
                            </button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    );
}

export default ItemList;