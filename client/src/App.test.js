import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  await render(<App />);
  const linkElement = screen.getByText(/fib 2/i);
  expect(linkElement).toBeInTheDocument();
});
