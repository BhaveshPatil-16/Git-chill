import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { signInAPI, signInWithEmailAPI } from "../action";

function SignIn(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(localStorage.getItem('hirex_remember_email') ? true : false);

  useEffect(() => {
    // If remember me saved credentials, autofill
    const savedEmail = localStorage.getItem('hirex_remember_email');
    const savedPassword = localStorage.getItem('hirex_remember_password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      // Optional: automatically attempt login
      // props.signIn(savedEmail, savedPassword);
    }
  }, []);

  if (props.user) {
    return <Navigate to="/profile" />;
  }

  const validateForm = () => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email address";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await props.signInWithEmail(email, password);
      
      if (rememberMe) {
        localStorage.setItem('hirex_remember_email', email);
        localStorage.setItem('hirex_remember_password', password);
      } else {
        localStorage.removeItem('hirex_remember_email');
        localStorage.removeItem('hirex_remember_password');
      }
    } catch (err) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    setError('');
    try {
      await props.signInOAuth(provider);
    } catch (err) {
      setError("OAuth authentication failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-400">Sign in to your hireX account</p>
        </div>

        <div className="glass-panel p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-3 animate-shake">
              <span className="text-lg">⚠️</span>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-400 pl-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10" 
                  placeholder="name@company.com" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-400 pl-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pl-1 py-1">
              <input 
                type="checkbox" 
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-500 bg-black/30 text-primary focus:ring-primary focus:ring-offset-background"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-400 cursor-pointer">
                Remember Me
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn-primary mt-6">
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => handleOAuth('google')} className="flex justify-center items-center gap-2 py-2.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <img src="/images/google.svg" alt="Google" className="h-5 w-5" />
                <span className="text-sm text-white/70">Google</span>
              </button>
              <button type="button" onClick={() => handleOAuth('github')} className="flex justify-center items-center gap-2 py-2.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                <span className="text-sm text-white/70">GitHub</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signInWithEmail: (email, password) => dispatch(signInWithEmailAPI(email, password)),
  signInOAuth: (provider) => dispatch(signInAPI(provider))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
