import { 
  Post, 
  InsertPost, 
  Category, 
  InsertCategory, 
  Author, 
  InsertAuthor 
} from "@shared/schema";

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
    this.initSampleData();
  }

  private initSampleData() {
    // Create sample authors
    const author1 = this.createAuthor({
      name: "Sarah Johnson",
      bio: "Senior Developer with expertise in React and TypeScript",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    const author2 = this.createAuthor({
      name: "David Chen",
      bio: "UI/UX Designer and frontend developer",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    const author3 = this.createAuthor({
      name: "Michael Torres",
      bio: "DevOps specialist with 10 years of experience",
      avatarUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    // Create sample categories
    const techCategory = this.createCategory({
      name: "Technology",
      slug: "technology",
      description: "Latest trends and insights in technology",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    });
    
    const designCategory = this.createCategory({
      name: "Design",
      slug: "design",
      description: "UI/UX design principles and best practices",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    });
    
    const devopsCategory = this.createCategory({
      name: "DevOps",
      slug: "devops",
      description: "Deployment strategies and CI/CD pipelines",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    });
    
    const productivityCategory = this.createCategory({
      name: "Productivity",
      slug: "productivity",
      description: "Tips and tools for maximum productivity",
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    });
    
    // Create sample posts
    this.createPost({
      title: "The Future of TypeScript in Modern Web Development",
      slug: "future-of-typescript-in-modern-web-development",
      excerpt: "TypeScript has revolutionized how developers build and maintain large-scale JavaScript applications. In this article, we explore upcoming features and best practices...",
      content: `
# The Future of TypeScript in Modern Web Development

TypeScript has revolutionized how developers build and maintain large-scale JavaScript applications. As it continues to evolve, let's explore what's on the horizon for this powerful language.

## Why TypeScript Is Gaining Momentum

TypeScript adoption has exploded in recent years, with more frameworks and libraries choosing it as their default language. Here's why:

1. **Type Safety**: Catching errors at compile time rather than runtime
2. **Enhanced IDE Support**: Better autocomplete, refactoring, and documentation
3. **Enterprise Readiness**: Features designed for large codebases and teams

## Upcoming Features in TypeScript 5.0

The TypeScript team is working on several exciting features for upcoming releases:

\`\`\`typescript
// Pattern matching (proposed)
function processShape(shape: Shape) {
  match (shape) {
    when Circle c => console.log(\`Circle with radius \${c.radius}\`);
    when Rectangle r => console.log(\`Rectangle \${r.width}×\${r.height}\`);
    when Triangle t => console.log(\`Triangle with area \${t.area}\`);
  }
}

// Decorators (stage 3 proposal implementation)
@logged
class Person {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  @deprecated("Use sayHello instead")
  greet() {
    console.log(\`Hello, \${this.name}\`);
  }
}
\`\`\`

## TypeScript in Server-Side Development

TypeScript is no longer just for frontend development. It's making significant inroads into backend development with Node.js, Deno, and other runtimes.

## Best Practices for TypeScript Projects

Here are some recommendations for maintaining clean and efficient TypeScript codebases:

- Use strict mode to catch more errors
- Leverage utility types like \`Partial<T>\`, \`Pick<T>\`, and \`Omit<T>\`
- Properly structure your project with clear module boundaries
- Implement thorough testing with typed test frameworks

## Conclusion

TypeScript continues to evolve with the changing landscape of web development. By embracing its features and following best practices, developers can build more robust and maintainable applications.

Stay tuned for more updates as TypeScript's exciting journey continues!
      `,
      publishedAt: "2023-06-10T10:30:00Z",
      authorId: author1.id,
      categoryId: techCategory.id,
      coverImage: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      readTime: 6,
      tags: ["typescript", "javascript", "web development", "programming"]
    });
    
    this.createPost({
      title: "Designing Component Libraries with Storybook",
      slug: "designing-component-libraries-with-storybook",
      excerpt: "Learn how to create and document reusable component libraries using Storybook. We'll dive into organizing, testing, and sharing components across teams...",
      content: `
# Designing Component Libraries with Storybook

Component libraries are essential for maintaining consistency across large applications. Storybook has emerged as the industry standard for developing and documenting these libraries.

## Getting Started with Storybook

Setting up Storybook in your React project is straightforward:

\`\`\`bash
# Install Storybook in your React project
npx storybook init
\`\`\`

This creates a basic Storybook configuration with example stories.

## Writing Effective Stories

Stories represent the different states of your components:

\`\`\`tsx
// Button.stories.tsx
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};

// Template for all button variants
const Template = (args) => <Button {...args} />;

// Primary button
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button',
  size: 'medium',
};

// Secondary button
export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary Button',
  size: 'medium',
};
\`\`\`

## Organizing Your Component Library

Structure is crucial for maintainability:

- Group related components together
- Use consistent naming conventions
- Implement a clear folder structure

## Testing Components in Storybook

Storybook integrates well with testing frameworks:

- Visual regression testing with Chromatic
- Accessibility testing with the a11y addon
- Interaction testing with the interactions addon

## Sharing and Distributing Your Library

Once your library is ready, you can share it:

- Publish as an npm package
- Deploy Storybook to a static hosting service
- Integrate with design systems

## Conclusion

Storybook is a powerful tool for building component libraries. By following these best practices, you can create a library that's easy to use, well-documented, and maintainable.
      `,
      publishedAt: "2023-06-08T14:45:00Z",
      authorId: author2.id,
      categoryId: designCategory.id,
      coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      readTime: 8,
      tags: ["storybook", "component library", "react", "design systems"]
    });
    
    this.createPost({
      title: "Mastering Heroku Deployments for React Applications",
      slug: "mastering-heroku-deployments-for-react-applications",
      excerpt: "Deploying React applications doesn't have to be complex. This comprehensive guide covers everything from basic deployment to advanced CI/CD pipelines...",
      content: `
# Mastering Heroku Deployments for React Applications

Heroku offers one of the simplest ways to deploy React applications, but there are many nuances to consider for production-ready deployments.

## Setting Up Your React App for Heroku

Before deploying, you need to prepare your React application:

1. Create a \`static.json\` file in your project root:

\`\`\`json
{
  "root": "build/",
  "routes": {
    "/**": "index.html"
  },
  "https_only": true,
  "headers": {
    "/**": {
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "X-Content-Type-Options": "nosniff"
    }
  }
}
\`\`\`

2. Add a Procfile with the following content:

\`\`\`
web: npm run start
\`\`\`

3. Update your package.json to include the correct scripts:

\`\`\`json
"scripts": {
  "start": "node server.js",
  "build": "react-scripts build",
  "heroku-postbuild": "npm run build"
}
\`\`\`

## Deploying to Heroku

You can deploy to Heroku using either the Heroku CLI or GitHub integration:

### Using Heroku CLI

\`\`\`bash
# Login to Heroku
heroku login

# Create a new Heroku app
heroku create my-react-app

# Push to Heroku
git push heroku main
\`\`\`

### Using GitHub Integration

1. Connect your GitHub repository to Heroku
2. Enable automatic deploys from your main branch
3. Configure review apps for pull requests

## Setting Up Environment Variables

Secure your application by using environment variables:

\`\`\`bash
heroku config:set REACT_APP_API_URL=https://api.example.com
\`\`\`

## Implementing Continuous Integration/Continuous Deployment

For a robust deployment pipeline:

1. Set up GitHub Actions or CircleCI
2. Configure tests to run before deployment
3. Add automatic deployment to Heroku on successful tests

## Monitoring and Scaling

Once deployed, monitor your application:

- Use Heroku's built-in metrics
- Set up New Relic or Datadog for advanced monitoring
- Scale dynos based on traffic patterns

## Conclusion

Heroku provides a powerful platform for deploying React applications. By following these best practices, you can ensure a smooth, secure, and scalable deployment process.
      `,
      publishedAt: "2023-06-05T09:15:00Z",
      authorId: author3.id,
      categoryId: devopsCategory.id,
      coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      readTime: 10,
      tags: ["heroku", "deployment", "react", "devops", "ci/cd"]
    });

    this.createPost({
      title: "Implementing Markdown Support in React Applications",
      slug: "implementing-markdown-support-in-react-applications",
      excerpt: "Discover how to add powerful markdown rendering capabilities to your React blog with code syntax highlighting, custom components, and more...",
      content: `
# Implementing Markdown Support in React Applications

Adding markdown support to your React application enhances content creation and display capabilities, especially for blogs and documentation sites.

## Why Markdown?

Markdown offers several advantages:

1. **Simplicity**: Easy to write and read
2. **Portability**: Can be converted to HTML, PDF, and other formats
3. **Flexibility**: Supports rich formatting without complex editors

## Setting Up react-markdown

The most popular library for rendering Markdown in React is \`react-markdown\`:

\`\`\`bash
npm install react-markdown remark-gfm
\`\`\`

Basic implementation:

\`\`\`tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
\`\`\`

## Adding Syntax Highlighting

For code blocks, you'll want syntax highlighting:

\`\`\`bash
npm install react-syntax-highlighter
\`\`\`

Implementation:

\`\`\`tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
\`\`\`

## Customizing Components

You can customize how all markdown elements are rendered:

\`\`\`tsx
components={{
  h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4" {...props} />,
  h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
  a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
  // Add more component customizations as needed
}}
\`\`\`

## Handling Images

To process images within markdown:

\`\`\`tsx
img: ({node, ...props}) => (
  <img className="max-w-full h-auto my-6 rounded-lg" {...props} />
)
\`\`\`

## Advanced Features

Consider these advanced features:

1. **Lazy loading images** for better performance
2. **Table of contents** generation
3. **Front matter** parsing for metadata
4. **Custom components** like callouts or embeds

## Conclusion

Implementing markdown in your React application provides a powerful content authoring experience. With these techniques, you can create a robust markdown renderer tailored to your specific needs.
      `,
      publishedAt: "2023-06-01T11:20:00Z",
      authorId: author1.id,
      categoryId: techCategory.id,
      coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      readTime: 7,
      tags: ["markdown", "react", "javascript", "content management"]
    });

    this.createPost({
      title: "Responsive Design Strategies for Content-Heavy Sites",
      slug: "responsive-design-strategies-for-content-heavy-sites",
      excerpt: "Creating responsive layouts for blogs and content sites presents unique challenges. Learn how to maintain readability and engagement across all devices...",
      content: `
# Responsive Design Strategies for Content-Heavy Sites

Content-heavy websites like blogs and news portals require special consideration when implementing responsive design. User experience, readability, and performance all play crucial roles.

## Understanding the Challenges

Content-heavy sites face several specific challenges:

1. **Text readability** across various screen sizes
2. **Image scaling** while maintaining quality and context
3. **Navigation complexity** with extensive sections and categories
4. **Performance issues** with large amounts of content

## Core Principles for Responsive Content Design

### Fluid Typography

Rather than fixed breakpoints for font sizes, implement a fluid typography system:

\`\`\`css
:root {
  --fluid-min-width: 320;
  --fluid-max-width: 1200;
  
  --fluid-min-size: 16;
  --fluid-max-size: 20;
  
  --fluid-min-ratio: calc(var(--fluid-min-size) / var(--fluid-min-width));
  --fluid-max-ratio: calc(var(--fluid-max-size) / var(--fluid-max-width));
  
  --fluid-size: calc(
    var(--fluid-min-ratio) * 100vw + 
    (var(--fluid-max-ratio) - var(--fluid-min-ratio)) * 
    ((100vw - (var(--fluid-min-width) * 1px)) / 
    ((var(--fluid-max-width) - var(--fluid-min-width)) * 1px))
  );
}

body {
  font-size: clamp(
    var(--fluid-min-size) * 1px,
    var(--fluid-size),
    var(--fluid-max-size) * 1px
  );
}
\`\`\`

### Prioritized Content

Use a content-first approach:

1. Identify core content that must be visible at all breakpoints
2. Design multiple layouts that best showcase this content at different widths
3. Use techniques like progressive disclosure for secondary content on small screens

### Optimized Images

Implement a comprehensive image strategy:

\`\`\`html
<picture>
  <source 
    media="(max-width: 480px)"
    srcset="image-small.jpg 480w"
  >
  <source 
    media="(max-width: 800px)"
    srcset="image-medium.jpg 800w"
  >
  <img 
    src="image-large.jpg" 
    alt="Descriptive alt text"
    loading="lazy"
    width="1200"
    height="675"
  >
</picture>
\`\`\`

### Layout Patterns That Scale

Several layout patterns work well for content-heavy sites:

1. **Card grid** with adjustable columns based on viewport width
2. **Magazine layout** that reorganizes for smaller screens
3. **Content-sidebar** that stacks vertically on mobile

## Implementing Responsive Navigation

For sites with complex navigation:

1. Use a combination of horizontal and vertical menus based on screen size
2. Implement search prominently to help users find content directly
3. Consider a "sticky" table of contents for long-form content

## Performance Considerations

Content-heavy sites must prioritize performance:

1. Implement lazy loading for images and comments
2. Use pagination or infinite scrolling for long content lists
3. Consider content delivery networks (CDNs) for media assets

## Testing and Iteration

Responsive design requires thorough testing:

1. Test on actual devices, not just browser simulations
2. Analyze user behavior metrics at different breakpoints
3. Continuously iterate based on performance and engagement data

## Conclusion

Responsive design for content-heavy sites requires thoughtful strategy and implementation. By focusing on readability, prioritization, and performance, you can create an excellent experience for all users, regardless of device.
      `,
      publishedAt: "2023-05-28T16:40:00Z",
      authorId: author2.id,
      categoryId: designCategory.id,
      coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      readTime: 5,
      tags: ["responsive design", "ux design", "mobile", "web design"]
    });

    this.createPost({
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

Implement server-side rendering with frameworks like Next.js:

\`\`\`jsx
// pages/blog/[slug].js with Next.js
export async function getServerSideProps({ params }) {
  const { slug } = params;
  const post = await fetchPostBySlug(slug);
  
  return {
    props: { post }
  };
}

function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export default BlogPost;
\`\`\`

### 2. Dynamic Meta Tags

Implement dynamic meta tags for each page:

\`\`\`jsx
import { Helmet } from 'react-helmet';

function BlogPost({ post }) {
  return (
    <>
      <Helmet>
        <title>{post.title} | My Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishDate} />
        <link rel="canonical" href={\`https://myblog.com/post/\${post.slug}\`} />
      </Helmet>
      {/* Rest of component */}
    </>
  );
}
\`\`\`

### 3. Proper URL Structure

Use React Router with proper configuration:

\`\`\`jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

### 4. Sitemaps and Robots.txt

Generate a dynamic sitemap for search engines:

\`\`\`jsx
// pages/sitemap.xml.js in Next.js
import { getAllPosts } from '../lib/api';

const Sitemap = () => {};

export async function getServerSideProps({ res }) {
  const posts = await getAllPosts();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://myblog.com</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${posts.map(post => `
        <url>
          <loc>https://myblog.com/blog/${post.slug}</loc>
          <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>
  `;
  
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  
  return {
    props: {},
  };
}

export default Sitemap;
\`\`\`

### 5. Structured Data (JSON-LD)

Implement structured data for rich snippets:

\`\`\`jsx
import { Helmet } from 'react-helmet';

function BlogPost({ post }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.imageUrl,
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "My Blog",
      "logo": {
        "@type": "ImageObject",
        "url": "https://myblog.com/logo.png"
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.updatedAt,
    "description": post.excerpt
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      {/* Rest of component */}
    </>
  );
}
\`\`\`

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
    
    // Populate author and category for each post
    return posts.map(post => this.populatePostRelations(post));
  }

  async getPostById(id: number): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    return this.populatePostRelations(post);
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const post = Array.from(this.posts.values()).find(post => post.slug === slug);
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
    const post = Array.from(this.posts.values()).find(post => post.isFeatured);
    if (!post) return undefined;
    
    return this.populatePostRelations(post);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.postIdCounter++;
    const now = new Date().toISOString();
    
    const post: Post = {
      ...insertPost,
      id,
      tags: insertPost.tags || [],
      isFeatured: insertPost.isFeatured || false,
    };
    
    this.posts.set(id, post);
    return this.populatePostRelations(post);
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(category => category.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    
    const category: Category = {
      ...insertCategory,
      id
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
      ...insertAuthor,
      id
    };
    
    this.authors.set(id, author);
    return author;
  }

  // Helper method to populate post relations
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
