import { useState } from "react";

function ItemList({ items, addItem, deleteItem, setFilter, currentFilter }) {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("Asian");

  const handleAdd = () => {
    addItem(input, category);
    setInput("");
  };

  const categories = ["All", "Asian", "Western", "Quick", "Healthy"];

  return (
    <div className="panel">

      <h2 className="title">🍱 Meal Ideas</h2>

      {/* FILTER BUTTONS */}
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${currentFilter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* INPUT */}
      <div className="input-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add meal..."
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Asian</option>
          <option>Western</option>
          <option>Quick</option>
          <option>Healthy</option>
        </select>

        <button className="add-btn" onClick={handleAdd}>
          Add +
        </button>
      </div>

      {/* LIST */}
      <ul className="list">
        {items.map((item, index) => (
          <li key={index} className="item animate-item">
            <button
              className="delete-btn"
              onClick={() => deleteItem(item.id)}
            >
              −
            </button>

            <span className="item-name">{item.name}</span>

            <span className="tag">{item.category}</span>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default ItemList;