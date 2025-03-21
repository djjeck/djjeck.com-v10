import { render, screen } from '@testing-library/react';
import BlogPostCard from '@/components/BlogPostCard';
import { Post, Author, Category } from '@shared/schema';

// Mock wouter's Link component
jest.mock('wouter', () => ({
  Link: ({ children, href }: { children: React.ReactNode, href: string }) => (
    <a href={href} data-testid="wouter-link">{children}</a>
  )
}));

describe('BlogPostCard', () => {
  const mockAuthor: Author = {
    id: 1,
    name: 'John Doe',
    bio: 'Test bio',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  const mockCategory: Category = {
    id: 1,
    name: 'Technology',
    slug: 'tech',
    description: 'Tech articles',
    image: 'https://example.com/tech.jpg',
  };

  const mockPost: Post = {
    id: 1,
    title: 'Test Post Title',
    slug: 'test-post',
    excerpt: 'This is a test post excerpt',
    content: 'Test content',
    publishedAt: '2023-01-01',
    authorId: 1,
    categoryId: 1,
    coverImage: 'https://example.com/image.jpg',
    isFeatured: false,
    readTime: 5,
    tags: ['test', 'blog'],
    author: mockAuthor,
    category: mockCategory,
  };

  it('renders the blog post card with correct data', () => {
    render(<BlogPostCard post={mockPost} />);
    
    // Check if title is rendered
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    
    // Check if excerpt is rendered
    expect(screen.getByText('This is a test post excerpt')).toBeInTheDocument();
    
    // Check if category name is rendered
    expect(screen.getByText('Technology')).toBeInTheDocument();
    
    // Check if author name is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check if read time is rendered
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    
    // Check if date is rendered (using a partial text match)
    expect(screen.getByText(/January 1, 2023/)).toBeInTheDocument();
    
    // Check if images have correct src attributes
    const coverImage = screen.getByAltText('Test Post Title') as HTMLImageElement;
    expect(coverImage.src).toContain('https://example.com/image.jpg');
    
    const authorAvatar = screen.getByAltText('John Doe') as HTMLImageElement;
    expect(authorAvatar.src).toContain('https://example.com/avatar.jpg');
    
    // Check if the link has the correct href
    const link = screen.getByTestId('wouter-link') as HTMLAnchorElement;
    expect(link.href).toContain('/post/test-post');
  });
});