import React from "react";

const Modal = ({ food, onErase, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal__card">
        <header>Do you want to erase {food}?</header>
        <div>
          <button className="modal__buttons modal__buttons--erase" onClick={onErase}>
            Erase
          </button>
          <button className="modal__buttons" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
