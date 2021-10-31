import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExpense, getApi } from '../actions';

class ExpensesForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { addExpense } = this.props;
    const fetchApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await fetchApi.json();
    await delete response.USDT; // referência: https://stackoverflow.com/questions/1219630/remove-a-json-attribute
    this.setState({
      exchangeRates: response,
    }, () => {
      const { description, currency, value,
        method, tag, exchangeRates } = this.state;
      addExpense({ description, currency, value, method, tag, exchangeRates });
    });
  }

  render() {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            name="value"
            id="value"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="describe">
          Descrição:
          <input
            type="text"
            name="description"
            id="describe"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select name="currency" id="currency" onChange={ this.handleChange }>
            {currencies.map((rate) => (
              <option key={ rate } value={ rate }>{ rate }</option>))}
          </select>
        </label>
        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select name="method" id="paymentMethod" onChange={ this.handleChange }>
            {methods.map((method, i) => (
              <option value={ method } key={ i }>{method}</option>))}
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select name="tag" id="tag" onChange={ this.handleChange }>
            {tags.map((tag) => (
              <option key={ tag } value={ tag }>{ tag }</option>))}
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });
const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getApi()),
  addExpense: (state) => dispatch(getExpense(state)),
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
