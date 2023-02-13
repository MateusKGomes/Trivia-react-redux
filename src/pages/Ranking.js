import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { getRanking } from '../services/localStorage';

class Ranking extends Component {
  render() {
    const { gravatarEmail } = this.props;
    const num1 = -1;
    const ranking = getRanking().sort((a, b) => {
      if (a.score > b.score) {
        return num1;
      }
      return true;
    });
    return (
      <div className="ranking">
        <img src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` } alt="logo" className="logo" />
        <div className="box">
          <h1 data-testid="ranking-title">RANKING</h1>
          <ol>
            { ranking.map((elemento, index) => (
              <li key={ index }>
                <div className="rankingPlayer">
                  <img
                    src={ elemento.picture }
                    alt="avatar"
                  />
                  <p
                    data-testid={ `player-name-${index}` }
                    name="name"
                    value="name"
                  >
                    { elemento.name }
                  </p>
                </div>
                <div className="rankingScore">
                  <p
                    name="currency"
                    value="score"
                    data-testid={ `player-score-${index}` }
                  >
                    {`${elemento.score} points`}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <button
            className="button is-primary"
            data-testid="btn-go-home"
            type="submit"
            onClick={ () => {
              const { history } = this.props;
              history.push('/');
            } }
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  gravatarEmail: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.player.gravatarEmail,
});

export default connect(mapStateToProps)(Ranking);
