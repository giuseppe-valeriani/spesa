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
        type="checkbox"
        name="home"
        checked={isChecked}
        onChange={handleOnChange}
      />
      <label htmlFor="home">{food.name}</label>
      <button className="button__delete" onClick={erase}>
        x
      </button>
    </div>
  );
}

export default FoodList;
