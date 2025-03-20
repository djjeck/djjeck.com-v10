import type { Meta, StoryObj } from "@storybook/react";
import BlogPostCard from "@/components/BlogPostCard";
import { createStoryMeta, createTemplate, createStoryVariant } from "@/lib/storybook";

const meta = createStoryMeta(BlogPostCard, "Components/BlogPostCard") as Meta<typeof BlogPostCard>;

export default meta;
type Story = StoryObj<typeof BlogPostCard>;

const Template = createTemplate(BlogPostCard);

export const Default: Story = createStoryVariant(Template, {
  post: {
    id: 1,
    title: "The Future of TypeScript in Modern Web Development",
    slug: "future-of-typescript-in-modern-web-development",
    excerpt: "TypeScript has revolutionized how developers build and maintain large-scale JavaScript applications. In this article, we explore upcoming features and best practices...",
    content: "# Content goes here",
    publishedAt: "2023-06-10T10:30:00Z",
    authorId: 1,
    categoryId: 1,
    coverImage: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    readTime: 6,
    tags: ["typescript", "javascript", "web development", "programming"],
    author: {
      id: 1,
      name: "Sarah Johnson",
      bio: "Senior Developer with expertise in React and TypeScript",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    category: {
      id: 1,
      name: "Technology",
      slug: "technology",
      description: "Latest trends and insights in technology",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    }
  }
});

export const DesignCategory: Story = createStoryVariant(Template, {
  post: {
    id: 2,
    title: "Designing Component Libraries with Storybook",
    slug: "designing-component-libraries-with-storybook",
    excerpt: "Learn how to create and document reusable component libraries using Storybook. We'll dive into organizing, testing, and sharing components across teams...",
    content: "# Content goes here",
    publishedAt: "2023-06-08T14:45:00Z",
    authorId: 2,
    categoryId: 2,
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    readTime: 8,
    tags: ["storybook", "component library", "react", "design systems"],
    author: {
      id: 2,
      name: "David Chen",
      bio: "UI/UX Designer and frontend developer",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    category: {
      id: 2,
      name: "Design",
      slug: "design",
      description: "UI/UX design principles and best practices",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    }
  }
});

export const DevOpsCategory: Story = createStoryVariant(Template, {
  post: {
    id: 3,
    title: "Mastering Heroku Deployments for React Applications",
    slug: "mastering-heroku-deployments-for-react-applications",
    excerpt: "Deploying React applications doesn't have to be complex. This comprehensive guide covers everything from basic deployment to advanced CI/CD pipelines...",
    content: "# Content goes here",
    publishedAt: "2023-06-05T09:15:00Z",
    authorId: 3,
    categoryId: 3,
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    readTime: 10,
    tags: ["heroku", "deployment", "react", "devops", "ci/cd"],
    author: {
      id: 3,
      name: "Michael Torres",
      bio: "DevOps specialist with 10 years of experience",
      avatarUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    category: {
      id: 3,
      name: "DevOps",
      slug: "devops",
      description: "Deployment strategies and CI/CD pipelines",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  }
});
