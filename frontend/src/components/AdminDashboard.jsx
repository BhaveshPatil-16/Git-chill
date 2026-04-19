import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert, CheckCircle, XCircle, LogOut, Clock,
  ExternalLink, RefreshCw, Users, Calendar, AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) navigate('/admin');
  }, [token, navigate]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {

      const headers = { 'Authorization': `Bearer ${token}` };
      const url = activeTab === 'users' 
        ? 'http://localhost:3001/api/v2/admin/pending'
        : 'http://localhost:3001/api/v2/events/pending';
        
      const res = await fetch(url, { headers });
      
      if (res.status === 401) {
        console.error('Session expired or invalid token. Logging out...');
        handleLogout();
        return;
      }

      const data = await res.json();
      if (data.success) {
        if (activeTab === 'users') setPendingUsers(data.pendingUsers);
        else setPendingEvents(data.pendingEvents);
      } else {
        setError(data.message || `Server error: ${data.error || 'Unknown'}`);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Connection refused. Verify that the backend is running on port 3001.');
    } finally {
      setIsLoading(false);
    }

  }, [activeTab, token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleUserAction = async (userId, action) => {
    setProcessingId(userId);
    try {
      const res = await fetch(`http://localhost:3001/api/v2/admin/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (data.success) setPendingUsers(prev => prev.filter(u => u.id !== userId));
    } catch { alert('Network error'); }
    finally { setProcessingId(null); }
  };

  const handleEventAction = async (eventId, action) => {
    setProcessingId(eventId);
    try {
      const res = await fetch(`http://localhost:3001/api/v2/events/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId })
      });
      const data = await res.json();
      if (data.success) setPendingEvents(prev => prev.filter(e => e.id !== eventId));
    } catch { alert('Network error'); }
    finally { setProcessingId(null); }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const pendingCount = activeTab === 'users' ? pendingUsers.length : pendingEvents.length;

  return (
    <div className="min-h-screen bg-[#050510] text-white">
      {/* Header */}
      <header 
        className="sticky top-0 z-[100] border-b border-white/5 px-6 transition-colors duration-300"
        style={{ background: "var(--bg-nav)", backdropFilter: "blur(20px) saturate(1.4)", WebkitBackdropFilter: "blur(20px) saturate(1.4)" }}
      >
        <div className="flex items-center justify-between mx-auto h-16 max-w-[1400px]">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="text-[24px] font-extrabold tracking-[-0.5px]" style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>H</span>
              <span className="text-[24px] font-bold tracking-[-0.5px]" style={{ color: "var(--nav-text-color)" }}>ire</span>
              <span className="text-[28px] font-extrabold ml-[-2px]" style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>X</span>
            </div>
            <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
            <div className="hidden md:block">
              <h2 className="text-[13px] font-black tracking-tight text-white/90">Admin Portal</h2>
              <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest">Management</p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-white/5 rounded-2xl p-1 border border-white/10 gap-1 scale-90 md:scale-100">
            {[{ key: 'users', icon: Users, label: 'Users' }, { key: 'events', icon: Calendar, label: 'Events' }].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[13px] font-bold transition-all ${activeTab === key ? 'bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={fetchData} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10" title="Refresh">
              <RefreshCw size={17} className={isLoading ? 'animate-spin text-[#a855f7]' : 'text-white/50'} />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all border border-red-500/20 text-[13px] font-bold">
              <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>


      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-[22px] font-black tracking-tight">
              {activeTab === 'users' ? 'Pending Verifications' : 'Event Approvals'}
            </h3>
            <p className="text-white/40 text-[13px] mt-1">
              {activeTab === 'users' ? 'Review identity proofs and approve or reject user accounts.' : 'Review event submissions from organizers.'}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#a855f7]/10 border border-[#a855f7]/20 rounded-full px-4 py-2">
            <Clock size={14} className="text-[#a855f7]" />
            <span className="text-[13px] font-bold text-[#a855f7]">{pendingCount} Pending</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {isLoading && pendingCount === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white/3 rounded-3xl border border-dashed border-white/10">
            <RefreshCw size={40} className="animate-spin text-[#a855f7]/40 mb-4" />
            <p className="text-white/30">Loading pending items...</p>
          </div>
        ) : pendingCount === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white/3 rounded-3xl border border-dashed border-white/10">
            <CheckCircle size={48} className="text-green-500/40 mb-4" />
            <h3 className="text-[20px] font-black mb-2">All Caught Up!</h3>
            <p className="text-white/30">No {activeTab} are waiting for approval.</p>
            
            {/* Debug Button */}
            <button 
              onClick={async () => {
                const res = await fetch('http://localhost:3001/api/v2/admin/debug-users', {
                  headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                console.log('DEBUG USERS:', data.users);
                alert(`Found ${data.users?.length || 0} total users in DB. Check console for details.`);
              }}
              className="mt-6 text-[12px] text-[#a855f7] hover:underline font-bold"
            >
              🛠️ Debug: Log all users to console
            </button>
          </div>
        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeTab === 'users' ? pendingUsers.map(user => (
              <div key={user.id} className="bg-white/4 border border-white/8 rounded-[28px] p-6 hover:border-white/15 transition-all">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h4 className="text-[18px] font-black text-white mb-1">{user.name || 'Unknown'}</h4>
                    <p className="text-white/40 text-[13px]">{user.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${user.role === 'business_owner' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' : 'bg-purple-500/15 text-purple-400 border border-purple-500/20'}`}>
                    {user.role === 'business_owner' ? 'Business' : 'Individual'}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  {user.company && (
                    <div className="flex justify-between py-2 border-b border-white/5 text-[13px]">
                      <span className="text-white/30">Company</span>
                      <span className="text-white font-semibold">{user.company}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-white/5 text-[13px]">
                    <span className="text-white/30">Submitted</span>
                    <span className="text-white font-semibold">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  {(user.faceImageUrl || (user.documentUrls && user.documentUrls.length > 0)) && (
                    <div className="pt-3">
                      <p className="text-[11px] text-white/25 uppercase tracking-widest font-bold mb-3">Identity Proofs</p>
                      <div className="flex gap-3">
                        {user.faceImageUrl && (
                          <a href={user.faceImageUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[12px] text-white/60 hover:text-white transition-all border border-white/10">
                            <ExternalLink size={13} /> View Face
                          </a>
                        )}
                        {user.documentUrls?.[0] && (
                          <a href={user.documentUrls[0]} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[12px] text-white/60 hover:text-white transition-all border border-white/10">
                            <ExternalLink size={13} /> View ID
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleUserAction(user.id, 'reject')}
                    disabled={processingId === user.id}
                    className="flex-1 py-3 rounded-2xl border border-red-500/30 text-red-400 font-bold text-[13px] hover:bg-red-500/10 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                  <button
                    onClick={() => handleUserAction(user.id, 'approve')}
                    disabled={processingId === user.id}
                    className="flex-1 py-3 rounded-2xl bg-green-500 text-white font-bold text-[13px] hover:bg-green-600 transition-all shadow-[0_4px_16px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    {processingId === user.id ? <RefreshCw size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                    Approve
                  </button>
                </div>
              </div>
            )) : pendingEvents.map(event => (
              <div key={event.id} className="bg-white/4 border border-white/8 rounded-[28px] p-6 hover:border-white/15 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-[18px] font-black text-white mb-1">{event.title}</h4>
                    <p className="text-[#a855f7] font-semibold text-[13px]">by {event.organizerName}</p>
                  </div>
                  <div className="bg-[#a855f7]/15 text-[#a855f7] px-4 py-2 rounded-2xl font-black text-[15px] border border-[#a855f7]/20">
                    ${event.price}
                  </div>
                </div>

                <p className="text-white/40 text-[13px] mb-5 leading-relaxed line-clamp-2">{event.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between py-2 border-b border-white/5 text-[13px]">
                    <span className="text-white/30">Event Date</span>
                    <span className="text-white font-semibold">{event.date}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5 text-[13px]">
                    <span className="text-white/30">Submitted</span>
                    <span className="text-white font-semibold">{event.createdAt ? new Date(event.createdAt).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEventAction(event.id, 'reject')}
                    disabled={processingId === event.id}
                    className="flex-1 py-3 rounded-2xl border border-red-500/30 text-red-400 font-bold text-[13px] hover:bg-red-500/10 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                  <button
                    onClick={() => handleEventAction(event.id, 'approve')}
                    disabled={processingId === event.id}
                    className="flex-1 py-3 rounded-2xl bg-green-500 text-white font-bold text-[13px] hover:bg-green-600 transition-all shadow-[0_4px_16px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    {processingId === event.id ? <RefreshCw size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
