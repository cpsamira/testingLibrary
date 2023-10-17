import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('testa se é exibido texto de erro caso a pessoa não tenha Pokémon favorito', () => {
  renderWithRouter(<App />, { route: '/favorites' });

  const noHaveFavorite = screen.getByText('No favorite Pokémon found');

  expect(noHaveFavorite).toBeInTheDocument();
});

test('testa se são exibidos apenas os Pokémons favoritados', async () => {
  renderWithRouter(<App />);

  const moreDetails = screen.getByText('More details');
  await userEvent.click(moreDetails);

  const isFavorite = screen.getByText('Pokémon favoritado?');
  await userEvent.click(isFavorite);

  const favoritePokemon = screen.getByText('Favorite Pokémon');
  await userEvent.click(favoritePokemon);

  expect(screen.getByText('Pikachu')).toBeInTheDocument();
});
