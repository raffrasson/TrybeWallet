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
    const { email } = this.props;
    const { currency } = this.state;
    return (
      <section>
        <div data-testid="email-field">
          <span>User:</span>
          {email}
        </div>
        <div data-testid="total-field">
          <span>0</span>
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
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
