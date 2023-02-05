import React from 'react';

function FoodList({ food, deleteFood, handleBuy }) {
  const erase = () => {
    deleteFood(food);
  };

  const handleTick = () => {
    handleBuy();
    console.log(food);
  };

  return (
    <div className="d-flex p-2 justify-content-start">
      {food.home ? (
        <div>
          <input
            className="mx-4"
            type="checkbox"
            name="home"
            id="home"
            defaultChecked
          />
          <label htmlFor="home" className="text-uppercase">
            {food.name}
          </label>
        </div>
      ) : (
        <div>
          <input className="mx-4" type="checkbox" name="home" id="home" />
          <label htmlFor="home" className="text-uppercase">
            {food.name}
          </label>
        </div>
      )}
      <button onClick={erase} className="btn btn-danger btn-sm mx-4">
        x
      </button>
    </div>
  );
}

export default FoodList;
