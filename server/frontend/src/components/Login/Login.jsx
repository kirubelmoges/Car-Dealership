import React, { useState } from "react";

const Login = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!userName || !password) {
      setError("Username and password are required");
      setIsLoading(false);
      return;
    }

    const API_URL = "http://localhost:8000";
    let login_url = `${API_URL}/djangoapp/login/`;

    try {
      const res = await fetch(login_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
      });

      const json = await res.json();
      
      if (json.status === "Authenticated") {
        sessionStorage.setItem("username", json.userName);
        window.location.href = "/home1";
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Cannot connect to server. Make sure Django is running on port 8000");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-950 flex items-center justify-center p-4 font-['Inter',system-ui,-apple-system,sans-serif]">
      <div className="bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-black/50 transition-all duration-500 animate-fadeInUp">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent tracking-tight">
            Welcome Back
          </span>
          <p className="text-neutral-500 text-sm mt-2">Sign in to your account</p>
        </div>
        
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-transparent text-neutral-500 text-xs tracking-wider uppercase">Login</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={login}>
          <div className="space-y-5">
            {/* Username */}
            <div className="group">
              <label className="block text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1">
                Username
              </label>
              <div className="flex items-center bg-neutral-900/80 border border-neutral-700 rounded-xl transition-all duration-300 focus-within:border-white/30 focus-within:bg-neutral-900 group-hover:border-neutral-500">
                <svg className="w-5 h-5 mx-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
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

            {/* Password */}
            <div className="group">
              <label className="block text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1">
                Password
              </label>
              <div className="flex items-center bg-neutral-900/80 border border-neutral-700 rounded-xl transition-all duration-300 focus-within:border-white/30 focus-within:bg-neutral-900 group-hover:border-neutral-500">
                <svg className="w-5 h-5 mx-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  name="psw"
                  type="password"
                  placeholder="Enter your password"
                  className="flex-1 bg-transparent border-none py-3.5 pr-3 text-white text-sm outline-none placeholder:text-neutral-600 font-light"
                  style={{ backgroundColor: 'transparent' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right mt-2">
            <a href="/forgot-password" className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors">
              Forgot password?
            </a>
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
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-neutral-500 text-xs">
              Don't have an account?{' '}
              <a href="/register" className="text-neutral-300 hover:text-white font-medium transition-colors hover:underline">
                Create one
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

export default Login;