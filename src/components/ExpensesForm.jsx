import React from 'react';
import { connect } from 'react-redux';
// import { getExpense, getError,
import { getCurrencies, getApi } from '../actions';

class ExpensesForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      paymentMethod: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      apiRates: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fillCurrency();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  async fillCurrency() {
    const fetchApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await fetchApi.json();
    await delete response.USDT; // referência: https://stackoverflow.com/questions/1219630/remove-a-json-attribute
    this.setState({
      apiRates: Object.keys(response),
    });
  }

  render() {
    const { value, currency, paymentMethod, tag, description, apiRates } = this.state;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="value">
          Valor:
          {value}
          <input
            type="text"
            name="value"
            id="value"
          />
        </label>
        <label htmlFor="describe">
          Descrição:
          {description}
          <input
            type="text"
            name="description"
            id="describe"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          {currency}
          <select name="currency" id="currency">
            {apiRates.map((currency) => (
              <option key={ currency } value={ currency }>{ currency }</option>))}
          </select>
        </label>
        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select name="paymentMethod" id="paymentMethod">
            {paymentMethods.map((method, i) => (
              <option value={ method } key={ i }>{method}</option>))}
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select name="tag" id="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });
const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getApi()),
  addRates: (state) => dispatch(getCurrencies(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
