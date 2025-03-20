import type { Meta, StoryObj } from "@storybook/react";
import Newsletter from "@/components/Newsletter";
import { createStoryMeta, createTemplate } from "@/lib/storybook";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

// Mock API call for Storybook
// @ts-ignore
window.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "Subscribed to newsletter successfully" }),
  })
);

const meta = createStoryMeta(Newsletter, "Components/Newsletter") as Meta<typeof Newsletter>;

export default meta;
type Story = StoryObj<typeof Newsletter>;

// Define a decorator to wrap the component with necessary providers
const withProviders = (Story: any) => (
  <QueryClientProvider client={queryClient}>
    <Story />
    <Toaster />
  </QueryClientProvider>
);

const Template = createTemplate((args) => <Newsletter {...args} />);

export const Default: Story = {
  render: Template,
  decorators: [withProviders],
};

// Custom render for showing loading state
export const LoadingState: Story = {
  render: () => {
    // Component to simulate loading state
    return (
      <QueryClientProvider client={queryClient}>
        <div className="bg-gray-50 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
              <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div className="lg:self-center">
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">Stay up to date</span>
                    <span className="block">with our newsletter</span>
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-indigo-200">
                    Get the latest articles, tutorials, and updates delivered straight to your inbox. No spam, ever.
                  </p>
                  <form className="mt-8 sm:flex">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-5 py-3 placeholder-gray-500 focus:ring-white focus:border-white sm:max-w-xs border-gray-300 rounded-md"
                      placeholder="Enter your email"
                      value="test@example.com"
                      disabled
                    />
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                      <button
                        type="button"
                        disabled
                        className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-300"
                      >
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="relative -mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                <img
                  className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top h-full w-full lg:h-full"
                  src="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=750&q=80"
                  alt="Newsletter signup illustration"
                />
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </QueryClientProvider>
    );
  },
};
