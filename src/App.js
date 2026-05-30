import './App.css';
import { useEffect, useState } from 'react';

import ItemList from "./components/ItemList";
import RandomGenerator from "./components/RandomGenerator";

function App() {
  const [items, setItems] = useState([]);
  const [generatedItem, setGeneratedItem] = useState([]);

  useEffect(()=>{
    const savedItems = localStorage.getItem("foodItems");

    if(savedItems){
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // save items whenever they change
  useEffect(()=>{
    localStorage.setItem("foodItems", JSON.stringify(items));
  },[items]);

  const addItem = (item) => {
    if(!item.trim()) return;
    setItems([...items, item]);
  };

  const deleteItem = (indextoDelete) => {
    const updatedItems = items.filter(
      (_, index) => index !== indextoDelete
    );
    setItems(updatedItems);
  };

  const generateRandomItem = () => {
    if(items.length ===0){
      setGeneratedItem("No food items available.");
      return;
    }
    const randomIndex = Math.floor(
      Math.random()*Math.random()*items.length
    );
    setGeneratedItem(items[randomIndex]);
  };

  return (
    <div className='container'>
      <div className='left-panel'>
        <ItemList
          items = {items}
          addItem = {addItem}
          deleteItem = {deleteItem}
        />
      </div>
      <div className='right-panel'>
        <RandomGenerator
          generatedItem = {generatedItem}
          generateRandomItem = {generateRandomItem}
        />
      </div>
    </div>
  );
}

export default App;
