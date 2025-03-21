import React from 'react';
import { render, screen } from '@testing-library/react';
// Import with explicit file extension to avoid path resolution issues
import { Button } from '../components/ui/button.tsx';

describe('Button Component', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-secondary');
  });
});