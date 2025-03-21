import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../client/src/components/ui/button';

describe('Button component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies variant class correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    const buttonElement = screen.getByText('Delete');
    expect(buttonElement).toHaveClass('bg-destructive');
  });

  it('applies size class correctly', () => {
    render(<Button size="sm">Small</Button>);
    const buttonElement = screen.getByText('Small');
    expect(buttonElement).toHaveClass('h-9');
  });

  it('renders as disabled when disabled prop is passed', () => {
    render(<Button disabled>Disabled</Button>);
    const buttonElement = screen.getByText('Disabled');
    expect(buttonElement).toBeDisabled();
  });
});