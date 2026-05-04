import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState();
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("postreview"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let review_url = root_url + `djangoapp/add_review`;
  let carmodels_url = root_url + `djangoapp/get_cars`;

  const postreview = async () => {
    let name = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
    //If the first and second name are stores as null, use the username
    if (name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if (!model || review === "" || date === "" || year === "" || model === "") {
      alert("All details are mandatory")
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });

    console.log(jsoninput);
    const res = await fetch(review_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsoninput,
    });

    const json = await res.json();
    if (json.status === 200) {
      window.location.href = window.location.origin + "/dealer/" + id;
    }
  }
  
  const get_dealer = async () => {
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();

    if (retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer)
      if (dealerobjs.length > 0)
        setDealer(dealerobjs[0])
    }
  }

  const get_cars = async () => {
    const res = await fetch(carmodels_url, {
      method: "GET"
    });
    const retobj = await res.json();

    let carmodelsarr = Array.from(retobj.CarModels)
    setCarmodels(carmodelsarr)
  }
  
  useEffect(() => {
    get_dealer();
    get_cars();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-950 font-['Inter',system-ui,-apple-system,sans-serif]">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8 animate-fadeInUp">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent mb-8 pb-4 border-b border-white/10">
          {dealer.full_name}
        </h1>
        
        <div className="bg-neutral-900/90 backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl">
          {/* Review Textarea */}
          <div className="mb-6">
            <label htmlFor="review" className="block text-neutral-300 text-xs font-semibold uppercase tracking-wide mb-2">
              Your Review
            </label>
            <textarea 
              id='review' 
              cols='50' 
              rows='7' 
              className="w-full bg-neutral-800/50 border border-white/10 rounded-2xl p-4 text-white text-sm outline-none transition-all duration-200 placeholder:text-neutral-600 resize-y focus:border-white/20 focus:bg-neutral-800/70 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.03)]"
              placeholder="Share your experience with this dealership..."
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>

          {/* Purchase Date */}
          <div className="mb-6">
            <label className="block text-neutral-300 text-xs font-semibold uppercase tracking-wide mb-2">
              Purchase Date
            </label>
            <input 
              type="date" 
              className="w-full bg-neutral-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 cursor-pointer focus:border-white/20 focus:bg-neutral-800/70 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.03)] [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Car Make & Model Dropdown */}
          <div className="mb-6">
            <label className="block text-neutral-300 text-xs font-semibold uppercase tracking-wide mb-2">
              Car Make & Model
            </label>
            <select 
              name="cars" 
              id="cars" 
              className="w-full bg-neutral-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 cursor-pointer focus:border-white/20 focus:bg-neutral-800/70 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.03)]"
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="" selected disabled hidden className="bg-neutral-900">Choose Car Make and Model</option>
              {carmodels.map((carmodel, index) => (
                <option key={index} value={carmodel.CarMake + " " + carmodel.CarModel} className="bg-neutral-900">
                  {carmodel.CarMake} {carmodel.CarModel}
                </option>
              ))}
            </select>
          </div>

          {/* Car Year */}
          <div className="mb-8">
            <label className="block text-neutral-300 text-xs font-semibold uppercase tracking-wide mb-2">
              Car Year
            </label>
            <input 
              type="number" 
              className="w-full md:w-64 bg-neutral-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 placeholder:text-neutral-600 focus:border-white/20 focus:bg-neutral-800/70 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.03)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setYear(e.target.value)} 
              max={2023} 
              min={2015}
              placeholder="e.g., 2020"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button 
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-8 rounded-full border border-white/10 transition-all duration-200 cursor-pointer hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 w-full md:w-auto"
              onClick={postreview}
            >
              Post Review
            </button>
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
  )
}

export default PostReview