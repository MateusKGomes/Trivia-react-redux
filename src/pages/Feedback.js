import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends Component {
  feedbackP = () => {
    const { assertions } = this.props;
    const three = 3;
    if (assertions < three) {
      return 'Could be better...';
    } return 'Well Done!';
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <div>
          <p data-testid="feedback-text">
            {this.feedbackP()}
          </p>
          <p>{`You got ${assertions} question(s) right!`}</p>
          <p>{`A total of ${score} points.`}</p>
        </div>
        <div className="buttons">
          <button
            className="button is-primary"
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
              const { history } = this.props;
              history.push('/');
            } }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              const { history } = this.props;
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
        </div>

      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});
export default connect(mapStateToProps)(Feedback);
