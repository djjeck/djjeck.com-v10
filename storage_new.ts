import { 
  InsertPost, 
  Post, 
  InsertCategory, 
  Category, 
  InsertAuthor, 
  Author 
} from "./shared/schema";

export interface IStorage {
  // Post operations
  getAllPosts(limit?: number, offset?: number): Promise<Post[]>;
  getPostById(id: number): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getPostsByCategory(categorySlug: string): Promise<Post[]>;
  getFeaturedPost(): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  
  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Author operations
  getAllAuthors(): Promise<Author[]>;
  getAuthorById(id: number): Promise<Author | undefined>;
  createAuthor(author: InsertAuthor): Promise<Author>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private posts: Map<number, Post>;
  private categories: Map<number, Category>;
  private authors: Map<number, Author>;
  
  private postIdCounter: number;
  private categoryIdCounter: number;
  private authorIdCounter: number;
  
  constructor() {
    this.posts = new Map();
    this.categories = new Map();
    this.authors = new Map();
    
    this.postIdCounter = 1;
    this.categoryIdCounter = 1;
    this.authorIdCounter = 1;
    
    // Initialize with sample data
    // We need to use a Promise here since constructors can't be async
    (async () => {
      await this.initSampleData();
    })();
  }

  // Initialize sample data
  private async initSampleData() {
    // Create authors
    const author1 = await this.createAuthor({
      name: "Jane Smith",
      bio: "UI/UX Designer with 6+ years of experience in creating intuitive digital interfaces for web and mobile platforms.",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    });
    
    const author2 = await this.createAuthor({
      name: "Michael Wong",
      bio: "Full-stack developer and DevOps specialist who loves building scalable applications.",
      avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    });
    
    const author3 = await this.createAuthor({
      name: "Alex Johnson",
      bio: "Technical writer and developer advocate with a passion for making complex topics accessible to everyone.",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    });
    
    // Create categories
    const techCategory = await this.createCategory({
      name: "Tech",
      slug: "tech",
      description: "Latest technology news, programming, and development trends"
    });
    
    const designCategory = await this.createCategory({
      name: "Design",
      slug: "design",
      description: "UI/UX design tips, tools, and best practices"
    });
    
    const devOpsCategory = await this.createCategory({
      name: "DevOps",
      slug: "devops",
      description: "Continuous integration, deployment, and operations best practices"
    });
    
    // Create posts
    await this.createPost({
      title: "Getting Started with React and TypeScript",
      slug: "getting-started-with-react-and-typescript",
      excerpt: "TypeScript adds static typing to JavaScript, making it easier to catch errors early. Learn how to use TypeScript with React for more robust applications...",
      content: `
# Getting Started with React and TypeScript

TypeScript is a powerful superset of JavaScript that adds static typing to the language. When combined with React, it provides a robust development experience with better tooling, clearer code organization, and easier maintenance.

## Why Use TypeScript with React?

1. **Type Safety**: Catch errors during development rather than at runtime
2. **Better Intellisense**: Enhanced IDE support with autocompletion and suggestions
3. **Improved Maintenance**: Easier to refactor and understand the codebase
4. **Documentation**: Types serve as built-in documentation for your components and functions

## Setting Up a React TypeScript Project

You can easily create a new React project with TypeScript using Create React App:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

Or if you're using Vite:

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
\`\`\`

## Basic TypeScript Concepts for React

### 1. **Typing Props**

\`\`\`typescript
// Interface for component props
interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: 'primary' | 'secondary';
  disabled?: boolean;
}

// Function component with typed props
const Button = ({ text, onClick, color = 'primary', disabled = false }: ButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={\`button \${color}\`}
    >
      {text}
    </button>
  );
};
\`\`\`

### 2. **Typing State**

\`\`\`typescript
// Typed useState hook
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
\`\`\`

### 3. **Typing Events**

\`\`\`typescript
// Typing form events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value);
};

// Typing button click events
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  submitForm();
};
\`\`\`

## Best Practices

1. **Define reusable interfaces** in separate files for common types
2. **Use discriminated unions** for complex state management
3. **Prefer interfaces** for public APIs and types for private or inline types
4. **Avoid using 'any'** - it defeats the purpose of TypeScript
5. **Use TypeScript's utility types** like Partial, Required, Pick, and Omit

## Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Playground](https://www.typescriptlang.org/play)

By using TypeScript with React, you'll create more maintainable applications with fewer bugs and better developer experience.
      `,
      publishedAt: "2023-06-15T09:30:00Z",
      authorId: author2.id,
      categoryId: techCategory.id,
      coverImage: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      readTime: 7,
      tags: ["react", "typescript", "javascript", "web development"]
    });
    
    await this.createPost({
      title: "Responsive Design Principles for Modern Web Apps",
      slug: "responsive-design-principles-for-modern-web-apps",
      excerpt: "Creating websites that work well on any device is crucial. Learn essential responsive design principles and techniques to ensure your sites adapt to any screen size...",
      content: `
# Responsive Design Principles for Modern Web Apps

In today's multi-device world, creating websites that provide optimal viewing and interaction experiences across devices is essential. Responsive web design (RWD) ensures your application works well on desktops, tablets, and mobile phones.

## Core Principles of Responsive Design

### 1. Fluid Grids

Use relative units (percentages, ems, rems) instead of fixed pixels for layout elements:

- Percentage-based widths for containers
- Max-width and min-width constraints
- Flexible images with max-width: 100%

### 2. Media Queries

Adapt your layout based on device characteristics:

\`\`\`css
/* Mobile first approach */
.container {
  width: 100%;
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    width: 750px;
    padding: 1.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    width: 970px;
    padding: 2rem;
  }
}
\`\`\`

### 3. Flexible Images

Ensure images scale properly:

\`\`\`css
img {
  max-width: 100%;
  height: auto;
}
\`\`\`

## Modern Responsive Techniques

### CSS Grid and Flexbox

These modern CSS features make responsive layouts simpler and more powerful:

\`\`\`css
/* Flexbox example */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px;
}

/* CSS Grid example */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
\`\`\`

### Mobile-First Approach

Start designing for mobile devices first, then progressively enhance for larger screens:

1. Design the core experience for mobile
2. Add complexity as screen size increases
3. Focus on performance and essential content

### Responsive Typography

Use fluid typography that scales with viewport width:

\`\`\`css
html {
  font-size: 16px;
}

@media (min-width: 768px) {
  html {
    font-size: calc(16px + 0.5vw);
  }
}

/* Alternatively, use clamp for fluid sizing */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
\`\`\`

## Testing Responsive Designs

1. **Use browser dev tools** to simulate various devices
2. **Test on actual devices** when possible
3. **Check orientation changes** (landscape/portrait)
4. **Verify touch interactions** work properly
5. **Test load times** on slower mobile connections

## Performance Considerations

1. **Optimize images** using responsive image techniques
2. **Minimize HTTP requests** by combining files
3. **Use lazy loading** for off-screen content
4. **Prioritize critical CSS** delivery

## Conclusion

Responsive design isn't just about adjusting layouts for different screen sizes—it's about creating an optimal experience for users regardless of how they access your content. By adopting these principles and techniques, you'll build web applications that are flexible, adaptable, and future-proof.
      `,
      publishedAt: "2023-06-10T14:45:00Z",
      authorId: author1.id,
      categoryId: designCategory.id,
      coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      readTime: 5,
      tags: ["responsive design", "ux design", "mobile", "web design"]
    });
    
    await this.createPost({
      title: "SEO Fundamentals for React Single Page Applications",
      slug: "seo-fundamentals-for-react-single-page-applications",
      excerpt: "SPAs face unique SEO challenges. This guide covers meta tags, server-side rendering, sitemaps, and other critical optimizations for better visibility...",
      content: `
# SEO Fundamentals for React Single Page Applications

Single Page Applications (SPAs) built with React provide excellent user experiences but face unique challenges when it comes to search engine optimization (SEO).

## Understanding the SEO Challenges for SPAs

Traditional SPAs have several SEO limitations:

1. **Limited initial HTML content** for search engines to crawl
2. **Client-side rendering** that search engines may not fully process
3. **Dynamic content loading** that can be missed during crawling
4. **URL management issues** affecting crawlability and indexing

## Essential SEO Solutions for React Applications

### 1. Server-Side Rendering (SSR)

Implement server-side rendering with frameworks like Next.js to improve initial content loading for search engines.

### 2. Dynamic Meta Tags

Implement dynamic meta tags for each page using React Helmet to provide appropriate SEO metadata.

### 3. Proper URL Structure

Use React Router with proper configuration to ensure clean, crawlable URLs for better SEO.

### 4. Sitemaps and Robots.txt

Generate dynamic sitemaps to help search engines discover and index your content more efficiently.

### 5. Structured Data (JSON-LD)

Implement structured data markup to enable rich snippets in search results, increasing visibility.

## Additional SEO Best Practices

1. **Performance optimization** - Site speed affects SEO ranking
2. **Mobile responsiveness** - Essential for modern SEO
3. **Internal linking** - Create a logical content hierarchy
4. **Image optimization** with proper alt tags
5. **Analytics and monitoring** to track SEO performance

## Conclusion

While React SPAs present unique SEO challenges, implementing server-side rendering, proper meta tags, structured URLs, and other best practices can significantly improve search engine visibility and ranking.
      `,
      publishedAt: "2023-05-25T08:55:00Z",
      authorId: author3.id,
      categoryId: techCategory.id,
      coverImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      readTime: 9,
      tags: ["seo", "react", "spa", "web development"]
    });
  }

