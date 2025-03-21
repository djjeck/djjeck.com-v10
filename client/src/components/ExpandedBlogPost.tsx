import { Link } from "wouter";
import { Post } from "@shared/schema";
import MarkdownRenderer from "@/lib/MarkdownRenderer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import ImageCarousel from "./ImageCarousel";

interface ExpandedBlogPostProps {
  post: Post;
}

const ExpandedBlogPost = ({ post }: ExpandedBlogPostProps) => {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md mb-8 p-6">
      {/* Header with title and category */}
      <header className="mb-6">
        <Link href={`/category/${post.category.slug}`}>
          <Badge variant="outline" className="mb-3 hover:bg-primary/10">
            {post.category.name}
          </Badge>
        </Link>
        <Link href={`/post/${post.slug}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors">
            {post.title}
          </h2>
        </Link>
        
        {/* Post metadata */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
          <div className="flex items-center">
            <img 
              src={post.author.avatarUrl || undefined} 
              alt={post.author.name} 
              className="w-8 h-8 rounded-full mr-2" 
            />
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author.name}
            </span>
          </div>
          
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(post.publishedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTime} min read
          </span>
        </div>
      </header>
      
      {/* Post images carousel */}
      {post.images && post.images.length > 0 ? (
        <ImageCarousel images={post.images} altText={post.title} />
      ) : post.coverImage ? (
        <div className="my-6">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-auto rounded-lg object-cover" 
          />
        </div>
      ) : null}
      
      {/* Excerpt for preview */}
      <div className="text-gray-600 text-lg mb-4">
        {post.excerpt}
      </div>
      
      {/* Content */}
      <div className="prose max-w-none">
        <MarkdownRenderer content={post.content} />
      </div>
      
      {/* "Read more" link for the full post */}
      <div className="mt-6">
        <Link href={`/post/${post.slug}`}>
          <span className="text-primary font-medium hover:underline">
            Read full article →
          </span>
        </Link>
      </div>
    </article>
  );
};

export default ExpandedBlogPost;