import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <img src='' alt='' data-testid='header-profile-picture'/>
        <h2 data-testid='header-player-name'>{ playerName }</h2>
        <h4 data-testid='header-score'>{ `Placar: ${ score }`}</h4>
      </div>
    );
  }
}

export default Header;
