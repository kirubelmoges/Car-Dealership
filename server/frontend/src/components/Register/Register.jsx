import React, { useState } from "react";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import close_icon from "../assets/close.png";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    // Validation
    if (!userName || !password || !email || !firstName || !lastName) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    // Use absolute URL with port 8000 for Django backend
    const API_URL = "http://localhost:8000";
    let register_url = `${API_URL}/djangoapp/register/`;

    try {
      const res = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email,
        }),
      });

      const json = await res.json();
      
      if (res.status === 200 && json.status === "Authenticated") {
        // Registration successful - redirect to login page
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else if (json.error === "Already Registered") {
        setError("Username already exists. Please choose a different username.");
      } else if (json.error) {
        setError(json.error);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Cannot connect to server. Make sure Django is running on port 8000");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-950 flex items-center justify-center p-4 font-['Inter',system-ui,-apple-system,sans-serif]">
      <div className="bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-black/50 transition-all duration-500 animate-fadeInUp">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-4xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent tracking-tight">
              Sign Up
            </span>
            <p className="text-neutral-500 text-sm mt-1">Create your account</p>
          </div>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              gohome();
            }}
            className="w-10 h-10 rounded-full bg-neutral-800/80 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-neutral-700 hover:scale-110 hover:rotate-90 group backdrop-blur-sm"
          >
            <img
              src={close_icon}
              alt="Close"
              className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300"
            />
          </a>
        </div>
        
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-transparent text-neutral-500 text-xs tracking-wider uppercase">Join us today</span>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm text-center">
            Registration successful! Redirecting to login page...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={register}>
          <div className="space-y-4">
            {/* Username */}
            <div className="group">
              <label className="block text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1">
                Username
              </label>
              <div className="flex items-center bg-neutral-900/80 border border-neutral-700 rounded-xl transition-all duration-300 focus-within:border-white/30 focus-within:bg-neutral-900 group-hover:border-neutral-500">
                <img src={user_icon} alt="Username" className="w-5 h-5 mx-3 opacity-50 group-focus-within:opacity-100 transition-opacity" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="flex-1 bg-transparent border-none py-3.5 pr-3 text-white text-sm outline-none placeholder:text-neutral-600 font-light"
                  style={{ backgroundColor: 'transparent' }}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Name Fields - Side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div className="group">
                <label className="block text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1">
                  First Name
                </label>
                <div className="flex items-center bg-neutral-900/80 border border-neutral-700 rounded-xl transition-all duration-300 focus-within:border-white/30 focus-within:bg-neutral-900 group-hover:border-neutral-500">
                  <img src={user_icon} alt="First Name" className="w-5 h-5 mx-3 opacity-50" />
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    className="flex-1 bg-transparent border-none py-3.5 pr-3 text-white text-sm outline-none placeholder:text-neutral-600 font-light"
                    style={{ backgroundColor: 'transparent' }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1">
                  Last Name
                </label>
                <div className="flex items-center bg-neutral-900/80 border border-neutral-700 rounded-xl transition-all duration-300 focus-within:border-white/30 focus-within:bg-neutral-900 group-hover:border-neutral-500">
                  <img src={user_icon} alt="Last Name" className="w-5 h-5 mx-3 opacity-50" />
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    className="flex-1 bg-transparent border-none py-3.5 pr-3 text-white text-sm outline-none placeholder:text-neutral-600 font-light"
                    style={{ backgroundColor: 'transparent' }}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1">
                Email Address
              </label>
              <div className="flex items-center bg-neutral-900/80 border border-neutral-700 rounded-xl transition-all duration-300 focus-within:border-white/30 focus-within:bg-neutral-900 group-hover:border-neutral-500">
                <img src={email_icon} alt="Email" className="w-5 h-5 mx-3 opacity-50 group-focus-within:opacity-100 transition-opacity" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent border-none py-3.5 pr-3 text-white text-sm outline-none placeholder:text-neutral-600 font-light"
                  style={{ backgroundColor: 'transparent' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1">
                Password
              </label>
              <div className="flex items-center bg-neutral-900/80 border border-neutral-700 rounded-xl transition-all duration-300 focus-within:border-white/30 focus-within:bg-neutral-900 group-hover:border-neutral-500">
                <img src={password_icon} alt="Password" className="w-5 h-5 mx-3 opacity-50 group-focus-within:opacity-100 transition-opacity" />
                <input
                  name="psw"
                  type="password"
                  placeholder="Create a password"
                  className="flex-1 bg-transparent border-none py-3.5 pr-3 text-white text-sm outline-none placeholder:text-neutral-600 font-light"
                  style={{ backgroundColor: 'transparent' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-white focus:ring-white/20 focus:ring-offset-0 accent-neutral-500"
                required
              />
              <label htmlFor="terms" className="text-neutral-500 text-xs">
                I agree to the <a href="/terms" className="text-neutral-300 hover:text-white transition-colors">Terms of Service</a> and <a href="/privacy" className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</a>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full group overflow-hidden rounded-xl bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 hover:from-neutral-700 hover:via-neutral-600 hover:to-neutral-700 text-white font-bold py-3.5 px-4 transition-all duration-300 hover:shadow-xl hover:shadow-white/5 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Register Now
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-neutral-500 text-xs">
              Already have an account?{' '}
              <a href="/login" className="text-neutral-300 hover:text-white font-medium transition-colors hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </form>
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
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px #1f1f1f inset !important;
          -webkit-text-fill-color: white !important;
        }
      `}</style>
    </div>
  );
};

export default Register;