import { Author, Category, Post } from '@shared/schema';

// Mock author data for testing
export const mockAuthors: Author[] = [
  {
    id: 1,
    name: 'John Doe',
    bio: 'Frontend developer with a passion for React and TypeScript',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    website: 'https://johndoe.dev',
    twitterHandle: '@johndoe',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Full-stack developer specializing in Node.js and React',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    website: 'https://janesmith.dev',
    twitterHandle: '@janesmith',
  }
];

// Mock category data for testing
export const mockCategories: Category[] = [
  {
    id: 1,
    slug: 'tech',
    name: 'Tech',
    description: 'Articles about technology and programming',
  },
  {
    id: 2,
    slug: 'design',
    name: 'Design',
    description: 'Articles about UI/UX design and tools',
  },
  {
    id: 3,
    slug: 'devops',
    name: 'DevOps',
    description: 'Articles about DevOps practices and tools',
  }
];

// Mock blog post data for testing
export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Getting Started with React and TypeScript',
    slug: 'getting-started-with-react-and-typescript',
    excerpt: 'Learn how to set up a new React project with TypeScript and why you should use TypeScript for your React projects.',
    content: '# Getting Started with React and TypeScript\n\nTypeScript is a powerful tool for adding static typing to JavaScript...',
    coverImage: 'https://example.com/images/react-typescript.jpg',
    readTime: 5,
    createdAt: '2023-03-15T12:00:00Z',
    publishedAt: '2023-03-15T12:00:00Z',
    updatedAt: '2023-03-15T12:00:00Z',
    authorId: 1,
    categoryId: 1,
    isFeatured: true,
    author: mockAuthors[0],
    category: mockCategories[0],
  },
  {
    id: 2,
    title: 'Responsive Design Principles',
    slug: 'responsive-design-principles',
    excerpt: 'Discover key principles for creating responsive web designs that work well on all screen sizes.',
    content: '# Responsive Design Principles\n\nResponsive design is an approach to web design...',
    coverImage: 'https://example.com/images/responsive-design.jpg',
    readTime: 8,
    createdAt: '2023-03-20T10:30:00Z',
    publishedAt: '2023-03-20T10:30:00Z',
    updatedAt: '2023-03-20T10:30:00Z',
    authorId: 2,
    categoryId: 2,
    isFeatured: false,
    author: mockAuthors[1],
    category: mockCategories[1],
  },
  {
    id: 3,
    title: 'Docker for Frontend Developers',
    slug: 'docker-for-frontend-developers',
    excerpt: 'Learn how Docker can improve your frontend development workflow and deployment process.',
    content: '# Docker for Frontend Developers\n\nDocker is a containerization platform...',
    coverImage: 'https://example.com/images/docker-frontend.jpg',
    readTime: 10,
    createdAt: '2023-03-25T14:15:00Z',
    publishedAt: '2023-03-25T14:15:00Z',
    updatedAt: '2023-03-25T14:15:00Z',
    authorId: 1,
    categoryId: 3,
    isFeatured: false,
    author: mockAuthors[0],
    category: mockCategories[2],
  }
];

// Export the featured post for easier access
export const mockFeaturedPost = mockPosts.find(post => post.isFeatured);