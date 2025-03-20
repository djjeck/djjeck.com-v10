import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">BlogSphere</span>
            </Link>
            <nav className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`${
                  isActive("/")
                    ? "border-primary text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } border-b-2 px-1 pt-1 text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                href="/category/all"
                className={`${
                  isActive("/category/all")
                    ? "border-primary text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } border-b-2 px-1 pt-1 text-sm font-medium`}
              >
                Categories
              </Link>
              <Link
                href="/about"
                className={`${
                  isActive("/about")
                    ? "border-primary text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } border-b-2 px-1 pt-1 text-sm font-medium`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`${
                  isActive("/contact")
                    ? "border-primary text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } border-b-2 px-1 pt-1 text-sm font-medium`}
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span className="sr-only">Search</span>
              <Search className="h-6 w-6" />
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`sm:hidden ${isMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`${
              isActive("/")
                ? "bg-gray-50 border-primary text-primary"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            Home
          </Link>
          <Link
            href="/category/all"
            className={`${
              isActive("/category/all")
                ? "bg-gray-50 border-primary text-primary"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            Categories
          </Link>
          <Link
            href="/about"
            className={`${
              isActive("/about")
                ? "bg-gray-50 border-primary text-primary"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`${
              isActive("/contact")
                ? "bg-gray-50 border-primary text-primary"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
