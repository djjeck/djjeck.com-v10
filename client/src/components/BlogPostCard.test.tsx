import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPostCard from './BlogPostCard';
import { mockPosts } from '../test-utils/mock-data';

describe('BlogPostCard', () => {
  // Use the first post from our mock data
  const post = mockPosts[0];
  
  it('renders post title', () => {
    render(<BlogPostCard post={post} />);
    expect(screen.getByText(post.title)).toBeInTheDocument();
  });
  
  it('renders post excerpt', () => {
    render(<BlogPostCard post={post} />);
    expect(screen.getByText(post.excerpt)).toBeInTheDocument();
  });
  
  it('renders author name', () => {
    render(<BlogPostCard post={post} />);
    expect(screen.getByText(post.author.name)).toBeInTheDocument();
  });
  
  it('renders category name', () => {
    render(<BlogPostCard post={post} />);
    expect(screen.getByText(post.category.name)).toBeInTheDocument();
  });
  
  it('displays read time', () => {
    render(<BlogPostCard post={post} />);
    expect(screen.getByText(`${post.readTime} min read`)).toBeInTheDocument();
  });
});