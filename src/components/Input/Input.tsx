import styles from "./Input.module.scss";
import { InputType } from "../../types";

const Input: React.FC<InputType> = ({ handleChange, value, label }) => {
  return (
    <div className={styles.content}>
      {label && (
        <label className={styles.inputLabel} htmlFor="input">
          {label}
        </label>
      )}
      <input
        className={styles.input}
        type="text"
        id="input"
        value={value}
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default Input;
