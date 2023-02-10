import React, { Component } from 'react';
import MultipleQuestion from '../components/MultipleQuestion';
import Header from './Header';

class Game extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
          <MultipleQuestion />
        </div>

      </div>
    );
  }
}

export default Game;
