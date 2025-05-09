const CURRENCRY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});

export const formatCurrencry = (number: any) => {
  return CURRENCRY_FORMATTER.format(number);
};

export const getDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en");
};
const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL)

export const baseUrl = API_URL;
