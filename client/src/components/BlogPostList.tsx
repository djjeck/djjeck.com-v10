import { useState, useRef, useEffect } from "react";
import { Post } from "@shared/schema";
import ExpandedBlogPost from "./ExpandedBlogPost";
import { Filter, ArrowRightFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface BlogPostListProps {
  posts: Post[];
  isLoading: boolean;
  loadMore?: () => void;
  hasMore?: boolean;
}

type SortOption = "newest" | "oldest" | "readTime";

const BlogPostList = ({ 
  posts, 
  isLoading, 
  loadMore, 
  hasMore = false 
}: BlogPostListProps) => {
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const loaderRef = useRef<HTMLDivElement>(null);

  // Infinite scroll observer
  useEffect(() => {
    if (!loadMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [loadMore, hasMore]);

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case "oldest":
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case "readTime":
        return (a.readTime || 0) - (b.readTime || 0);
      default:
        return 0;
    }
  });

  if (isLoading && posts.length === 0) {
    return (
      <section className="py-12 bg-white" id="featured">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
          </div>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="bg-white rounded-lg overflow-hidden shadow-md p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="flex space-x-4 mb-6">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 my-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 my-auto"></div>
                </div>
                <div className="w-full h-64 bg-gray-200 rounded mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mt-6"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="py-12 bg-white" id="featured">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">No articles found</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white" id="featured">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowRightFromLine className="h-5 w-5 rotate-90" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOption("newest")}>
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("oldest")}>
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("readTime")}>
                  Reading Time
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Posts</DropdownMenuItem>
                <DropdownMenuItem>Technology</DropdownMenuItem>
                <DropdownMenuItem>Design</DropdownMenuItem>
                <DropdownMenuItem>DevOps</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-12">
          {sortedPosts.map((post) => (
            <ExpandedBlogPost key={post.id} post={post} />
          ))}
        </div>

        {isLoading && (
          <div className="my-8 flex justify-center">
            <div className="w-8 h-8 border-4 border-t-primary border-r-primary border-b-primary border-l-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div ref={loaderRef} className="h-20 flex items-center justify-center">
          {hasMore && !isLoading && (
            <Button
              variant="outline"
              className="px-6 py-3 border border-primary text-primary bg-white hover:bg-blue-50"
              onClick={loadMore}
            >
              Load More Articles
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogPostList;
