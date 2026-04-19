import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // If already logged in as admin, skip to dashboard
  if (localStorage.getItem('adminToken')) {
    navigate('/admin-dashboard');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/v2/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin-dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to the server. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(59,130,246,0.10)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-md z-10 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#a855f7] to-[#3b82f6] rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
            <Shield size={36} className="text-white" />
          </div>
          <h1 className="text-[32px] font-black text-white tracking-tight mb-2">Admin Portal</h1>
          <p className="text-white/40 text-[15px]">Secure access for platform administrators</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/50 uppercase tracking-widest">Admin ID</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#a855f7] transition-colors" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin ID"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-white/20 text-[14px] outline-none focus:border-[#a855f7]/50 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/50 uppercase tracking-widest">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#a855f7] transition-colors" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-white/20 text-[14px] outline-none focus:border-[#a855f7]/50 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/20">
            This portal is restricted to authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
