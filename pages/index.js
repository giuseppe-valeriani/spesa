import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Card, Button, Container, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import FoodList from '@/components/FoodList';
import { db } from '../firebase';

export default function Home() {
  // Handling Storage Informations
  let list = [];
  const [state, setState] = useState(list);

  useEffect(() => {
    const stored = localStorage.getItem('list');
    const savedList = stored ? JSON.parse(stored) : [];
    if (savedList.length > 0) {
      setState(savedList);
    }
  }, []);

  useEffect(() => {
    if (list !== state) {
      localStorage.setItem('list', JSON.stringify(state));
    }
  }, [state]);

  //React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newFood = {
      id: uuidv4(),
      name: data.name,
      home: false,
    };
    setState([...state, newFood]);
    reset();
  };

  const deleteFood = (selected) => {
    const deleted = state.filter((current) => current.id !== selected.id);
    setState(deleted);
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
            style={{ width: '250px' }}
          >
            {state.map((selectedFood) => {
              return (
                <ul key={selectedFood.id}>
                  <FoodList food={selectedFood} deleteFood={deleteFood} />
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
