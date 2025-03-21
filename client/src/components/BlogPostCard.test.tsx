import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'wouter';
import BlogPostCard from './BlogPostCard';
import { mockPosts } from '../test-utils/mock-data';

// Create a wrapper component with Router
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <Router>
    {children}
  </Router>
);

describe('BlogPostCard', () => {
  // Use the first post from our mock data
  const post = mockPosts[0];
  
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: RouterWrapper });
  };
  
  it('renders post title', () => {
    renderWithRouter(<BlogPostCard post={post} />);
    expect(screen.getByText(post.title)).toBeInTheDocument();
  });
  
  it('renders post excerpt', () => {
    renderWithRouter(<BlogPostCard post={post} />);
    expect(screen.getByText(post.excerpt)).toBeInTheDocument();
  });
  
  it('renders author name', () => {
    renderWithRouter(<BlogPostCard post={post} />);
    expect(screen.getByText(post.author.name)).toBeInTheDocument();
  });
  
  it('renders category name', () => {
    renderWithRouter(<BlogPostCard post={post} />);
    expect(screen.getByText(post.category.name)).toBeInTheDocument();
  });
  
  it('displays read time', () => {
    renderWithRouter(<BlogPostCard post={post} />);
    expect(screen.getByText(`${post.readTime} min read`)).toBeInTheDocument();
  });
});