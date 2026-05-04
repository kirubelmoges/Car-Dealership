import React from 'react';

const Header = () => {
    const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin+"/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });
  
    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out "+username+"...")
    }
    else {
      alert("The user could not be logged out.")
    }
  };
    
//The default home page items are the login details panel
let home_page_items =  <div></div>

//Gets the username in the current session
let curr_user = sessionStorage.getItem('username')

//If the user is logged in, show the username and logout option on home page
if ( curr_user !== null &&  curr_user !== "") {
    home_page_items = <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 transition-all duration-200 hover:bg-white/10 hover:border-white/20">
      <span className='text-neutral-200 font-semibold text-sm tracking-wide font-mono'>{sessionStorage.getItem("username")}</span>
      <a className="text-neutral-400 hover:text-red-400 text-sm font-medium transition-all duration-200 hover:translate-x-0.5 cursor-pointer" href="/djangoapp/logout" onClick={logout}>Logout</a>
    </div>
}
    return (
        <div>
          <nav className="bg-gradient-to-r from-neutral-900 via-black to-neutral-900 border-b border-white/10 shadow-lg h-[70px] backdrop-blur-sm">
            <div className="container-fluid px-4 h-full">
              <div className="flex items-center justify-between h-full">
                {/* Brand Title */}
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent tracking-tight m-0">
                  Dealerships
                </h2>
                
                {/* Mobile Toggle Button */}
                <button 
                  className="navbar-toggler block lg:hidden text-white/70 hover:text-white border border-white/20 rounded-lg px-3 py-1 transition-all duration-200"
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#navbarText" 
                  aria-controls="navbarText" 
                  aria-expanded="false" 
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon inline-block w-6 h-6 bg-current mask-menu"></span>
                </button>
                
                {/* Navigation Items */}
                <div className="collapse navbar-collapse hidden lg:flex lg:items-center lg:justify-between flex-grow" id="navbarText">
                  <ul className="flex flex-col lg:flex-row gap-1 lg:gap-2 ml-auto lg:ml-0 mb-2 lg:mb-0 mt-4 lg:mt-0">
                    <li className="nav-item">
                      <a className="text-neutral-300 hover:text-white text-base font-medium px-4 py-2 transition-all duration-200 hover:translate-y-[-1px] relative active:text-white active:font-semibold" aria-current="page" href="/">
                        Home
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-neutral-500 to-neutral-300 transition-all duration-200 group-hover:w-6"></span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="text-neutral-300 hover:text-white text-base font-medium px-4 py-2 transition-all duration-200 hover:translate-y-[-1px]" href="/about">
                        About Us
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="text-neutral-300 hover:text-white text-base font-medium px-4 py-2 transition-all duration-200 hover:translate-y-[-1px]" href="/contact">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                  
                  {/* User Panel */}
                  <div className="hidden lg:block">
                    {home_page_items}
                  </div>
                </div>
              </div>
            </div>
          </nav>
          
          {/* Mobile menu items - shown when collapsed */}
          <div className="lg:hidden">
            <div className="collapse navbar-collapse" id="navbarText-mobile">
              <div className="bg-neutral-900/95 backdrop-blur-md border-b border-white/10 p-4">
                <ul className="flex flex-col gap-2 mb-4">
                  <li>
                    <a className="block text-neutral-300 hover:text-white py-2 px-3 rounded-lg transition-all duration-200 hover:bg-white/5" href="/">Home</a>
                  </li>
                  <li>
                    <a className="block text-neutral-300 hover:text-white py-2 px-3 rounded-lg transition-all duration-200 hover:bg-white/5" href="/about">About Us</a>
                  </li>
                  <li>
                    <a className="block text-neutral-300 hover:text-white py-2 px-3 rounded-lg transition-all duration-200 hover:bg-white/5" href="/contact">Contact Us</a>
                  </li>
                </ul>
                <div className="pt-2 border-t border-white/10">
                  {home_page_items}
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Header
