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
  const [state, setState] = useState([]);

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
      setState(cleanedData);
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
    setState([...state, newFood]);
    await setDoc(doc(db, 'list', `${newFood.id}`), newFood);
    reset();
  };

  //Deleting food

  const deleteFood = async (selected) => {
    const deleted = state.filter((current) => current.id !== selected.id);
    setState(deleted);
    await deleteDoc(doc(db, 'list', selected.id));
  };

  //Switching food status

  const buyFood = async (selected) => {
    const bought = state.reduce((acc, curr) => {
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
    setState(bought);
    const gettingRef = doc(db, 'list', selected.id);
    await updateDoc(gettingRef, {
      home: !selected.home,
    });
  };

  // Sorting food
  const sortFoodName = () => {
    const sorted = [...state].sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    setState(sorted);
  };

  const sortFoodShop = () => {
    const sorted = [...state].sort((a, b) => {
      if (a.shop > b.shop) return 1;
      if (a.shop < b.shop) return -1;
      return 0;
    });
    setState(sorted);
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
        {/* Rendered List */}
        {state.length > 0 ? (
          <div className="list">
            <div className="list__box">
              <button className="button pointer" onClick={sortFoodName}>
                Riordina per Nome
              </button>
              <button className="button pointer" onClick={sortFoodShop}>
                Riordina per Negozio
              </button>
            </div>
            <div className="list__rendered">
              {state.map((selectedFood) => {
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
