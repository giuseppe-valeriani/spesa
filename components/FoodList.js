import React from 'react';

function FoodList({ food, deleteFood }) {
  const erase = () => {
    deleteFood(food);
  };

  return (
    <div className="d-flex p-2 justify-content-around">
      {food.name}
      <button onClick={erase} className="btn btn-danger btn-sm">
        x
      </button>
    </div>
  );
}

export default FoodList;
