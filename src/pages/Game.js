import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultipleQuestion from '../components/MultipleQuestion';
import Header from './Header';
import '../Style/MultipleQuestion.css';

class Game extends Component {
  render() {
    const { history } = this.props;
    const url = 'https://o.remove.bg/downloads/26218533-3dac-4955-8f26-0595ae9b9368/1000_F_398512711_20XvnljScsUTIDqXPvAL9CfHYyzsgWWY-removebg-preview.png';
    return (
      <div className="Hero">
        <Header />
        <div className="MainQuestion">
          <img className="QuestionImage" src={ url } alt="QuestionImage" />
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
