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
} from 'firebase/firestore';

export default function Home() {
  const [shoppingList, setShoppingList] = useState([]);
  const [filteredList, setFilteredList] = useState('A');

  // Filtering Logic
  const filtered = ['A', 'G', 'L', 'T'];

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
        <title>Lista della Spesa</title>
      </Head>
      <h1> Lista della Spesa</h1>
      {/* Form new food */}
      <div className="box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Che manca?"
            {...register('name', {
              required: { value: true, message: 'Serve sapere che cibo!' },
            })}
          />
          {errors.name && <p className="errors">{errors.name.message}</p>}
          <div>
            <input
              type="radio"
              value="L"
              {...register('shop', {
                required: {
                  value: true,
                  message: 'Serve sapere che negozio!',
                },
              })}
            />
            <span className="radio">Lidl</span>
            <input
              type="radio"
              value="T"
              {...register('shop', {
                required: {
                  value: true,
                  message: 'Serve sapere che negozio!',
                },
              })}
            />
            <span className="radio">Tesco</span>
            <input
              type="radio"
              value="G"
              {...register('shop', {
                required: {
                  value: true,
                  message: 'Serve sapere che negozio!',
                },
              })}
            />
            <span className="radio">Generico</span>
            {errors.shop && <p className="errors">{errors.shop.message}</p>}
          </div>
          <input className="pointer" type="submit" />
        </form>
        {/* Here the filter field */}
        <div className="list__box">
          <select
            value={filteredList}
            onChange={(e) => setFilteredList(e.target.value)}
          >
            <option value={filtered[0]}>(All)</option>
            <option value={filtered[1]}>Generico</option>
            <option value={filtered[2]}>Lidl</option>
            <option value={filtered[3]}>Tesco</option>
          </select>
        </div>
        {/* Rendered List */}
        {shoppingList.length > 0 && filteredList === filtered[0] ? (
          <div className="list">
            <div className="list__rendered">
              {shoppingList.map((selectedFood) => {
                return (
                  <ul key={selectedFood.id}>
                    <FoodList
                      food={selectedFood}
                      deleteFood={deleteFood}
                      buyFood={buyFood}
                    />
                  </ul>
                );
              })}
            </div>
          </div>
        ) : null}
        {shoppingList.length > 0 && filteredList === filtered[1] ? (
          <div className="list">
            <div className="list__rendered">
              {shoppingList
                .filter((shop) => shop.shop === filtered[1])
                .map((selectedFood) => {
                  return (
                    <ul key={selectedFood.id}>
                      <FoodList
                        food={selectedFood}
                        deleteFood={deleteFood}
                        buyFood={buyFood}
                      />
                    </ul>
                  );
                })}
            </div>
          </div>
        ) : null}
        {shoppingList.length > 0 && filteredList === filtered[2] ? (
          <div className="list">
            <div className="list__rendered">
              {shoppingList
                .filter((shop) => shop.shop === filtered[2])
                .map((selectedFood) => {
                  return (
                    <ul key={selectedFood.id}>
                      <FoodList
                        food={selectedFood}
                        deleteFood={deleteFood}
                        buyFood={buyFood}
                      />
                    </ul>
                  );
                })}
            </div>
          </div>
        ) : null}
        {shoppingList.length > 0 && filteredList === filtered[3] ? (
          <div className="list">
            <div className="list__rendered">
              {shoppingList
                .filter((shop) => shop.shop === filtered[3])
                .map((selectedFood) => {
                  return (
                    <ul key={selectedFood.id}>
                      <FoodList
                        food={selectedFood}
                        deleteFood={deleteFood}
                        buyFood={buyFood}
                      />
                    </ul>
                  );
                })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
