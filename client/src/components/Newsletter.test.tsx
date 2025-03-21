import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils/test-utils';
import Newsletter from './Newsletter';

// Mock useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

// Mock apiRequest function
jest.mock('@/lib/queryClient', () => ({
  apiRequest: jest.fn().mockResolvedValue({}),
}));

describe('Newsletter', () => {
  it('renders newsletter form', () => {
    renderWithProviders(<Newsletter />);
    
    // Check for important elements
    expect(screen.getByText(/Stay up to date/i)).toBeInTheDocument();
    expect(screen.getByText(/with our newsletter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Subscribe/i })).toBeInTheDocument();
  });
});