import { getCurrencyFromCountries } from "../utils/convertion";

const API_URL_COUNTRIES = "https://restcountries.com/v3.1/all";
const API_URL_CURRENCY_RATE =
  "https://v6.exchangerate-api.com/v6/eba446c41d37d08834dd4ef6/latest/";

const getAllCountries = async () => {
  const response = await fetch(API_URL_COUNTRIES);
  const result = await response.json();
  return getCurrencyFromCountries(result);
};

const getCurrencyRate = async (currencyFrom: any) => {
  const response = await fetch(API_URL_CURRENCY_RATE + currencyFrom);
  const result = await response.json();
  return result?.conversion_rates;
};

export { getAllCountries, getCurrencyRate };
