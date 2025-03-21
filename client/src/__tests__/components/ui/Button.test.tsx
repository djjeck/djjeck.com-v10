import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders a button with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('renders a button with custom className', () => {
    render(<Button className="test-class">Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('test-class');
  });

  it('applies different variants correctly', () => {
    const { rerender } = render(<Button variant="default">Default</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
    
    rerender(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
    
    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-input');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary');
    
    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-accent');
    
    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-primary');
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(<Button size="default">Default</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10 px-4 py-2');
    
    rerender(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-9');
    
    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-11');
    
    rerender(<Button size="icon">Icon</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10 w-10');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    
    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();
  });

  it('passes through other props to button element', () => {
    render(<Button type="submit" data-testid="test-button">Submit</Button>);
    
    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="#test">Link Button</a>
      </Button>
    );
    
    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#test');
    expect(link).toHaveClass('bg-primary');
  });
});