import React from 'react';
import { render, screen } from '../test-utils/test-utils';
import Newsletter from './Newsletter';

// Using a simplified test to avoid complex mocking
describe('Newsletter component', () => {
  it('renders the newsletter form', () => {
    render(<Newsletter />);
    expect(screen.getByText(/subscribe to our newsletter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });
});