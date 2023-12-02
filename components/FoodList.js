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
      {isDeleting ? <Modal food={food.name} onErase={erase} onCancel={deletingHandler} /> : null}
      <div className="element">
        <input
          id={food.id}
          type="checkbox"
          name="home"
          checked={isChecked}
          onChange={handleOnChange}
        />
        <label className="element__name" htmlFor={food.id}>
          {food.name}
        </label>
        <div className='element__button'>
          <div className="element__button--label">{food.shop}</div>
          <button className="element__button--btn" onClick={deletingHandler}>
            x
          </button>
        </div>
      </div>
    </>
  );
}

export default FoodList;
