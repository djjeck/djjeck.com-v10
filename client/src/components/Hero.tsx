import { Link } from "wouter";
import { Post } from "@shared/schema";

interface HeroProps {
  featuredPost?: Post;
}

const Hero = ({ featuredPost }: HeroProps) => {
  if (!featuredPost) {
    return (
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 lg:pr-8">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl mb-6">
                Insights for the modern world
              </h1>
              <p className="text-xl text-gray-500 mb-8 max-w-2xl">
                Explore our collection of thoughtful articles on technology,
                design, and personal development.
              </p>
              <div>
                <Link
                  href="#featured"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-600 transition duration-300"
                >
                  Start Reading
                </Link>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:w-1/2">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80"
                    alt="Person typing on laptop with coffee"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
                  <span className="inline-block bg-accent bg-opacity-90 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide rounded-full mb-2">
                    Featured
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Loading featured content...
                  </h2>
                  <p className="text-sm text-gray-200 mt-2">
                    Check back soon for our featured article
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 lg:pr-8">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl mb-6">
              Insights for the modern world
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl">
              Explore our collection of thoughtful articles on technology,
              design, and personal development.
            </p>
            <div>
              <Link
                href="#featured"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-600 transition duration-300"
              >
                Start Reading
              </Link>
            </div>
          </div>
          <div className="mt-8 lg:mt-0 lg:w-1/2">
            <Link href={`/post/${featuredPost.slug}`}>
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
                  <span className="inline-block bg-accent bg-opacity-90 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide rounded-full mb-2">
                    Featured
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm text-gray-200 mt-2">
                    Published on{" "}
                    {new Date(featuredPost.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}{" "}
                    • {featuredPost.readTime} min read
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
