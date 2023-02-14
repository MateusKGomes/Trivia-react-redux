// import { render } from '@testing-library/react';

import { screen } from "@testing-library/react";
import Game from "../pages/Game"
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"

// it('renders without crashing', () => {
//     const history = { push: () => {} };
//     const { getByText } = render(<Game history={history} />);
//     expect(getByText('Header')).toBeInTheDocument();
//     expect(getByText('MultipleQuestion')).toBeInTheDocument();
//   });

describe('Teste da página de Game', () => {
    it('Verifica se existe heading level 1', () => {
        renderWithRouterAndRedux(<Game />);
        const testImage = screen.getByRole('heading', { level: 1 })
    })
})