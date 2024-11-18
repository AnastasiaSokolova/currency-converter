import { SelectType } from "../../types";
import styles from "./Select.module.scss";

const Select: React.FC<SelectType> = ({
  selectedValue,
  onSelectClick,
  label,
}) => {
  return (
    <div className={styles.content} onClick={onSelectClick}>
      <label>{label}</label>
      <select className={styles.select}>
        <option value={selectedValue?.key} selected>
          {selectedValue?.key} - {selectedValue?.country}
        </option>
      </select>
    </div>
  );
};

export default Select;
