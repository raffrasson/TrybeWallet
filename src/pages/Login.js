import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { inputEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { email } = this.state;
    const { emailDispatch, history } = this.props;
    emailDispatch(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const validateEmail = /\S+@\S+\.\S+/.test(email); // adaptado de https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const six = 6;
    return (
      <div>
        <form>
          <label htmlFor="email">
            <input
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            <input
              type="text"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
            />
          </label>
          <button
            type="submit"
            disabled={ !validateEmail || password.length < six }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>

      </div>
    );
  }
}

Login.propTypes = {
  emailDispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (email) => dispatch(inputEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
