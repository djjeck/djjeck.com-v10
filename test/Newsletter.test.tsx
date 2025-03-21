import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Newsletter from '../client/src/components/Newsletter';

// Mock the api request function
jest.mock('../client/src/lib/queryClient', () => ({
  apiRequest: jest.fn().mockResolvedValue({ success: true }),
  queryClient: new QueryClient(),
}));

describe('Newsletter component', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  const renderWithQueryClient = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    queryClient.clear();
  });

  it('renders the newsletter form', () => {
    renderWithQueryClient(<Newsletter />);
    expect(screen.getByText(/subscribe to our newsletter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    renderWithQueryClient(<Newsletter />);
    
    const emailInput = screen.getByPlaceholderText(/your email/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it('handles successful form submission', async () => {
    const { apiRequest } = require('../client/src/lib/queryClient');
    apiRequest.mockResolvedValueOnce({ success: true });
    
    renderWithQueryClient(<Newsletter />);
    
    const emailInput = screen.getByPlaceholderText(/your email/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(apiRequest).toHaveBeenCalledWith('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      });
    });
  });
});