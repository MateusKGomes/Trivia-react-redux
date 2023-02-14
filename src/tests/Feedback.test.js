import React from "react";
import { screen, act } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import App from "../App";
import userEvent from "@testing-library/user-event";


describe ("Testa a tela de Feedback", () => {
    it ('Verifica se os itens do Feedback estão na tela ', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/feedback');
          });
        const { location: { pathname }} = history;
        expect(pathname).toBe('/feedback');
       const playAgain = screen.getByRole('button', {  name: /play again/i})
       expect(playAgain).toBeInTheDocument();
       const ranking = screen.getByRole('button', {  name: /ranking/i});
       expect(ranking).toBeInTheDocument();
       const score = screen.getByTestId('feedback-total-score')
       expect(score).toBeInTheDocument();
    });
    it('testa o click de play again', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/feedback');
          });
          const playAgain = screen.getByRole('button', {  name: /play again/i});
          userEvent.click(playAgain);
          const { location: { pathname }} = history;
          expect(pathname).toBe('/');
    })
    it('testa o evento do ranking ', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/feedback');
          });
          const ranking = screen.getByRole('button', {  name: /ranking/i});
          userEvent.click(ranking);
          const { location: { pathname }} = history;
          expect(pathname).toBe('/ranking');    
        })
});
