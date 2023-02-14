import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';
import { createToken } from '../services/API';
import '../Style/Login.css';

class Login extends Component {
  state = {
    isDisabled: true,
    gravatarEmail: '',
    name: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { gravatarEmail, name } = this.state;
    dispatch(userLogin({ gravatarEmail, name }));
    await createToken();
    history.push('/game');
  };

  validateForm() {
    const { gravatarEmail, name } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const minNameLength = 1;
    const isEmailValid = emailRegex.test(gravatarEmail);
    const isNameValid = name.length >= minNameLength;
    this.setState({
      isDisabled: !(isEmailValid && isNameValid),
    });
  }

  render() {
    const { history } = this.props;
    const { isDisabled } = this.state;
    return (
      <div className="Hero">
        <div className="Interrogações">
          <h1 className="LogoInterrogaçãoLaranja">?</h1>
          <img className="LogoImage" src="https://m.media-amazon.com/images/I/71ts8N6ka4L.png" alt="Logo" />
          <h1 className="LogoInterrogaçãoVermelho">?</h1>
          <h1 className="LogoInterrogaçãoVerde">?</h1>
        </div>
        <h1 className="LogoTrivia">TRIVIA</h1>
        <form>
          <div className="Quadrado">
            <label htmlFor="email" className="EmailLogin">
              Email:
              <input
                type="email"
                name="gravatarEmail"
                id="email"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="name" className="NameLogin">
              Name:
              <input
                type="text"
                name="name"
                id="name"
                data-testid="input-player-name"
                onChange={ this.handleChange }
              />
            </label>
            <div className="ButtonsLogin">
              <button
                className="ButtonJogar"
                type="submit"
                data-testid="btn-play"
                disabled={ isDisabled }
                onClick={ this.handleSubmit }
              >
                PLAY
              </button>
              <button
                className="ButtonConfig"
                data-testid="btn-settings"
                type="button"
                onClick={ () => history.push('/settings') }
              >
                SETTINGS
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  gravatarEmail: globalState.player.gravatarEmail,
});

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Login);
