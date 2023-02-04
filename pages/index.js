import React, { useState } from 'react';
import Head from 'next/head';
import { Card, Button, Container, Row } from 'react-bootstrap';

const list = [
  {
    id: 123,
    name: 'pasta',
    home: true,
  },
  {
    id: 128,
    name: 'pesce',
    home: false,
  },
  {
    id: 132,
    name: 'vino',
    home: false,
  },
  {
    id: 142,
    name: 'pane',
    home: true,
  },
];

export default function Home() {
  const [state, setState] = useState(list);
  const [edit, setEdit] = useState(false);

  const handleEditMode = (e) => {
    setEdit(!edit);
  };

  const add = (e) => {
    console.log(e.target.value);
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
            {list.map((food) => {
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
            <div className="d-flex justify-content-center">
              <input onChange={add} className="mx-2"></input>
              <Button size="sm" onClick={handleEditMode}>
                Salva
              </Button>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <Button size="sm" onClick={handleEditMode}>
                Aggiungi
              </Button>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
}