  // Post methods
  async getAllPosts(limit?: number, offset?: number): Promise<Post[]> {
    let posts = Array.from(this.posts.values());
    
    // Apply offset if provided
    if (offset !== undefined) {
      posts = posts.slice(offset);
    }
    
    // Apply limit if provided
    if (limit !== undefined) {
      posts = posts.slice(0, limit);
    }
    
    // Sort by published date (newest first)
    return posts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    ).map(post => this.populatePostRelations(post));
  }
  
  async getPostById(id: number): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    return this.populatePostRelations(post);
  }
  
  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const post = Array.from(this.posts.values()).find(
      post => post.slug === slug
    );
    
    if (!post) return undefined;
    
    return this.populatePostRelations(post);
  }
  
  async getPostsByCategory(categorySlug: string): Promise<Post[]> {
    const category = Array.from(this.categories.values()).find(
      category => category.slug === categorySlug
    );
    
    if (!category) return [];
    
    const posts = Array.from(this.posts.values()).filter(
      post => post.categoryId === category.id
    );
    
    return posts.map(post => this.populatePostRelations(post));
  }
  
  async getFeaturedPost(): Promise<Post | undefined> {
    const featuredPost = Array.from(this.posts.values()).find(
      post => post.isFeatured
    );
    
    if (!featuredPost) return undefined;
    
    return this.populatePostRelations(featuredPost);
  }
  
  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.postIdCounter++;
    const author = await this.getAuthorById(insertPost.authorId);
    const category = await this.getCategoryById(insertPost.categoryId);
    
    if (!author || !category) {
      throw new Error(`Author or category not found for post ${insertPost.title}`);
    }
    
    const post: Post = {
      id,
      ...insertPost,
      isFeatured: insertPost.isFeatured || false,
      readTime: insertPost.readTime || 5,
      tags: insertPost.tags || [],
      author,
      category
    };
    
    this.posts.set(id, post);
    return post;
  }
  
  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      category => category.slug === slug
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    
    const category: Category = {
      id,
      slug: insertCategory.slug,
      name: insertCategory.name,
      description: insertCategory.description || null,
      image: insertCategory.image || null
    };
    
    this.categories.set(id, category);
    return category;
  }
  
  // Author methods
  async getAllAuthors(): Promise<Author[]> {
    return Array.from(this.authors.values());
  }
  
  async getAuthorById(id: number): Promise<Author | undefined> {
    return this.authors.get(id);
  }
  
  async createAuthor(insertAuthor: InsertAuthor): Promise<Author> {
    const id = this.authorIdCounter++;
    
    const author: Author = {
      id,
      name: insertAuthor.name,
      bio: insertAuthor.bio || null,
      avatarUrl: insertAuthor.avatarUrl || null
    };
    
    this.authors.set(id, author);
    return author;
  }
  
  // Helper methods
  private populatePostRelations(post: Post): Post {
    const author = this.authors.get(post.authorId);
    const category = this.categories.get(post.categoryId);
    
    if (!author || !category) {
      throw new Error(`Post ${post.id} has invalid relations`);
    }
    
    return {
      ...post,
      author,
      category
    };
  }
}

export const storage = new MemStorage();