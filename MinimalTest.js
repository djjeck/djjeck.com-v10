const React = require('react');
const { render, screen } = require('@testing-library/react');

// A simple test component
const MinimalComponent = ({ text }) => {
  return React.createElement('div', { 'data-testid': 'minimal-component' }, text);
};

describe('Minimal Component Test', () => {
  it('renders with the correct text', () => {
    render(React.createElement(MinimalComponent, { text: 'Minimal Test' }));
    const element = screen.getByTestId('minimal-component');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Minimal Test');
  });
});