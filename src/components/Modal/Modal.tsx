import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

import Input from "../Input/Input";
import { Currency } from "../../types";
import { ModalType } from "../../types";
import styles from "./Modal.module.scss";

const Modal: React.FC<ModalType> = ({
  isOpen,
  onClose,
  currencyList,
  setSelectedCurrency,
}) => {
  const [currency, setCurrency] = useState(currencyList);
  const [value, setValue] = useState("");

  useEffect(() => {
    setCurrency(currencyList);
  }, [currencyList]);

  if (!isOpen) return null;

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
    const formattedValue = value.toLowerCase();
    const searchedCurrency = currencyList.filter((curr: any) => {
      return (
        curr?.key.toLowerCase().includes(formattedValue) ||
        curr?.country.toLowerCase().includes(formattedValue)
      );
    });
    setCurrency(searchedCurrency);
  };

  const onItemClick = (item: Currency) => {
    setSelectedCurrency(item);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button onClick={onClose} className={styles.closeButton}>
            x
          </button>
        </div>
        <Input handleChange={onSearch} value={value} />

        <ul className={styles.modalList}>
          {!currency.length && (
            <div className={styles.noFound}>No items found</div>
          )}
          {currency.map((item: Currency) => (
            <li className={styles.modalItem} onClick={() => onItemClick(item)}>
              {item.key} - {item.country}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
