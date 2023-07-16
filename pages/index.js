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

  const { register, handleSubmit, reset } = useForm();

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

  const onSubmit = async ({ name }) => {
    const newFood = {
      id: uuidv4(),
      name: name,
      home: false,
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
          { id: selected.id, name: selected.name, home: !selected.home },
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
  const sortFood = () => {
    const sorted = [...state].sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return;
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
            {...register('name', { required: true })}
          />
          <input type="submit" />
        </form>
        {/* Rendered List */}
        {state.length > 0 ? (
          <div className="list">
            <div className="list__box">
              <button className="button" onClick={sortFood}>
                Riordina
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
