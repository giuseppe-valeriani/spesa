import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import FoodList from "./components/FoodList";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "@firebase/firestore";
import "./styles/main.scss";

export default function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [filteredList, setFilteredList] = useState("");

  //React Hook Form

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handling Firestore Informations

  useEffect(() => {
    const collectionRef = collection(db, "list");
    const q = query(collectionRef, orderBy("name"));
    const getUsers = async () => {
      const data = await getDocs(q);
      const cleanedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setShoppingList(cleanedData);
    };

    getUsers();
  }, []);

  //Adding food

  const onSubmit = async ({ name, shop }) => {
    const newFood = {
      id: uuidv4(),
      home: false,
      name: name.trim().toLowerCase(),
      shop: shop,
    };
    setShoppingList([...shoppingList, newFood]);
    await setDoc(doc(db, "list", `${newFood.id}`), newFood);
    reset();
  };

  //Deleting food

  const deleteFood = async (selected) => {
    const deleted = shoppingList.filter(
      (current) => current.id !== selected.id
    );
    setShoppingList(deleted);
    await deleteDoc(doc(db, "list", selected.id));
  };

  //Switching food status

  const buyFood = async (selected) => {
    const bought = shoppingList.reduce((acc, curr) => {
      if (curr.id === selected.id) {
        return [
          ...acc,
          {
            id: selected.id,
            home: !selected.home,
            name: selected.name,
            shop: selected.shop,
          },
        ];
      }
      return [...acc, curr];
    }, []);
    setShoppingList(bought);
    const gettingRef = doc(db, "list", selected.id);
    await updateDoc(gettingRef, {
      home: !selected.home,
    });
  };

  return (
    <main className="viewport">
      <h1 className="header">Shopping List</h1>
      <section className="input-box">
        <form
          className="input-box__container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="food-name">
            <input
              id="food-name"
              className="input-box__input"
              placeholder="What do you need?"
              {...register("name", {
                required: {
                  value: true,
                  message: "You need to name a food!",
                },
              })}
            />
          </label>
          {errors.name && (
            <p className="input-box__errors">{errors.name.message}</p>
          )}
          <div>
            <input
              id="lidl"
              type="radio"
              value="L"
              {...register("shop", {
                required: {
                  value: true,
                  message: "You need to name a shop!",
                },
              })}
            />
            <label htmlFor="lidl" className="input-box__radio">
              Lidl
            </label>
            <input
              id="tesco"
              type="radio"
              value="T"
              {...register("shop", {
                required: {
                  value: true,
                  message: "You need to name a shop!",
                },
              })}
            />
            <label htmlFor="tesco" className="input-box__radio">
              Tesco
            </label>
            <input
              id="generic"
              type="radio"
              value="G"
              {...register("shop", {
                required: {
                  value: true,
                  message: "You need to name a shop!",
                },
              })}
            />
            <label htmlFor="generic" className="input-box__radio">
              Generic
            </label>
            {errors.shop && (
              <p className="input-box__errors">{errors.shop.message}</p>
            )}
          </div>
          <button className="input-box__button" type="submit">
            Add
          </button>
        </form>
      </section>

      {/* Here the filter field */}
      <section className="filter__box">
        <label aria-label="filter-box">
          <select
            id="filter-box"
            className="filter__box-select"
            value={filteredList}
            onChange={(e) => setFilteredList(e.target.value)}
          >
            <option value="">(All)</option>
            <option value="G">Generico</option>
            <option value="L">Lidl</option>
            <option value="T">Tesco</option>
          </select>
        </label>
      </section>

      {/* Rendered Food List */}

      <section className="list">
        <ul className="list__container">
          {shoppingList.length === 0 && (
            <p className="list__empty">No food present.</p>
          )}
          {shoppingList.length > 0 && filteredList.length === 0
            ? shoppingList.map((selectedFood) => (
                <li key={selectedFood.id}>
                  <FoodList
                    food={selectedFood}
                    deleteFood={deleteFood}
                    buyFood={buyFood}
                  />
                </li>
              ))
            : shoppingList
                .filter((data) => data.shop === filteredList)
                .map((selectedFood) => {
                  return (
                    <li key={selectedFood.id}>
                      <FoodList
                        food={selectedFood}
                        deleteFood={deleteFood}
                        buyFood={buyFood}
                      />
                    </li>
                  );
                })}
        </ul>
      </section>
    </main>
  );
}
