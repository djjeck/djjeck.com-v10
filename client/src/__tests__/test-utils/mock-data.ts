import { Post, Author, Category } from '@shared/schema';

// Mock author data
export const mockAuthors: Author[] = [
  {
    id: 1,
    name: 'John Doe',
    bio: 'Senior developer with 10 years of experience in web technologies.',
    avatarUrl: 'https://example.com/avatar1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'UX designer and frontend developer passionate about user experiences.',
    avatarUrl: 'https://example.com/avatar2.jpg',
  }
];

// Mock category data
export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Technology',
    slug: 'tech',
    description: 'Articles about the latest tech trends',
    image: 'https://example.com/tech.jpg',
  },
  {
    id: 2,
    name: 'Design',
    slug: 'design',
    description: 'Articles about UI/UX design and principles',
    image: 'https://example.com/design.jpg',
  },
  {
    id: 3,
    name: 'DevOps',
    slug: 'devops',
    description: 'Articles about DevOps practices and tools',
    image: 'https://example.com/devops.jpg',
  }
];

// Mock post data
export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Getting Started with React and TypeScript',
    slug: 'getting-started-with-react-and-typescript',
    excerpt: 'Learn how to set up a new project with React and TypeScript',
    content: '# Getting Started with React and TypeScript\n\nIn this tutorial, we will learn how to set up a new project with React and TypeScript...',
    publishedAt: '2023-01-15',
    authorId: 1,
    categoryId: 1,
    coverImage: 'https://example.com/react-ts.jpg',
    isFeatured: true,
    readTime: 5,
    tags: ['react', 'typescript', 'frontend'],
    author: mockAuthors[0],
    category: mockCategories[0],
  },
  {
    id: 2,
    title: 'UI Design Principles Every Developer Should Know',
    slug: 'ui-design-principles-for-developers',
    excerpt: 'Discover essential UI design principles that will improve your applications',
    content: '# UI Design Principles Every Developer Should Know\n\nUnderstanding basic design principles can greatly improve the quality of your applications...',
    publishedAt: '2023-02-10',
    authorId: 2,
    categoryId: 2,
    coverImage: 'https://example.com/design-principles.jpg',
    isFeatured: false,
    readTime: 7,
    tags: ['design', 'ui', 'ux'],
    author: mockAuthors[1],
    category: mockCategories[1],
  },
  {
    id: 3,
    title: 'Continuous Integration with GitHub Actions',
    slug: 'ci-with-github-actions',
    excerpt: 'Set up a CI pipeline for your project using GitHub Actions',
    content: '# Continuous Integration with GitHub Actions\n\nIn this guide, we will explore how to set up a continuous integration pipeline using GitHub Actions...',
    publishedAt: '2023-03-05',
    authorId: 1,
    categoryId: 3,
    coverImage: 'https://example.com/github-actions.jpg',
    isFeatured: false,
    readTime: 10,
    tags: ['devops', 'github', 'ci/cd'],
    author: mockAuthors[0],
    category: mockCategories[2],
  }
];

// Helper function to get featured post
export const mockFeaturedPost = mockPosts.find(post => post.isFeatured);