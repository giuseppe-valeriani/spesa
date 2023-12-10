import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import FoodList from '@/components/FoodList';
import { db } from '@/firebase';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from '@firebase/firestore';

export default function Home() {
  const [shoppingList, setShoppingList] = useState([]);
  const [filteredList, setFilteredList] = useState('');

  //React Hook Form

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handling Firestore Informations

  useEffect(() => {
    const collectionRef = collection(db, 'list');
    const q = query(collectionRef, orderBy('name'));
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
      name: name.trim(),
      shop: shop,
    };
    setShoppingList([...shoppingList, newFood]);
    await setDoc(doc(db, 'list', `${newFood.id}`), newFood);
    reset();
  };

  //Deleting food

  const deleteFood = async (selected) => {
    const deleted = shoppingList.filter(
      (current) => current.id !== selected.id
    );
    setShoppingList(deleted);
    await deleteDoc(doc(db, 'list', selected.id));
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
    const gettingRef = doc(db, 'list', selected.id);
    await updateDoc(gettingRef, {
      home: !selected.home,
    });
  };

  return (
    <>
      <Head>
        <title>Shopping List</title>
      </Head>
      <h1 className="header">Shopping List</h1>

      {/* Form new food */}
      <main>
        <section className="viewport">
          <article className="input-box">
            <form
              className="input-box__container"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="input-box__input"
                placeholder="What do you need?"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'You need to name a food!',
                  },
                })}
              />
              {errors.name && (
                <p className="input-box__errors">{errors.name.message}</p>
              )}
              <div>
                <input
                  type="radio"
                  value="L"
                  {...register('shop', {
                    required: {
                      value: true,
                      message: 'You need to name a shop!',
                    },
                  })}
                />
                <span className="input-box__radio">Lidl</span>
                <input
                  type="radio"
                  value="T"
                  {...register('shop', {
                    required: {
                      value: true,
                      message: 'You need to name a shop!',
                    },
                  })}
                />
                <span className="input-box__radio">Tesco</span>
                <input
                  type="radio"
                  value="G"
                  {...register('shop', {
                    required: {
                      value: true,
                      message: 'You need to name a shop!',
                    },
                  })}
                />
                <span className="input-box__radio">Generic</span>
                {errors.shop && (
                  <p className="input-box__errors">{errors.shop.message}</p>
                )}
              </div>
              <button className="input-box__button" type="submit">
                Aggiungi
              </button>
            </form>
          </article>

          {/* Here the filter field */}
          <article className="filter__box">
            <select
              className="filter__box--select"
              value={filteredList}
              onChange={(e) => setFilteredList(e.target.value)}
            >
              <option value="">(All)</option>
              <option value="G">Generico</option>
              <option value="L">Lidl</option>
              <option value="T">Tesco</option>
            </select>
          </article>

          {/* Rendered Food List */}

          <article className="list">
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
          </article>
        </section>
      </main>
    </>
  );
}
