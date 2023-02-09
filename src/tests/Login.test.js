import React from "react";
import { fireEvent, cleanup, screen } from "@testing-library/react";
// import Login from "../../src/pages/Login";
import App from "../../src/App";
// import { legacy_createStore as createStore} from 'redux';
// import { Provider } from 'react-redux';
// import userEvent from "@testing-library/user-event";
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
      // watest (() => expect(history.location.pathname).toBe('/game'));
    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });

  // const store = createStore(() => ({}));

  // test('', () => {
  //   const { getByLabelText } = render(<Provider store={store}><Login /></Provider>);
  //   const inputEmail = getByLabelText('Email:');
  //   const inputName = getByLabelText('Name:');
    
  //   expect(inputEmail).toBeInTheDocument();
  //   expect(inputName).toBeInTheDocument();
  // });

  // test('', () => { 
  //   const { getByTestId, getByLabelText } = render(<Provider store={store}><Login /></Provider>);
  //   const inputEmail = getByLabelText('Email:');
  //   const inputName = getByLabelText('Name:');
  //   const btnPlay = getByTestId('btn-play');
    
  //   expect(btnPlay).toBeDisabled();
        
  //   fireEvent.change(inputEmail, { target: { value: 'test@test.com' } });
  //   fireEvent.change(inputName, { target: { value: 'test' } });
  //   expect(btnPlay).not.toBeDisabled();
  //   });

  //   test('', () => {
  //       const { getByTestId } = render(<Provider store={store}><Login /></Provider>);
  //   const btnPlay = getByTestId('btn-play');
  //   fireEvent.click(btnPlay);
  //   });

  //   test('', () => {
  //   const { history } = renderWithRouterAndRedux(<App />);
  //   const btnPlay = screen.getByRole('btn-play', {name:/play/i});
  //    const inputEmail = screen.getByLabelText(/email/i);
  //   const inputName = screen.getByLabelText(/name/i);
  //  expect(btnPlay).toBeInTheDocument();
  //  expect(inputEmail).toBeInTheDocument();
  //   expect(inputName).toBeInTheDocument();

  //   userEvent.type(inputEmail, 'test@test.com');
  //   userEvent.type(inputName, 'test');
  //   expect(btnPlay).not.toBeDisabled();
  //   userEvent.click(btnPlay);
  //   const adffg = screen.findByText(/game/i);
  //   expect(adffg).toBeInTheDocument();
  //   expect(history.location.pathname).toBe('/game');
  //   });
});
