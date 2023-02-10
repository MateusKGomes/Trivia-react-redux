import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultipleQuestion from '../components/MultipleQuestion';
import Header from './Header';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <div>
          <Header />
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
