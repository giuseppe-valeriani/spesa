import React, { useState } from 'react';

function FoodList({ food, deleteFood, buyFood }) {
  const [isChecked, setIsChecked] = useState(food.home);

  const erase = () => {
    deleteFood(food);
  };

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    buyFood(food);
  };

  return (
    <div className="d-flex p-2 justify-content-between">
      <input
        type="checkbox"
        name="home"
        checked={isChecked}
        onChange={handleOnChange}
      />
      <label htmlFor="home" className="text-uppercase">
        <small>{food.name}</small>
      </label>
      <button onClick={erase} className="btn btn-danger btn-sm mx-4">
        x
      </button>
    </div>
  );
}

export default FoodList;
