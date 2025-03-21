import React from 'react';
import { render, screen } from '@testing-library/react';

// A simple test component
const SimpleComponent = ({ text }: { text: string }) => {
  return <div data-testid="simple-component">{text}</div>;
};

describe('Simple Component Test', () => {
  it('renders with the correct text', () => {
    render(<SimpleComponent text="Hello, Jest!" />);
    const element = screen.getByTestId('simple-component');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Hello, Jest!');
  });
});