import classes from './Modal.module.css';

const Modal = ({ onErase, onCancel }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.card}>
        <header className={classes.header}>Vuoi eliminare?</header>
        <div>
          <button onClick={onErase} className={classes.button}>
            Elimina
          </button>
          <button onClick={onCancel} className={classes.button}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
