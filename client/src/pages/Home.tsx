import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import BlogPostList from "@/components/BlogPostList";
import Newsletter from "@/components/Newsletter";
import { Post, Category } from "@shared/schema";
import { Helmet } from "react-helmet";

const Home = () => {
  const { data: posts, isLoading: isLoadingPosts } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: featuredPost, isLoading: isLoadingFeatured } = useQuery<Post>({
    queryKey: ["/api/posts/featured"],
  });

  return (
    <>
      <Helmet>
        <title>BlogSphere - Modern Blog Platform</title>
        <meta name="description" content="Explore our collection of thoughtful articles on technology, design, and personal development." />
      </Helmet>
      
      <Hero featuredPost={featuredPost} />
      
      <FeaturedCategories 
        categories={categories || []} 
      />
      
      <BlogPostList 
        posts={posts || []} 
        isLoading={isLoadingPosts} 
      />
      
      <Newsletter />
    </>
  );
};

export default Home;
