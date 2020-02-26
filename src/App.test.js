import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders search page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/GitHub/i);
  expect(linkElement).toBeInTheDocument();
});
