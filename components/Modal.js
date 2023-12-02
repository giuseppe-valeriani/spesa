import classes from './Modal.module.css';

const Modal = ({ onErase, onCancel }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.card}>
        <header className={classes.header}>Do you want to erase?</header>
        <div>
          <button onClick={onErase} className={classes.button}>
            Erase
          </button>
          <button onClick={onCancel} className={classes.button}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
