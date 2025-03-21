import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils/test-utils';
import { QueryClient } from '@tanstack/react-query';

// Import this directly instead of from module path to avoid the need for mocking
import Newsletter from './Newsletter';

describe('Newsletter', () => {
  it('renders newsletter form', () => {
    // Create a real query client instead of mocking apiRequest
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 0,
        },
        mutations: {
          retry: false,
        },
      },
    });

    // Render with the actual query client
    renderWithProviders(<Newsletter />, { queryClient });
    
    // Check for important elements
    expect(screen.getByText(/Stay up to date/i)).toBeInTheDocument();
    expect(screen.getByText(/with our newsletter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Subscribe/i })).toBeInTheDocument();
  });
});