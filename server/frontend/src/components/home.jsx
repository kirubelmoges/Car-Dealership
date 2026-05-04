import React from 'react';
import Header from './Header/Header';
import RegisterPanel from "./Register/Register.jsx";

// Import images correctly
import person1 from "./person1.png";
import person2 from "./person2.png";
import person3 from "./person3.png";

const Home = () => {
  const teamMembers = [
    {
      name: "Evelyn Carter",
      role: "Founder & CEO of Innovexa Tech Solutions",
      description: "I'm the founder of a tech startup that develops AI-driven tools for small businesses. My focus is on creating practical solutions that make digital transformation accessible to everyone.",
      email: "evelyn.carter.innovexa@gmail.com",
      image: person1
    },
    {
      name: "Marcus Delgado",
      role: "CEO at VisionEdge Marketing Group",
      description: "As the CEO of a marketing agency, I lead a team that helps brands grow through data-driven strategies and creative storytelling. I believe in building long-term partnerships rather than one-time campaigns.",
      email: "marcus.delgado.visionedge@gmail.com",
      image: person2
    },
    {
      name: "Leila Hassan",
      role: "Founder & Creative Director of Verde Sustainable Fashion",
      description: "I recently moved to a new city for my career, and adjusting has been both exciting and difficult. I'm learning to embrace change and find comfort in small routines.",
      email: "leila.hassan.verdefashion@gmail.com",
      image: person3
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-950 font-['Inter',system-ui,-apple-system,sans-serif]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeInUp">
        {/* Hero Section with Registration - 2 Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          
          {/* Left Side - Company Information */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent leading-tight">
                Find Your Dream Car
              </h1>
              <p className="text-neutral-400 text-lg leading-relaxed">
                Welcome to <span className="text-white font-semibold">Dealerships</span> – your trusted partner 
                in finding the perfect vehicle. With over 20 years of experience, we connect 
                buyers with the best dealerships across the nation.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
                <div className="text-neutral-500 text-xs uppercase tracking-wide mt-1">Dealerships</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-white">10k+</div>
                <div className="text-neutral-500 text-xs uppercase tracking-wide mt-1">Happy Customers</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-white">50k+</div>
                <div className="text-neutral-500 text-xs uppercase tracking-wide mt-1">Cars Sold</div>
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Why Choose Us?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">✓</div>
                  <div>
                    <h4 className="text-white font-medium">Verified Dealerships</h4>
                    <p className="text-neutral-500 text-sm">All dealerships are thoroughly vetted and trusted</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">✓</div>
                  <div>
                    <h4 className="text-white font-medium">Best Price Guarantee</h4>
                    <p className="text-neutral-500 text-sm">We ensure you get the best deals on the market</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">✓</div>
                  <div>
                    <h4 className="text-white font-medium">24/7 Customer Support</h4>
                    <p className="text-neutral-500 text-sm">Our team is always here to help you</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-6 bg-gradient-to-r from-neutral-900/50 to-neutral-800/30 rounded-2xl border border-white/10">
              <div className="text-neutral-400 italic text-sm leading-relaxed">
                "Absolutely amazing experience! Found my dream car within days. 
                The registration process was seamless and the dealerships are top-notch."
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-700"></div>
                <div>
                  <div className="text-white text-sm font-medium">Michael Johnson</div>
                  <div className="text-neutral-500 text-xs">Verified Buyer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Panel */}
          <div className="lg:pl-8">
            <div className="sticky top-24">
              <RegisterPanel />
            </div>
          </div>
        </div>

        {/* About Us Section - Full Width */}
        <div className="mt-20 pt-12 border-t border-white/10">
          {/* About Hero */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-4">
              About Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-neutral-500 to-transparent mx-auto mb-6"></div>
            <p className="text-neutral-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Welcome to <span className="text-white font-semibold">Best Cars</span> dealership, home to the best cars in North America. 
              We deal in the sale of domestic and imported cars at reasonable prices.
            </p>
          </div>

          {/* Company Info Card */}
          <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Your Trusted Automotive Partner
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                With over 20 years of experience in the automotive industry, Best Cars has established itself 
                as a premier dealership across North America. We pride ourselves on offering an extensive 
                selection of both domestic and imported vehicles at competitive prices. Our commitment to 
                excellence and customer satisfaction has made us the preferred choice for thousands of happy 
                customers.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              Meet Our Leadership Team
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="group bg-neutral-900/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl"
                >
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      src={member.image} 
                      alt={member.name}
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-neutral-400 text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                      {member.description}
                    </p>
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-neutral-400 hover:text-white text-xs transition-colors duration-200 inline-flex items-center gap-1"
                    >
                      {member.email}
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframes animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;