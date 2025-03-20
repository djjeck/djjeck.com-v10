import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import BlogPostList from "@/components/BlogPostList";
import Newsletter from "@/components/Newsletter";
import { Post, Category } from "@shared/schema";
import { Helmet } from "react-helmet";

const CategoryPage = () => {
  const [match, params] = useRoute<{ category: string }>("/category/:category");
  const categorySlug = params?.category;

  const { data: category, isLoading: isLoadingCategory } = useQuery<Category>({
    queryKey: ["/api/categories/slug", categorySlug],
    enabled: !!categorySlug && categorySlug !== "all",
  });

  const { data: posts, isLoading: isLoadingPosts } = useQuery<Post[]>({
    queryKey: ["/api/posts/category", categorySlug],
    enabled: !!categorySlug,
  });

  const { data: allCategories, isLoading: isLoadingAllCategories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const title = categorySlug === "all" 
    ? "All Categories" 
    : category?.name || "Loading Category";

  const description = categorySlug === "all"
    ? "Browse all articles across all categories"
    : category?.description || "Loading category details";

  return (
    <>
      <Helmet>
        <title>{title} | BlogSphere</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              {description}
            </p>
          </div>

          {categorySlug === "all" && !isLoadingAllCategories && allCategories && (
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                {allCategories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          <BlogPostList
            posts={posts || []}
            isLoading={isLoadingPosts}
          />
        </div>
      </div>

      <Newsletter />
    </>
  );
};

export default CategoryPage;
