import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

test('Testa se a página contém as informações sobre a Pokédex', () => {
  renderWithRouter(<About />);
  const pokedexInfo = screen.getByText('What does this app do?');
  expect(pokedexInfo).toBeInTheDocument();
});

test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<About />);

  const title = screen.getByRole('heading', { level: 2 });

  expect(title).toBeInTheDocument();
});

test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<About />);

  const paragraphOne = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon.');
  const paragrpgTwo = screen.getByText('One can filter Pokémon by type, and see more details for each one of them.');

  expect(paragraphOne).toBeInTheDocument();
  expect(paragrpgTwo).toBeInTheDocument();
});

test('Testa se a página contém a imagem correta', () => {
  renderWithRouter(<About />);

  const pokedexImage = screen.getByAltText(/Pokédex/);

  expect(pokedexImage).toBeInTheDocument();
});
