import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Card, Container, Row } from 'react-bootstrap';
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
} from 'firebase/firestore';

export default function Home() {
  const [state, setState] = useState([]);
  const [inputData, setInputData] = useState();

  // Handling Storage Informations

  const usersCollectionRef = collection(db, 'list');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const cleanedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setState(cleanedData);
    };

    getUsers();
  }, []);

  // Handling LocalStorage Informations

  // useEffect(() => {
  //   const stored = localStorage.getItem('list');
  //   const savedList = stored ? JSON.parse(stored) : [];
  //   if (savedList.length > 0) {
  //     setState(savedList);
  //   }
  // }, []);

  // useEffect(() => {
  //   if ([] !== state) {
  //     localStorage.setItem('list', JSON.stringify(state));
  //   }
  // }, [state]);

  //React Hook Form

  const { register, handleSubmit, reset } = useForm();

  //Adding food

  const onSubmit = async (data) => {
    const newFood = {
      id: uuidv4(),
      name: data.name,
      home: false,
    };
    setState([...state, newFood]);
    setInputData(data);
    await setDoc(doc(db, 'list', `${newFood.id}`), newFood);
    reset();
  };

  //Deleting food

  const deleteFood = async (selected) => {
    const deleted = state.filter((current) => current.id !== selected.id);
    setState(deleted);
    await deleteDoc(doc(db, 'list', selected.id));
  };

  //Changing food status

  const buyFood = (selected) => {
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
  };

  return (
    <>
      <Head>
        <title>Lista della Spesa</title>
      </Head>
      <h1 className="display-2 text-center m-3"> Lista della Spesa</h1>
      <Container className="d-flex justify-content-center">
        <Row className="p-2 m-3 justify-content-center">
          {/* Lista in uscita */}
          <Card
            className="m-5 p-1 d-flex justify-content-center"
            style={{ minWidth: '250px', width: '300px' }}
          >
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
          </Card>
          {/* Form di inserimento nuovo alimento */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex justify-content-center m-3"
          >
            <input
              placeholder="Che manca?"
              className="mx-2"
              {...register('name', { required: true })}
            />
            <input className="btn btn-primary" type="submit" />
          </form>
        </Row>
      </Container>
    </>
  );
}
