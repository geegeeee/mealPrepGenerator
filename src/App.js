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

    // 🔥 STEP 1: filter by category
    const basePool =
      filter === "All"
        ? items
        : items.filter((item) => item.category === filter);

    if (basePool.length === 0) {
      setGeneratedItem(`No items in ${filter}`);
      return;
    }

    setIsSpinning(true);
    setGeneratedItem("");

    let spinCount = 0;

    const spinInterval = setInterval(() => {
      const tempIndex = Math.floor(Math.random() * basePool.length);
      setGeneratedItem(basePool[tempIndex].name);
      spinCount++;

      if (spinCount > 10) {
        clearInterval(spinInterval);

        // 🔥 STEP 2: remove last 3 generated items
        let filteredPool = basePool.filter(
          (item) => !history.slice(-5).includes(item.name)
        );

        // fallback if everything got filtered out
        if (filteredPool.length === 0) {
          filteredPool = basePool;
        }

        // 🔥 STEP 3: final selection
        const final =
          filteredPool[Math.floor(Math.random() * filteredPool.length)];

        setGeneratedItem(final.name);

        // 🔥 STEP 4: update history
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