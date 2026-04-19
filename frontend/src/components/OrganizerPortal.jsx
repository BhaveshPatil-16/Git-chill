import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Calendar, DollarSign, FileText, Send, CheckCircle, Clock, PlusCircle, AlertCircle } from 'lucide-react';

const OrganizerPortal = ({ user }) => {
  const [formData, setFormData] = useState({ title: '', description: '', date: '', price: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [myEvents, setMyEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch this organizer's previously submitted events
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/v2/events/pending');
        const data = await res.json();
        if (data.success) {
          // Filter to only show events submitted by this user
          const mine = data.pendingEvents.filter(e => e.organizerId === user?.uid || e.organizerName === user?.displayName);
          setMyEvents(mine);
        }
      } catch {}
    };
    if (user) fetchMyEvents();
  }, [user, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      const res = await fetch('http://localhost:3001/api/v2/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          organizerName: user?.displayName || 'Organizer',
          organizerId: user?.uid || 'unknown'
        })
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', msg: '🎉 Event submitted! Awaiting admin approval.' });
        setFormData({ title: '', description: '', date: '', price: '' });
        setShowForm(false);
      } else {
        setStatus({ type: 'error', msg: data.message });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Failed to connect to backend server.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8 pb-20 animate-fadeIn">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] rounded-[32px] p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest mb-4">
              <Calendar size={13} /> Organizer Portal
            </div>
            <h1 className="text-[32px] font-black text-white leading-tight tracking-tight mb-3">
              Host Professional<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#3b82f6]">Events & Webinars</span>
            </h1>
            <p className="text-white/40 text-[15px] leading-relaxed max-w-[400px]">
              Submit your events for admin review. Once approved, they'll be listed on the platform for professionals to discover and register.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="shrink-0 flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white font-black text-[15px] shadow-[0_8px_24px_rgba(168,85,247,0.35)] transition-all"
          >
            <PlusCircle size={20} /> {showForm ? 'Cancel' : 'Create Event'}
          </button>
        </div>
      </div>

      {/* Status Banner */}
      {status.msg && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 text-[14px] font-semibold border ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
          {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {status.msg}
        </div>
      )}

      {/* Submission Form */}
      {showForm && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[28px] p-8 shadow-[var(--card-shadow)]">
          <h2 className="text-[20px] font-black text-[var(--text-card-primary)] mb-6 tracking-tight">Event Details</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-[var(--text-card-secondary)] uppercase tracking-wider">Event Title</label>
              <div className="relative group">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-card-muted)] group-focus-within:text-[#a855f7] transition-colors" size={17} />
                <input
                  type="text"
                  placeholder="e.g. Frontend Masters Bootcamp 2025"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="input-field pl-11 w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-[var(--text-card-secondary)] uppercase tracking-wider">Description</label>
              <textarea
                rows="4"
                placeholder="Describe your event, what attendees will learn, agenda..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field w-full resize-none p-4 text-[14px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[var(--text-card-secondary)] uppercase tracking-wider">Event Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-card-muted)] group-focus-within:text-[#a855f7] transition-colors" size={17} />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="input-field pl-11 w-full"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[var(--text-card-secondary)] uppercase tracking-wider">Ticket Price (USD)</label>
                <div className="relative group">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-card-muted)] group-focus-within:text-[#a855f7] transition-colors" size={17} />
                  <input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="input-field pl-11 w-full"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white font-black text-[15px] flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(168,85,247,0.3)] mt-2 disabled:opacity-50"
            >
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
              ) : (
                <>Submit for Approval <Send size={18} /></>
              )}
            </button>
          </form>
        </div>
      )}

      {/* My Submitted Events */}
      <div>
        <h2 className="text-[18px] font-black text-[var(--text-card-primary)] mb-5 tracking-tight flex items-center gap-2">
          <Clock size={18} className="text-[#a855f7]" /> My Submitted Events
        </h2>
        {myEvents.length === 0 ? (
          <div className="bg-[var(--bg-card)] border border-dashed border-[var(--border-card)] rounded-[24px] p-12 text-center">
            <Calendar size={40} className="text-[var(--text-card-muted)] mx-auto mb-3" />
            <p className="text-[var(--text-card-muted)] font-medium">No events submitted yet. Create your first event above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {myEvents.map(event => (
              <div key={event.id} className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-[24px] p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-[16px] font-black text-[var(--text-card-primary)] tracking-tight">{event.title}</h3>
                  <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full text-[11px] font-black uppercase">Pending</span>
                </div>
                <p className="text-[var(--text-card-secondary)] text-[13px] mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center justify-between text-[12px] text-[var(--text-card-muted)]">
                  <span>📅 {event.date}</span>
                  <span className="font-black text-[var(--accent-green)]">${event.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.userState.user });
export default connect(mapStateToProps)(OrganizerPortal);
