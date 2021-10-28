export const INPUT_EMAIL = 'INPUT_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSE = 'GET_EXPENSE';
export const ERROR = 'ERROR';

export const inputEmail = (payload) => (
  {
    type: INPUT_EMAIL,
    payload,
  });

export const getCurrencies = (payload) => (
  {
    type: GET_CURRENCIES, payload,
  });

export const getExpense = (payload) => (
  {
    type: GET_EXPENSE, payload,
  });

export const error = (payload) => (
  {
    type: ERROR, payload,
  });

export const getApi = () => async (dispacth) => {
  try {
    const fetchApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await fetchApi.json();
    delete response.USDT; // referência: https://stackoverflow.com/questions/1219630/remove-a-json-attribute
    dispacth(getCurrencies(response));
  } catch (apiError) {
    dispacth(error(apiError));
  }
};
