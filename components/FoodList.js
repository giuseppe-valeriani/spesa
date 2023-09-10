import React, { useState } from 'react';

import Modal from '@/components/Modal';

function FoodList({ food, deleteFood, buyFood }) {
  const [isChecked, setIsChecked] = useState(food.home);
  const [isDeleting, setIsDeleting] = useState(false);

  const deletingHandler = () => {
    setIsDeleting((prevState) => !prevState);
  };

  const erase = () => {
    deleteFood(food);
  };

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    buyFood(food);
  };

  return (
    <>
      {isDeleting ? <Modal onErase={erase} onCancel={deletingHandler} /> : null}
      <div className="food-list">
        <input
          id={food.id}
          type="checkbox"
          name="home"
          checked={isChecked}
          onChange={handleOnChange}
        />
        <label className="food-list__name" htmlFor={food.id}>
          {food.name}
        </label>
        <div className='food-list__button'>
          <div className="food-list__shop">{food.shop}</div>
          <button className="button__delete pointer" onClick={deletingHandler}>
            x
          </button>
        </div>
      </div>
    </>
  );
}

export default FoodList;
