import React from "react";
import { fireEvent, cleanup, screen } from "@testing-library/react";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"

describe ("Login", () => {
  afterEach(cleanup);
  it ('Verifica se renderiza os inputs na tela de Login', () => {
     renderWithRouterAndRedux(<App />);
     expect(screen.getByTestId('input-gravatar-email')).toBeInTheDocument();
     expect(screen.getByTestId('input-player-name')).toBeInTheDocument();     
     expect(screen.getByTestId('btn-play')).toBeInTheDocument();
     expect(screen.getByTestId('btn-settings')).toBeInTheDocument();
  });
   
  test ('Verifica se o botão fica desativado enquanto os campos não forem preenchidos',() => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const btnPlay = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-settings');
    fireEvent.change(inputEmail, {target: {value: 'test@test.com'}});
    expect(btnPlay).toBeDisabled(); 
    fireEvent.change(inputName, {target: {value: 'test'}});
    expect(btnPlay).toBeEnabled();
    expect(btnSettings).toBeInTheDocument();
    fireEvent.click(btnSettings);
    // Para pegar o pathname correto de um evento de click ele deve ser salvo em uma variável após o evento
    const { location: { pathname }} = history;
    expect(pathname).toBe('/settings');
  });

  test ('', async () => {
     const { history } = renderWithRouterAndRedux(<App />);
      const btnPlay = screen.getByTestId('btn-play');
      const inputName = screen.getByTestId('input-player-name');
      const inputEmail = screen.getByTestId('input-gravatar-email');
      fireEvent.change(inputEmail, {target: {value: 'test@test.com'}});
      fireEvent.change(inputName, {target: {value: 'test'}});
      fireEvent.click(btnPlay);
     
    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });
});
