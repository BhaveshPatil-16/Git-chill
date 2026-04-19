import React, { useState } from 'react';
import { connect } from "react-redux";
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { signUpWithEmailAPI, signInAPI } from "../action";

function Step1Credentials({ onComplete, signUpWithEmail, signInOAuth }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError('');

    if (rememberMe) {
      localStorage.setItem('hirex_remember_email', email);
      localStorage.setItem('hirex_remember_password', password);
    } else {
      localStorage.removeItem('hirex_remember_email');
      localStorage.removeItem('hirex_remember_password');
    }

    try {
      const user = await signUpWithEmail(name, email, password);
      if (user && user.uid) {
        onComplete({ name, email, userId: user.uid });
      }
    } catch (err) {
      setError(err.message || 'Failed to create account');
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    try {
      setLoading(true);
      const user = await signInOAuth(provider);
      if (user && user.uid) {
        onComplete({ 
          name: user.displayName || 'User', 
          email: user.email, 
          userId: user.uid 
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to authenticate');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm text-gray-400 pl-1">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field pl-10" 
            placeholder="John Doe" 
          />
        </div>
      </div>

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

      <div className="space-y-1">
        <label className="text-sm text-gray-400 pl-1">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="password" 
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary mt-6">
        {loading ? 'Processing...' : 'Continue to Verification'}
        {!loading && <ArrowRight size={18} />}
      </button>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface/50 text-gray-400">Or sign up with</span>
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
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signUpWithEmail: (name, email, password) => dispatch(signUpWithEmailAPI(name, email, password)),
  signInOAuth: (provider) => dispatch(signInAPI(provider))
});

export default connect(null, mapDispatchToProps)(Step1Credentials);
