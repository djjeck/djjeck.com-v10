import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | BlogSphere</title>
        <meta name="description" content="Learn more about BlogSphere - a modern blog platform showcasing insights on technology, design, and professional development." />
      </Helmet>

      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">About BlogSphere</h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              A modern blog platform showcasing insights on technology, design, and professional development.
            </p>
          </div>

          <div className="prose prose-lg prose-blue mx-auto">
            <h2>Our Mission</h2>
            <p>
              At BlogSphere, we're passionate about sharing knowledge and insights on technology, design, and professional development. Our mission is to create a platform where experts and enthusiasts alike can share their experiences, best practices, and innovative ideas.
            </p>

            <h2>What We Cover</h2>
            <p>
              Our blog covers a wide range of topics including:
            </p>
            <ul>
              <li><strong>Technology</strong>: Latest trends in web development, programming languages, and tech innovations</li>
              <li><strong>Design</strong>: UX/UI design principles, design systems, and creative workflows</li>
              <li><strong>DevOps</strong>: Deployment strategies, CI/CD pipelines, and cloud services</li>
              <li><strong>Professional Development</strong>: Career advice, skill building, and industry insights</li>
            </ul>

            <h2>Our Team</h2>
            <p>
              BlogSphere is maintained by a small team of passionate developers and writers who are dedicated to creating high-quality content that helps others learn and grow in their careers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Sarah Johnson" 
                  className="w-32 h-32 rounded-full mx-auto"
                />
                <h3 className="mt-4 text-lg font-medium">Sarah Johnson</h3>
                <p className="text-gray-500">Founder & Lead Editor</p>
              </div>
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="David Chen" 
                  className="w-32 h-32 rounded-full mx-auto"
                />
                <h3 className="mt-4 text-lg font-medium">David Chen</h3>
                <p className="text-gray-500">Senior Developer & Writer</p>
              </div>
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Michael Torres" 
                  className="w-32 h-32 rounded-full mx-auto"
                />
                <h3 className="mt-4 text-lg font-medium">Michael Torres</h3>
                <p className="text-gray-500">DevOps Specialist & Writer</p>
              </div>
            </div>

            <h2>Get Involved</h2>
            <p>
              We welcome contributions from the community! If you have expertise in any of the areas we cover and would like to contribute a guest post, please reach out to us through our contact page.
            </p>
            <p>
              Thank you for being part of the BlogSphere community. We're excited to continue growing and learning together.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
