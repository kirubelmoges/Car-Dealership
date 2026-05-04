import React, { useState, useEffect } from 'react';
// Import the image correctly
import carsImage from './cars.jpeg';

const Contact = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 font-['Inter',system-ui,-apple-system,sans-serif]">
      {/* Navbar */}
      <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700 shadow-lg">
        <div className="container-fluid px-4 py-3">
          <div className="flex items-center justify-between flex-wrap">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight m-0">
              Dealerships
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
                  <a className="text-gray-300 hover:text-white text-base font-medium transition-all duration-200 hover:scale-105 inline-block" href="/about">About Us</a>
                </li>
                <li className="nav-item">
                  <a className="text-white text-base font-semibold transition-all duration-200 inline-block" href="/contact">Contact Us</a>
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

      {/* Contact Content */}
      <div className="h-[88vh] flex flex-col justify-center items-center text-center px-4">
        <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-6 shadow-2xl relative">
          {/* Use the imported image variable */}
          <img 
            src={carsImage} 
            className="w-full h-48 object-cover rounded-2xl mb-6" 
            alt="Cars"
          />
          
          <div className="flex flex-col md:flex-row justify-around items-center gap-8 mt-4">
            {/* Left side - Contact icon */}
            <div className="flex justify-center">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jqDkl_5KVJ6cDu1D1ETfjDYFAkyJFgU-uA&s" 
                alt="contact icon" 
                className="w-32 h-auto rounded-lg"
              />
            </div>

            {/* Right side - Contact details */}
            <div className="text-left space-y-3">
              <div>
                <p className="text-white font-bold mb-1">Contact Customer Service</p>
                <a href="mailto:support@carsells.com" className="text-gray-400 hover:text-cyan-400 transition-colors">support@carsells.com</a>
              </div>

              <div>
                <p className="text-white font-bold mb-1">National Advertising Team</p>
                <a href="mailto:NationalSales@carsells.com" className="text-gray-400 hover:text-cyan-400 transition-colors">NationalSales@carsells.com</a>
              </div>

              <div>
                <p className="text-white font-bold mb-1">Public Relations Team</p>
                <a href="mailto:PR@carsells.com" className="text-gray-400 hover:text-cyan-400 transition-colors">PR@carsells.com</a>
              </div>

              <div>
                <p className="text-white font-bold mb-1">carsells.com Offices</p>
                <p className="text-gray-400">0901075522</p>
              </div>

              <div>
                <p className="text-white font-bold mb-1">Become a Dealer:</p>
                <a href="https://growwithbestcars.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  growwithcarsells.com
                </a>
              </div>
            </div>
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
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Contact;