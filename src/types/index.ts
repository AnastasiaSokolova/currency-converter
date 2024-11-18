type InputType = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  label?: string;
};

type Currency = {
  key: string;
  country: string;
};

type ModalType = {
  isOpen: boolean;
  onClose: () => void;
  currencyList: Array<Currency>;
  setSelectedCurrency: (currency: Currency) => void;
};

type SelectType = {
  selectedValue: Currency;
  onSelectClick: () => void;
  label: string;
};

export type { InputType, ModalType, SelectType, Currency };
