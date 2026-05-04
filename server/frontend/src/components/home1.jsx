import React, { useState, useEffect } from 'react';
import carDealershipImage from './car_dealership.jpg';

const Home1 = () => {
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

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-12 animate-fadeInUp">
        <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden shadow-2xl hover:shadow-gray-900/50 transition-all duration-300">
          <img 
            src={carDealershipImage} 
            className="w-full h-80 object-cover opacity-90 hover:opacity-100 transition-opacity duration-300" 
            alt="Car Dealership"
          />
          <div className="p-8 text-center">
            <h5 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
              Welcome to our Dealerships!
            </h5>
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

export default Home1;