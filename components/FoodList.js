import React from 'react';

function FoodList({ food, deleteFood }) {
  const erase = () => {
    deleteFood(food);
  };

  return (
    <div className="d-flex p-2 justify-content-between">
      <div>
        <input type="checkbox" name="home" />
        <label htmlFor="home" className="text-uppercase"></label>
      </div>
      {food.name}
      <button onClick={erase} className="btn btn-danger btn-sm mx-4">
        x
      </button>
    </div>
  );
}

export default FoodList;
