import { GET_CURRENCIES, GET_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: Object.keys(action.payload) };
  case GET_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  default:
    return state;
  }
};
export default wallet;
