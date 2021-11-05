import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'BRL',
    };
  }

  render() {
    const { email, wallet: { expenses } } = this.props;
    const { currency } = this.state;
    const totalExpenses = expenses.reduce((total, expense) => {
      const valueBRL = Math.round(Number(expense.value)
        * Number(expense.exchangeRates[expense.currency].ask) * 100) / 100;

      total += valueBRL;
      return total;
    }, 0);

    return (
      <section>
        <div data-testid="email-field">
          <span>User:</span>
          {email}
        </div>
        <div data-testid="total-field">
          <span>Total:</span>
          {totalExpenses.toFixed(2)}
        </div>
        <div data-testid="header-currency-field">
          <span>Currency:</span>
          {currency}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  wallet: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(Header);
