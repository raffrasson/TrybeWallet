import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense as deleteExpenseAction } from '../actions';

class Table extends React.Component {
  deleteButton(id) { // requisito feito com o auxílio co colega Marcello Alves
    const { deleteExpense } = this.props;
    return (
      <button type="button" data-testid="delete-btn" onClick={ () => deleteExpense(id) }>
        Excluir
      </button>
    );
  }

  render() {
    const { wallet: { expenses } } = this.props;
    return (
      <table>
        {/* feita com o auxilio da ferramenta disponivel em: https://www.tablesgenerator.com/html_tables */}
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map(
            ({ id, value, description, currency, method, tag, exchangeRates }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ exchangeRates[currency].name.split('/')[0] }</td>
                <td>{ (Number(exchangeRates[currency].ask)).toFixed(2) }</td>
                <td>
                  { (Number(value) * Number(exchangeRates[currency].ask)).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  { this.deleteButton(id) }
                </td>
              </tr>
            ),
          ) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  wallet: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
