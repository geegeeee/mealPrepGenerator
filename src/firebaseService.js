import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

const mealsRef = collection(db, "meals");

// ADD
export const addMeal = (meal) => {
  return addDoc(mealsRef, meal);
};

// DELETE
export const deleteMeal = (id) => {
  return deleteDoc(doc(db, "meals", id));
};

// REAL-TIME READ
export const subscribeToMeals = (callback) => {
  return onSnapshot(mealsRef, (snapshot) => {
    const meals = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(meals);
  });
};