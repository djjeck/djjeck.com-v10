import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPostCard from './BlogPostCard';
import { Author, Category, Post } from '@shared/schema';

describe('BlogPostCard component', () => {
  const mockAuthor: Author = {
    id: 1,
    name: 'John Doe',
    bio: 'A tech enthusiast',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  const mockCategory: Category = {
    id: 1,
    slug: 'technology',
    name: 'Technology',
    description: 'All about tech',
    image: 'https://example.com/category.jpg',
  };

  const mockPost: Post = {
    id: 1,
    title: 'Test Post',
    slug: 'test-post',
    excerpt: 'This is a test post',
    content: 'This is the full content of the test post',
    isFeatured: false,
    authorId: 1,
    categoryId: 1,
    coverImage: 'https://example.com/image.jpg',
    readTime: 5,
    publishedAt: new Date().toISOString(),
    tags: ['react', 'typescript'],
    author: mockAuthor,
    category: mockCategory,
  };

  it('renders post title', () => {
    render(<BlogPostCard post={mockPost} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  it('renders post excerpt', () => {
    render(<BlogPostCard post={mockPost} />);
    expect(screen.getByText('This is a test post')).toBeInTheDocument();
  });

  it('renders author name', () => {
    render(<BlogPostCard post={mockPost} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders category name', () => {
    render(<BlogPostCard post={mockPost} />);
    expect(screen.getByText('Technology')).toBeInTheDocument();
  });

  it('renders read time', () => {
    render(<BlogPostCard post={mockPost} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });
});