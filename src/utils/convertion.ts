const getCurrencyFromCountries = (countries: any) => {
  return countries
    .map((country: any) => {
      const currency = country.currencies;
      for (let key in currency) {
        return { key, country: currency[key].name };
      }
    })
    .filter((currency: any) => !!currency);
};

export { getCurrencyFromCountries };
