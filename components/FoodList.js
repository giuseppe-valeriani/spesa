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
      <div className="food-list__shop">{food.shop}</div>
      <button className="button__delete pointer" onClick={erase}>
        x
      </button>
    </div>
  );
}

export default FoodList;
