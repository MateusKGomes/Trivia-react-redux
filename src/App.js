import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import './App.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
