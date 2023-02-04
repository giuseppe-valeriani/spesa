import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Card, Button, Container, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
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

  const [edit, setEdit] = useState(false);
  const [newFood, setNewFood] = useState();

  const handleEditMode = () => {
    setEdit(!edit);
  };

  const handleSetNewFood = (e) => {
    setNewFood(e.target.value);
  };

  const addFood = () => {
    const food = {
      id: uuidv4(),
      name: newFood,
      home: false,
    };
    setState([...state, food]);
  };

  const handleDelete = (a) => {
    console.log(a);
    // const erased = state.filter((useless) => {
    //   useless.id === useless.id;
    // });
    // console.log(erased);
  };

  return (
    <>
      <Head>
        <title>Lista della Spesa</title>
      </Head>
      <h1 className="display-2 text-center m-3"> Lista della Spesa</h1>
      <Container className="d-flex justify-content-center">
        <Row className="p-2 m-3 justify-content-center">
          <Card
            className="m-5 p-1 d-flex justify-content-center"
            style={{ width: '250px' }}
          >
            {state.map((food) => {
              return (
                <ul className="d-flex p-2 justify-content-around" key={food.id}>
                  {food.name}
                  <Button
                    onClick={(id) => handleDelete}
                    size="sm"
                    variant="danger"
                  >
                    x
                  </Button>
                </ul>
              );
            })}
          </Card>
          {edit ? (
            <div className="d-flex justify-content-center m-3">
              <input
                type="text"
                onChange={handleSetNewFood}
                id="food"
                placeholder="Che manca?"
                className="mx-2"
              />
              {newFood && <Button onClick={addFood}>Salva</Button>}
            </div>
          ) : (
            <div className="d-flex justify-content-center m-3">
              <Button onClick={handleEditMode}>Aggiungi</Button>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
}
