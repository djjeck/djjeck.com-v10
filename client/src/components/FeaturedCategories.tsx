import { Link } from "wouter";
import { Category } from "@shared/schema";

interface FeaturedCategoriesProps {
  categories: Category[];
}

const FeaturedCategories = ({ categories }: FeaturedCategoriesProps) => {
  if (categories.length === 0) {
    return (
      <section className="py-8 bg-gray-50" id="categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-md h-32 flex items-center justify-center">
              <p className="text-gray-500">Loading categories...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gray-50" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Explore Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative block overflow-hidden rounded-lg bg-white shadow hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={category.image}
                  alt={`${category.name} category`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
                  <h3 className="text-lg font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
