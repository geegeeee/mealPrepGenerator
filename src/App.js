import './App.css';
import { useEffect, useState } from 'react';

import { addMeal, deleteMeal, subscribeToMeals } from "./firebaseService";
import ItemList from "./components/ItemList";
import RandomGenerator from "./components/RandomGenerator";

function App() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("foodItems");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [generatedItem, setGeneratedItem] = useState("");
  const [history, setHistory] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [filter, setFilter] = useState("All");

  // Save to localStorage whenever items change
  // useEffect(() => {
  //   localStorage.setItem("foodItems", JSON.stringify(items));
  // }, [items]);

  const addItem = (item, category) => {
    if (!item.trim()) return;

    const newItem = {
      name: item.trim(),
      category: category || "Uncategorized"
    };

    const exists = items.some(
      (i) => i.name.toLowerCase() === newItem.name.toLowerCase()
    );

    if (exists) return;

    // ALSO send to Firebase
    addMeal(newItem);
  };

  const deleteItem = (id) => {
    deleteMeal(id);
  };

  const generateRandomItem = () => {
    if (items.length === 0) {
      setGeneratedItem("No food items available.");
      return;
    }

    // 🔥 STEP 1: apply filter first
    const pool =
      filter === "All"
        ? items
        : items.filter((item) => item.category === filter);

    // if no items in selected category
    if (pool.length === 0) {
      setGeneratedItem(`No items in ${filter}`);
      return;
    }

    setIsSpinning(true);
    setGeneratedItem("");

    let spinCount = 0;

    const spinInterval = setInterval(() => {
      const tempIndex = Math.floor(Math.random() * pool.length);
      setGeneratedItem(pool[tempIndex].name);
      spinCount++;

      if (spinCount > 10) {
        clearInterval(spinInterval);

        // final selection (same pool!)
        const final =
          pool[Math.floor(Math.random() * pool.length)];

        setGeneratedItem(final.name);
        setHistory((prev) => [...prev, final.name]);
        setIsSpinning(false);
      }
    }, 100);
  };

  const filteredItems =
  filter === "All"
    ? items
    : items.filter((item) => item.category === filter);

  useEffect(() => {
    const unsubscribe = subscribeToMeals((data) => {
      setItems(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <div className="left-panel">
        <ItemList
            items={filteredItems}
            addItem={addItem}
            deleteItem={deleteItem}
            setFilter={setFilter}
            currentFilter={filter}
          />
      </div>

      <div className="right-panel">
        <RandomGenerator
          generatedItem={generatedItem}
          generateRandomItem={generateRandomItem}
          isSpinning={isSpinning}
        />
      </div>
    </div>
  );
}

export default App;