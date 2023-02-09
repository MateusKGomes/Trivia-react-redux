import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const hash = md5(gravatarEmail).toString();
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt={ name }
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h4 data-testid="header-score">{ `Placar: ${score}`}</h4>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.string,
}.isRequired;

const mapStateToProps = (globalState) => ({
  name: globalState.user.name,
  gravatarEmail: globalState.user.gravatarEmail,
  score: globalState.user.score,
});

export default connect(mapStateToProps)(Header);
