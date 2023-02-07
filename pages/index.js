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
      <h1 className="display-2 text-center m-3"> Lista della Spesa</h1>
      <Container className="d-flex justify-content-center">
        <Row className="p-2 m-3 justify-content-center">
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
          {/* Lista in uscita */}
          {state.length > 0 ? (
            <Card
              className="m-5 p-1 d-flex justify-content-center"
              style={{ minWidth: '250px', width: '300px' }}
            >
              <Card.Header>
                <button className="btn btn-primary btn-sm" onClick={sortFood}>
                  Riordina
                </button>
              </Card.Header>
              <Card.Body>
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
              </Card.Body>
            </Card>
          ) : null}
        </Row>
      </Container>
    </>
  );
}
