import React, { useState } from 'react';
import Head from 'next/head';
import { Card, Button, Container, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

let list = [
  {
    id: '5555cf12-ea4b-42b7-947f-0d4ea2332be0',
    name: 'pasta',
    home: true,
  },
  {
    id: '8fa56a2f-654a-4427-90d7-d49253a83862',
    name: 'pesce',
    home: false,
  },
  {
    id: '82c5defe-7971-4ba2-9ce9-250e159bc23f',
    name: 'vino',
    home: false,
  },
  {
    id: '9a90e02f-9e58-4f14-81a0-af056ee428ac',
    name: 'pane',
    home: true,
  },
];

export default function Home() {
  const [state, setState] = useState(list);
  const [edit, setEdit] = useState(false);
  const [newFood, setNewFood] = useState();

  const handleEditMode = (e) => {
    setEdit(!edit);
  };

  const add = (e) => {
    const newFood = {
      id: uuidv4(),

      name: e.target.value,
      home: false,
    };
    console.log(e.target.value);
    setState([...state, newFood]);
    console.log(list);
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
                  <Button size="sm" variant="danger">
                    x
                  </Button>
                </ul>
              );
            })}
          </Card>
          {edit ? (
            <div className="d-flex justify-content-center m-3">
              <input type="text" placeholder="Che manca?" className="mx-2" />
              <Button onClick={add}>Salva</Button>
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
