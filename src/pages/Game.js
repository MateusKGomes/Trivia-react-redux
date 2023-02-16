import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultipleQuestion from '../components/MultipleQuestion';
import Header from './Header';
import '../Style/MultipleQuestion.css';
import PersonagemTrivia from '../Style/PersonagemTrivia.png';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="Hero">
        <Header />
        <div className="MainQuestion">
          <img
            className="QuestionImage"
            src={ PersonagemTrivia }
            alt="QuestionImage"
          />
          <MultipleQuestion history={ history } />
        </div>
      </div>
    );
  }
}
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
export default Game;
