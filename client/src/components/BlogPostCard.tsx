import { Link } from "wouter";
import { Post } from "@shared/schema";

interface BlogPostCardProps {
  post: Post;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/post/${post.slug}`}>
        <div className="relative">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-48 object-cover" 
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-primary bg-opacity-90 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide rounded-full">
              {post.category.name}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <img 
              src={post.author.avatarUrl} 
              alt={post.author.name} 
              className="w-8 h-8 rounded-full mr-2" 
            />
            <span>{post.author.name}</span>
            <span className="mx-2">&middot;</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            <span className="mx-2">&middot;</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogPostCard;
