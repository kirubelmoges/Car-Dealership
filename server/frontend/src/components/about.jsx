import React, { useState, useEffect } from 'react';

const About = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const curr_user = sessionStorage.getItem('username');
    if (curr_user && curr_user !== "") {
      setUsername(curr_user);
    }
  }, []);

  const logout = async () => {
    let logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });

    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      alert("Logging out " + username + "...");
      window.location.href = window.location.origin;
    } else {
      alert("The user could not be logged out.");
    }
  };

  const teamMembers = [
    {
      name: "Evelyn Carter",
      role: "Founder & CEO",
      description: "With over 15 years of experience in the automotive industry, Evelyn leads our team with passion and innovation. Her vision has shaped Best Cars into a trusted name across North America.",
      email: "evelyn.carter@bestcars.com",
      icon: ""
    },
    {
      name: "Marcus Delgado",
      role: "Head of Sales",
      description: "Marcus brings over a decade of sales expertise, ensuring every customer finds their perfect vehicle at the best price. His customer-first approach sets us apart.",
      email: "marcus.delgado@bestcars.com",
      icon: ""
    },
    {
      name: "Leila Hassan",
      role: "Customer Experience Director",
      description: "Leila is dedicated to making every interaction memorable. She leads our customer support team to provide exceptional service 24/7.",
      email: "leila.hassan@bestcars.com",
      icon: ""
    },
    {
      name: "James Wilson",
      role: "Chief Mechanic",
      description: "With 20+ years of mechanical expertise, James ensures every vehicle meets our strict quality standards before reaching our customers.",
      email: "james.wilson@bestcars.com",
      icon: ""
    },
    {
      name: "Sophia Chen",
      role: "Marketing Director",
      description: "Sophia crafts compelling stories that connect car buyers with their dream vehicles. Her creative campaigns have made Best Cars a household name.",
      email: "sophia.chen@bestcars.com",
      icon: ""
    },
    {
      name: "David Okonkwo",
      role: "Finance Manager",
      description: "David helps customers navigate financing options with transparency and care, making car ownership accessible to everyone.",
      email: "david.okonkwo@bestcars.com",
      icon: ""
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 font-['Inter',system-ui,-apple-system,sans-serif]">
      {/* Navbar */}
      <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700 shadow-lg">
        <div className="container-fluid px-4 py-3">
          <div className="flex items-center justify-between flex-wrap">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight m-0">
              Best Cars
            </h2>
            <button 
              className="navbar-toggler block lg:hidden text-gray-400 hover:text-white border border-gray-600 rounded-lg px-3 py-1"
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarText"
            >
              <span className="navbar-toggler-icon">☰</span>
            </button>
            <div className="hidden lg:flex items-center gap-6" id="navbarText">
              <ul className="flex gap-6 m-0 p-0 list-none">
                <li className="nav-item">
                  <a className="text-gray-300 hover:text-white text-base font-medium transition-all duration-200 hover:scale-105 inline-block" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="text-white text-base font-semibold transition-all duration-200 inline-block" href="/about">About Us</a>
                </li>
                <li className="nav-item">
                  <a className="text-gray-300 hover:text-white text-base font-medium transition-all duration-200 hover:scale-105 inline-block" href="/contact">Contact Us</a>
                </li>
              </ul>
              <span className="navbar-text">
                <div className="flex items-center gap-3">
                  {username ? (
                    <>
                      <span className="text-gray-200 font-semibold text-sm">{username}</span>
                      <button 
                        onClick={logout}
                        className="text-gray-400 hover:text-red-400 text-sm font-medium transition-all duration-200"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <a className="text-gray-300 hover:text-white text-sm font-medium transition-all duration-200" href="/login">Login</a>
                      <a className="text-gray-300 hover:text-white text-sm font-medium transition-all duration-200" href="/register">Register</a>
                    </>
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeInUp">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
            About Best Cars
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-500 to-gray-400 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in finding the perfect vehicle for over 20 years
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 hover:translate-y-[-4px]">
            <div className="text-5xl mb-4"></div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To provide exceptional automotive experiences by connecting customers with quality vehicles, 
              transparent pricing, and unmatched customer service across North America.
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 hover:translate-y-[-4px]">
            <div className="text-5xl mb-4"></div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              To become North America's most trusted and innovative car dealership network, 
              revolutionizing the way people buy and sell vehicles.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
            <div className="text-3xl md:text-4xl font-bold text-white">20+</div>
            <div className="text-gray-400 text-sm mt-1">Years of Excellence</div>
          </div>
          <div className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
            <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
            <div className="text-gray-400 text-sm mt-1">Dealerships</div>
          </div>
          <div className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
            <div className="text-3xl md:text-4xl font-bold text-white">50k+</div>
            <div className="text-gray-400 text-sm mt-1">Happy Customers</div>
          </div>
          <div className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
            <div className="text-3xl md:text-4xl font-bold text-white">24/7</div>
            <div className="text-gray-400 text-sm mt-1">Customer Support</div>
          </div>
        </div>

        {/* Company Story */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">Our Story</h3>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Founded in 2004, Best Cars started as a small family-owned dealership with a simple mission: 
              to help people find their dream cars without the traditional dealership hassle. Over two decades, 
              we've grown into one of North America's premier automotive networks while staying true to our roots.
            </p>
            <p>
              Today, we partner with over 500 trusted dealerships across the continent, offering an extensive 
              selection of both domestic and imported vehicles. Our commitment to transparency, quality, and 
              customer satisfaction has earned us the trust of over 50,000 happy customers.
            </p>
            <p>
              Whether you're looking for your first car, a family SUV, or a luxury vehicle, our team is dedicated 
              to making your car-buying journey seamless and enjoyable. We believe that finding the right car 
              should be an exciting experience, not a stressful one.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-4">Meet Our Leadership Team</h3>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Passionate professionals dedicated to your automotive success
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-500 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl"
              >
                <div className="text-5xl mb-4">{member.icon}</div>
                <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                <p className="text-cyan-400 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {member.description}
                </p>
                <a 
                  href={`mailto:${member.email}`}
                  className="text-gray-500 hover:text-cyan-400 text-xs transition-colors duration-200 inline-flex items-center gap-1"
                >
                  {member.email}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to Find Your Dream Car?</h3>
            <p className="text-gray-400 mb-6">Visit our dealerships or browse our extensive collection online</p>
            <a 
              href="/dealers" 
              className="inline-block bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:translate-y-[-2px]"
            >
              View Dealerships
            </a>
          </div>
        </div>
      </div>

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
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default About;