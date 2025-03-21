import { useCallback, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import BlogPostList from "@/components/BlogPostList";
import Newsletter from "@/components/Newsletter";
import { Post, Category } from "@shared/schema";
import { Helmet } from "react-helmet";

const POSTS_PER_PAGE = 5;

const Home = () => {
  const [page, setPage] = useState(1);
  // Keep track of all posts loaded so far
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  
  // Fetch posts with pagination
  const { 
    data: paginatedPosts = [], 
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
    isPending
  } = useQuery<Post[]>({
    queryKey: ["/api/posts", { limit: POSTS_PER_PAGE, offset: (page - 1) * POSTS_PER_PAGE }],
  });

  // Fetch categories for the sidebar
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Fetch featured post for the hero section
  const { data: featuredPost } = useQuery<Post>({
    queryKey: ["/api/posts/featured"],
  });
  
  // Update allPosts when new data comes in
  useEffect(() => {
    if (paginatedPosts.length > 0 && !isPending) {
      // Only add unique posts (avoid duplicates)
      const newPostIds = new Set(paginatedPosts.map(post => post.id));
      // Removed allPosts from this function to avoid the infinite loop
      setAllPosts(prevPosts => {
        const existingPosts = prevPosts.filter(post => !newPostIds.has(post.id));
        return [...existingPosts, ...paginatedPosts];
      });
    }
  }, [paginatedPosts, isPending]);
  
  // Load more posts when user scrolls to the bottom or clicks "Load More"
  const loadMore = useCallback(() => {
    if (!isLoadingPosts && !isFetchingPosts && paginatedPosts.length === POSTS_PER_PAGE) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isLoadingPosts, isFetchingPosts, paginatedPosts.length]);
  
  // Check if there might be more posts to load
  const hasMore = paginatedPosts.length === POSTS_PER_PAGE;

  return (
    <>
      <Helmet>
        <title>BlogSphere - Modern Blog Platform</title>
        <meta name="description" content="Explore our collection of thoughtful articles on technology, design, and personal development." />
      </Helmet>
      
      <Hero featuredPost={featuredPost} />
      
      <FeaturedCategories 
        categories={categories} 
      />
      
      <BlogPostList 
        posts={allPosts} 
        isLoading={isLoadingPosts || isFetchingPosts}
        loadMore={loadMore}
        hasMore={hasMore}
      />
      
      <Newsletter />
    </>
  );
};

export default Home;
