import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils/test-utils';
import Newsletter from './Newsletter';

describe('Newsletter', () => {
  it('renders newsletter form', () => {
    renderWithProviders(<Newsletter />);
    
    // Check for important elements
    expect(screen.getByText(/subscribe to our newsletter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });
});