import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

test('Testa se a página contém um heading h2 com o texto Page requested not found', () => {
  renderWithRouter(<NotFound />);

  const notFound = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
  expect(notFound).toBeInTheDocument();
});

test('Testa se a página mostra a imagem com o texto', () => {
  renderWithRouter(<NotFound />, { route: '/notfound' });

  const img = screen.getByAltText("Clefairy pushing buttons randomly with text I have no idea what i'm doing");

  expect(img).toHaveAttribute('src', '/404.gif');
  expect(img).toBeInTheDocument();
});
