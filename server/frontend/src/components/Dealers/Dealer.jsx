import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import positive_icon from "../assets/positive.png";
import neutral_icon from "../assets/neutral.png";
import negative_icon from "../assets/negative.png";
import review_icon from "../assets/reviewbutton.png";
import Header from '../Header/Header';

const Dealer = () => {
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("dealer"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let reviews_url = root_url + `djangoapp/reviews/dealer/${id}`;
  let post_review = root_url + `postreview/${id}`;

  const get_dealer = async () => {
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();

    if (retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer);
      setDealer(dealerobjs[0]);
    }
  };

  const get_reviews = async () => {
    const res = await fetch(reviews_url, {
      method: "GET"
    });
    const retobj = await res.json();

    if (retobj.status === 200) {
      if (retobj.reviews.length > 0) {
        setReviews(retobj.reviews);
      } else {
        setUnreviewed(true);
      }
    }
  };

  const senti_icon = (sentiment) => {
    let icon = sentiment === "positive" ? positive_icon : sentiment === "negative" ? negative_icon : neutral_icon;
    return icon;
  };

  useEffect(() => {
    get_dealer();
    get_reviews();
    if (sessionStorage.getItem("username")) {
      setPostReview(
        <a href={post_review} className="inline-flex transition-all duration-200 hover:scale-105">
          <img src={review_icon} className="w-10 h-10 md:w-12 md:h-12 drop-shadow-lg" alt='Post Review' />
        </a>
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-950 font-['Inter',system-ui,-apple-system,sans-serif]">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeInUp">
        {/* Dealer Header */}
        <div className="mb-12 pb-6 border-b border-white/10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent mb-3 flex items-center gap-3 flex-wrap">
            {dealer.full_name}
            {postReview}
          </h1>
          <h4 className="text-neutral-400 text-base md:text-lg font-medium">
            {dealer['city']}, {dealer['address']}, {dealer['zip']}, {dealer['state']}
          </h4>
        </div>

        {/* Reviews Panel */}
        <div className="space-y-4">
          {reviews.length === 0 && unreviewed === false ? (
            <div className="text-center py-12 px-4 bg-white/5 border border-white/5 rounded-2xl text-neutral-400 font-medium">
              Loading Reviews...
            </div>
          ) : unreviewed === true ? (
            <div className="text-center py-12 px-4 bg-white/5 border border-white/5 rounded-2xl text-neutral-400 font-medium">
              No reviews yet! Be the first to review.
            </div>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:border-white/10 hover:shadow-2xl relative overflow-hidden group">
                {/* Subtle top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neutral-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Sentiment Icon */}
                <img 
                  src={senti_icon(review.sentiment)} 
                  className="w-10 h-10 mb-4 drop-shadow-md" 
                  alt='Sentiment' 
                />
                
                {/* Review Text */}
                <div className="text-neutral-200 text-base leading-relaxed mb-3">
                  {review.review}
                </div>
                
                {/* Reviewer Info */}
                <div className="text-neutral-500 text-xs font-mono font-medium pt-3 border-t border-white/5">
                  {review.name} • {review.car_make} {review.car_model} ({review.car_year})
                </div>
              </div>
            ))
          )}
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

export default Dealer;