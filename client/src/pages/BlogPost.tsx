import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Post } from "@shared/schema";
import MarkdownRenderer from "@/lib/MarkdownRenderer";
import Newsletter from "@/components/Newsletter";
import { Helmet } from "react-helmet";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const [match, params] = useRoute<{ slug: string }>("/post/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: [`/api/posts/slug/${slug}`],
    enabled: !!slug,
  });

  useEffect(() => {
    // Scroll to top when navigating to a new post
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <Link href="/" className="text-primary hover:text-blue-700 font-medium">
          Return to home page
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | BlogSphere</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:section" content={post.category.name} />
      </Helmet>

      <article className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-primary hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to articles
            </Link>
          </div>
          
          <header className="py-6">
            <div className="mb-2">
              <Link 
                href={`/category/${post.category.slug}`}
                className="inline-block bg-primary bg-opacity-90 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide rounded-full"
              >
                {post.category.name}
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
            
            <div className="flex items-center pb-6">
              <img 
                src={post.author.avatarUrl || undefined} 
                alt={post.author.name} 
                className="w-10 h-10 rounded-full mr-3" 
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                <div className="flex text-sm text-gray-500">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </time>
                  <span className="mx-1">&middot;</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
          </header>
        </div>
        
        <div className="w-full h-96 bg-gray-100 mb-10">
          <img 
            src={post.coverImage || undefined} 
            alt={post.title} 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="prose prose-lg prose-blue mx-auto">
            <MarkdownRenderer content={post.content} />
          </div>
          
          <Separator className="my-12" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 pb-12">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-medium text-gray-900">Tags</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags && post.tags.length > 0 ? (
                  post.tags.map((tag, index) => (
                    <Link 
                      key={index} 
                      href={`/tag/${tag}`}
                      className="inline-block bg-gray-100 px-3 py-1 text-sm text-gray-800 rounded-full hover:bg-gray-200"
                    >
                      #{tag}
                    </Link>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">No tags</span>
                )}
              </div>
            </div>
            <div className="flex space-x-4">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <span className="sr-only">Share on Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
              >
                <span className="sr-only">Share on Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-700 transition-colors duration-300"
              >
                <span className="sr-only">Share on LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>

      <Newsletter />
    </>
  );
};

export default BlogPost;
