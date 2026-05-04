import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png";

const Dealers = () => {
  const navigate = useNavigate();
  const [dealersList, setDealersList] = useState([]);
  let [states, setStates] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let dealer_url = "/djangoapp/get_dealers";
  let dealer_url_by_state = "/djangoapp/get_dealers/";

  // Check login status
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (!username || username === "") {
      navigate("/home1");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const filterDealers = async (state) => {
    let url = "/djangoapp/get_dealers/" + state;
    const res = await fetch(url, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let state_dealers = Array.from(retobj.dealers)
      setDealersList(state_dealers)
    }
  }

  const get_dealers = async () => {
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let all_dealers = Array.from(retobj.dealers)
      let states = [];
      all_dealers.forEach((dealer) => {
        states.push(dealer.state)
      });
      setStates(Array.from(new Set(states)))
      setDealersList(all_dealers)
    }
  }
  
  useEffect(() => {
    get_dealers();
  }, []);

  // Go back to home1
  const goBackToHome = () => {
    navigate("/home1");
  };

  // Show loading while checking auth
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Redirecting...</p>
        </div>
      </div>
    );
  }

  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 font-['Inter',system-ui,-apple-system,sans-serif]">
      <Header/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeInUp">
        {/* Back to Home Button */}
        <div className="mb-6">
          <button
            onClick={goBackToHome}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-200 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
          <div className="overflow-x-auto">
            <table className='w-full'>
              <thead className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-b border-gray-700">
                <tr>
                  <th className="px-4 py-4 text-left text-gray-300 text-xs font-bold uppercase tracking-wider">ID</th>
                  <th className="px-4 py-4 text-left text-gray-300 text-xs font-bold uppercase tracking-wider">Dealer Name</th>
                  <th className="px-4 py-4 text-left text-gray-300 text-xs font-bold uppercase tracking-wider">City</th>
                  <th className="px-4 py-4 text-left text-gray-300 text-xs font-bold uppercase tracking-wider">Address</th>
                  <th className="px-4 py-4 text-left text-gray-300 text-xs font-bold uppercase tracking-wider">Zip</th>
                  <th className="px-4 py-4 text-left text-gray-300 text-xs font-bold uppercase tracking-wider">
                    <select 
                      name="state" 
                      id="state" 
                      className="bg-gray-700 text-gray-200 border border-gray-600 rounded-xl px-3 py-2 text-xs font-medium cursor-pointer transition-all duration-200 hover:border-gray-500 focus:outline-none focus:border-gray-400"
                      onChange={(e) => filterDealers(e.target.value)}
                    >
                      <option value="" selected disabled hidden className="bg-gray-800">Filter by State</option>
                      <option value="All" className="bg-gray-800">All States</option>
                      {states.map((state, index) => (
                        <option key={index} value={state} className="bg-gray-800">{state}</option>
                      ))}
                    </select>
                  </th>
                  <th className="px-4 py-4 text-left text-gray-300 text-xs font-bold uppercase tracking-wider">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {dealersList.map((dealer, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-all duration-200">
                    <td className="px-4 py-4 text-gray-300 text-sm whitespace-nowrap" data-label="ID">{dealer['id']}</td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap" data-label="Dealer Name">
                      <a href={'/dealer/'+dealer['id']} className="text-gray-300 hover:text-cyan-400 font-semibold transition-all duration-200 hover:translate-x-0.5 inline-block">
                        {dealer['full_name']}
                      </a>
                    </td>
                    <td className="px-4 py-4 text-gray-400 text-sm whitespace-nowrap" data-label="City">{dealer['city']}</td>
                    <td className="px-4 py-4 text-gray-400 text-sm whitespace-nowrap" data-label="Address">{dealer['address']}</td>
                    <td className="px-4 py-4 text-gray-400 text-sm whitespace-nowrap" data-label="Zip">{dealer['zip']}</td>
                    <td className="px-4 py-4 text-gray-400 text-sm whitespace-nowrap" data-label="State">{dealer['state']}</td>
                    <td className="px-4 py-4 whitespace-nowrap" data-label="Review">
                      <a href={`/postreview/${dealer['id']}`} className="inline-flex items-center justify-center transition-all duration-200 hover:scale-110">
                        <img src={review_icon} className="w-6 h-6 opacity-70 hover:opacity-100 transition-all duration-200" alt="Post Review"/>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        /* Responsive table styles */
        @media (max-width: 768px) {
          table, thead, tbody, tr, td, th {
            display: block;
          }
          
          thead {
            display: none;
          }
          
          tr {
            margin-bottom: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 1rem;
            background: rgba(24, 24, 27, 0.5);
            backdrop-filter: blur(8px);
          }
          
          td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1rem !important;
            text-align: right;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            white-space: normal !important;
          }
          
          td:last-child {
            border-bottom: none;
          }
          
          td::before {
            content: attr(data-label);
            font-weight: 700;
            color: #9ca3af;
            margin-right: 1rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            text-align: left;
          }
          
          td[data-label="Review"]::before {
            content: "Review";
          }
        }
      `}</style>
    </div>
  )
}

export default Dealers;