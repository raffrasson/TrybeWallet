import React from 'react';

class ExpensesForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { value } = this.state;
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
          <input
            type="text"
            name="description"
            id="describe"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select name="currency" id="currency">
            <option>teste</option>
          </select>
        </label>
        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select name="paymentMethod" id="paymentMethod">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
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
export default ExpensesForm;
