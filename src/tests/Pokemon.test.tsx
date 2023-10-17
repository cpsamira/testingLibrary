import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
// import { Pokemon } from '../components';

describe('Testa se é renderizado um card com as informações de determinado Pokémon', () => {
  test('testa se mostra o nome correto do Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  test('testa se mostra o tipo certo de Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonType = screen.getByTestId('pokemon-type');

    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
  });

  test('testa se o peso médio do Pokémon é exibido no seguinte formato: Average weight: <value> <measurementUnit>', () => {
    renderWithRouter(<App />);

    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  test('testa se exibe a imagem do Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonImage = screen.getByAltText('Pikachu sprite');
    expect(pokemonImage).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });
});

test('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para detalhes desse Pokémon', () => {
  renderWithRouter(<App />);

  const details = screen.getByText(/more details/i);

  expect(details).toBeInTheDocument();
  expect(details).toHaveAttribute('href', '/pokemon/25');
});

test('Testa se ao clicar no link de navegação do Pokémon, é feito o redirecionamento para a página de detalhes de Pokémon', async () => {
  renderWithRouter(<App />);

  const details = screen.getByText('More details');

  await userEvent.click(details);

  expect(screen.getByText('Summary')).toBeInTheDocument();
});

// test('Testa se a URL exibida no navegador muda para /pokemon/<id>', () => {

// });

test('Testa se existe um ícone de estrela nos Pokémon favoritados:', async () => {
  renderWithRouter(<App />);

  const details = screen.getByText('More details');
  await userEvent.click(details);

  const checkbox = screen.getByRole('checkbox');
  await userEvent.click(checkbox);
  expect(checkbox).toBeInTheDocument();

  const isFavorite = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
  await userEvent.click(isFavorite);
  expect(isFavorite).toHaveAttribute('src', '/star-icon.png');
});
