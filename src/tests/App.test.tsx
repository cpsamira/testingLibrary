import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste do componente App', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const toHome = screen.getByRole('link', { name: /Home/i });
    const toAbout = screen.getByRole('link', { name: /About/i });
    const toFavPokemon = screen.getByRole('link', { name: /Favorite Pokémon/i });

    expect(toHome).toBeInTheDocument();
    expect(toAbout).toBeInTheDocument();
    expect(toFavPokemon).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação', async () => {
    renderWithRouter(<App />);

    const pageHome = screen.getByRole('link', { name: /home/i });

    await userEvent.click(pageHome);
    expect(screen.getByText(/Encountered Pokémon/i)).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', async () => {
    renderWithRouter(<App />);

    const pageAbout = screen.getByRole('link', { name: /About/i });

    await userEvent.click(pageAbout);
    expect(screen.getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  test('Testa se a aplicação é redirecionada para a página de Pokémon Favoritados ao clicar no link Favorite Pokémon.', async () => {
    renderWithRouter(<App />);

    const pageFavoritePokemon = screen.getByRole('link', { name: /Favorite Pokémon/i });

    await userEvent.click(pageFavoritePokemon);
    expect(pageFavoritePokemon).toBeInTheDocument();
  });

  test('Testa se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', async () => {
    renderWithRouter(<App />, { route: '/whocares' });

    const pageNotFound = screen.getByText(/Page requested not found/i);

    expect(pageNotFound).toBeInTheDocument();
  });
});
