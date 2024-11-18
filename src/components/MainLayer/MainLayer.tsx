import { useEffect, useState } from "react";

import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import Select from "../Select/Select";
import { Currency } from "../../types";
import styles from "./MainLayer.module.scss";
import IconSRC from "../../icons/exchange.png";
import { DEFAULT_CURRENCY } from "../../constant";
import { getAllCountries, getCurrencyRate } from "../../api";

const MainLayer: React.FC = () => {
  const [selectedFrom, setSelectedFrom] = useState(DEFAULT_CURRENCY);
  const [selectedTo, setSelectedTo] = useState(DEFAULT_CURRENCY);
  const [countries, setCountries] = useState([]);
  const [toAmount, setToAmount] = useState(0);
  const [fromAmount, setFromAmount] = useState(0);
  const [activeSelect, setActiveSelect] = useState("");
  const [currentRate, setCurrentRate] = useState(0);
  const [exchangeResult, setExchangeResult] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedFrom && selectedTo) {
      getCurrentRateForCalculation();
    }
  }, [selectedFrom, selectedTo]);

  const getCurrentRateForCalculation = async () => {
    if (!selectedFrom.key) return;
    const rateResult = await getCurrencyRate(selectedFrom.key);
    const currentRate = rateResult[selectedTo.key];
    setCurrentRate(currentRate);
  };

  const handleSelectedFromClick = () => {
    setActiveSelect("FROM");
    handleOpenModal();
  };

  const handleSelectedToClick = () => {
    setActiveSelect("TO");
    handleOpenModal();
  };

  const handleFromAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const validatedValue = Number(value.replace(/[^0-9]/g, ""));
    setToAmount(0);
    setFromAmount(validatedValue);
    const sum = Math.floor(validatedValue * currentRate);
    setExchangeResult(sum);
  };

  const handleToAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const validatedValue = Number(value.replace(/[^0-9]/g, ""));
    setFromAmount(0);
    setToAmount(validatedValue);
    const sum = Math.floor(validatedValue / currentRate);
    setExchangeResult(sum);
  };

  const getCountries = async () => {
    const countries = await getAllCountries();
    setCountries(countries);
    // we want to set default currency code in select boxes, we choose 17 & 19 for USD & EUR.
    setSelectedFrom(countries[17]);
    setSelectedTo(countries[19]);
  };

  const setSelectedCurrency = (selectedCurrency: Currency) => {
    if (activeSelect === "FROM") {
      setSelectedFrom(selectedCurrency);
    } else {
      setSelectedTo(selectedCurrency);
    }
  };

  const resetValues = () => {
    setToAmount(0);
    setFromAmount(0);
    setExchangeResult(0);
  };

  const changeCurrencyOrder = () => {
    const to = selectedTo;
    setSelectedTo(selectedFrom);
    setSelectedFrom(to);
    resetValues();
  };

  return (
    <main className={styles.content}>
      <div className={styles.selects}>
        <Select
          selectedValue={selectedFrom}
          onSelectClick={handleSelectedFromClick}
          label="We give:"
        />
        <img src={IconSRC} onClick={changeCurrencyOrder} />
        <Select
          selectedValue={selectedTo}
          onSelectClick={handleSelectedToClick}
          label="We receive:"
        />
      </div>
      <div className={styles.inputs}>
        <Input
          handleChange={handleFromAmountChange}
          value={fromAmount}
          label="How much to exchange:"
        />
        <span>or</span>
        <Input
          handleChange={handleToAmountChange}
          value={toAmount}
          label="How much to get:"
        />
      </div>
      <div className={styles.results}>
        {!!exchangeResult && (
          <div>
            <span>Result:</span> {exchangeResult} {selectedTo?.key}
          </div>
        )}
        {!!currentRate && (
          <div>
            <span>Rate:</span> {currentRate}
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        currencyList={countries}
        setSelectedCurrency={setSelectedCurrency}
      />
    </main>
  );
};

export default MainLayer;
