import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    // const hash = md5(gravatarEmail).toString();
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          alt={ name }
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h4 data-testid="header-score">{score}</h4>
        <div className="assertions">
          {/* <p>
            { `Assertions: ${assertions}` }
          </p> */}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  gravatarEmail: globalState.player.gravatarEmail,
  score: globalState.player.score,
  assertions: globalState.player.assertions,
});

export default connect(mapStateToProps)(Header);
