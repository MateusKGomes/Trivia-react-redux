import React from "react";
import { screen, act } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import App from "../App";
import userEvent from "@testing-library/user-event";
import user from "../redux/reducers/user";

describe('Testa a página de ranking', () => { 
    it('testa se a página existe', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/ranking');
          });
        const { location: { pathname }} = history;
        expect(pathname).toBe('/ranking');
        const h1 = screen.getByRole('heading', {  name: /ranking/i});
        expect(h1).toBeInTheDocument();
        const img = screen.getByRole('img', {  name: /logo/i});
          expect(img).toBeInTheDocument();
    })
    it('testa o botão de play again', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/ranking');
          });
          const button = screen.getByRole('button', {  name: /play again/i});
          userEvent.click(button)
          const { location: { pathname }} = history;
          expect(pathname).toBe('/'); 
    })
    it('testa se a ordem do ranking está correta', () => {
        const initialState = {
           player: {
                name:"Alea Mcgowan",
                gravatarEmail:"gowogaqohe@mailinator.com",
                assertions: 2,
                score: 104,
            }
          }
          const local = [
            {
                "name": "Garrison Dominguez",
                "score": 66
            },
            {
                "name": "Silas Sullivan",
                "score": 68
            }
        ]
        localStorage.setItem('ranking', JSON.stringify(local))
         renderWithRouterAndRedux(<App />, initialState, '/ranking');
         const winner = (screen.getByTestId('player-score-0'))
         expect(winner.innerHTML).toBe('68 points');
         const secondPlace = (screen.getByTestId('player-score-1'))
         expect(secondPlace.innerHTML).toBe('66 points');
        });
 })