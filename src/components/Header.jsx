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
    const { email, total } = this.props;
    const { currency } = this.state;
    return (
      <section>
        <div data-testid="email-field">
          <span>User:</span>
          {email}
        </div>
        <div data-testid="total-field">
          <span>Total:</span>
          {total}
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
  total: state.wallet.expenses.reduce((total, { value, currency, exchangeRates }) => total
  + value * exchangeRates[currency].ask, 0),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
