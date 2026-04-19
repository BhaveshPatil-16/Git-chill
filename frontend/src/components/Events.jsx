import React, { useState, useEffect } from "react";
import { Plus, X, Calendar, MapPin, Tag, Image as ImageIcon, ArrowUpRight, Sparkles, DollarSign } from 'lucide-react';


const INITIAL_EVENTS = [
  {
    id: 1,
    title: "AWS Startups Summit 2026",
    desc: "Join top CTOs discussing infrastructure scaling and generative AI deployment. Hear from founders who scaled from $0 to $10M ARR.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    tags: ["cloud compute", "sponsored"]
  },
  {
    id: 2,
    title: "React Server Components Webinar",
    desc: "Learn how Vercel migrated their core infrastructure to RSC, reducing bundle sizes by 40%. Live Q&A with the core engineering team.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    tags: ["frontend", "architecture"]
  }
];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    price: '0',
    img: '',
    tags: ''
  });

  const fetchEvents = async () => {
    setIsFetching(true);
    try {
      const res = await fetch('http://localhost:3001/api/v2/events/approved');
      const data = await res.json();
      if (data.success) {
        setEvents(data.events);
      }
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:3001/api/v2/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          tags: formData.tags.split(',').map(t => t.trim())
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setFormData({ title: '', description: '', date: '', price: '0', img: '', tags: '' });
        alert('Event submitted! It will appear after admin approval.');
      }
    } catch (err) {
      alert('Failed to submit event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col pb-20 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-500 font-bold text-[12px] uppercase tracking-widest">
            <Calendar size={14} /> Professional Networking
          </div>
          <h1 className="text-[40px] font-black text-[var(--text-primary)] tracking-tighter leading-none">
            Industry Events
          </h1>
          <p className="text-[var(--text-secondary)] text-[16px] max-w-[500px] font-medium leading-relaxed">
            Connect with industry leaders at exclusive summits, workshops, and high-signal webinars.
          </p>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="h-14 px-8 rounded-2xl bg-gradient-to-r from-[#9b4fdf] to-[#3674e0] text-white font-bold text-[14px] shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Create Event
        </button>
      </div>

      {/* Grid Layout */}
      {isFetching ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
        </div>
      ) : events.length === 0 ? (
        <div className="bg-[var(--bg-card)] border border-dashed border-[var(--border-card)] rounded-[32px] p-20 text-center">
           <Calendar size={48} className="text-[var(--text-card-muted)] mx-auto mb-4" />
           <p className="text-[var(--text-card-muted)] font-bold">No approved events available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col group hover:-translate-y-1 transition-all duration-300">
              <div className="relative w-full h-[220px] rounded-t-3xl rounded-bl-3xl overflow-hidden shadow-[var(--card-shadow)] border border-[var(--border-card)]">
                <img
                  src={event.img || "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40" />
                
                <div className="absolute -bottom-1.5 -right-1.5 w-20 h-20 rounded-tl-full"
                     style={{ background: "var(--bg-primary)" }}>
                    <button className="absolute inset-2.5 rounded-full flex justify-center items-center transition-all duration-300 hover:scale-110 cursor-pointer border-none" style={{ background: "var(--gradient-accent)", boxShadow: "0 4px 15px rgba(155, 79, 223, 0.4)" }}>
                       <ArrowUpRight size={24} className="text-white" />
                    </button>
                </div>

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {event.tags && event.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                  {event.price > 0 ? (
                    <span className="px-3 py-1 rounded-full bg-green-500 text-white text-[10px] font-black uppercase tracking-widest">
                      ${event.price}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest">
                      Free
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-6 pb-2 space-y-3 px-2">
                <div className="flex items-center gap-2 text-[12px] font-bold text-[var(--text-secondary)]">
                   <Calendar size={14} />
                   <span>{event.date}</span>
                   <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)] mx-1"></span>
                   <span className="text-purple-500">by {event.organizerName || 'Partner'}</span>
                </div>
                <h3 className="text-[22px] font-black text-[var(--text-primary)] tracking-tight leading-tight group-hover:text-purple-500 transition-colors">
                  {event.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-[14px] font-medium line-clamp-3">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[var(--bg-card)] rounded-[40px] border border-white/10 shadow-2xl p-10 animate-scaleUp">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-[var(--text-card-muted)] hover:text-[var(--text-card-primary)] transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                <Plus size={24} />
              </div>
              <h2 className="text-[28px] font-black tracking-tight">Host an Event</h2>
              <p className="text-[var(--text-card-muted)] font-medium">Reach thousands of verified professionals.</p>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[12px] font-black text-[var(--text-card-muted)] uppercase tracking-widest pl-1">Event Title</label>
                <div className="relative">
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500/40" size={18} />
                  <input 
                    type="text" 
                    required 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full h-14 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-2xl pl-12 pr-4 focus:border-purple-500/50 outline-none transition-all font-bold text-[14px] text-[var(--input-text)]"
                    placeholder="e.g. Future of Web Components"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-black text-[var(--text-card-muted)] uppercase tracking-widest pl-1">Description</label>
                <textarea 
                   required 
                   rows="3"
                   value={formData.description}
                   onChange={(e) => setFormData({...formData, description: e.target.value})}
                   className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-2xl p-4 focus:border-purple-500/50 outline-none transition-all font-medium text-[14px] text-[var(--input-text)]"
                   placeholder="What is this event about?"
                 />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-black text-[var(--text-card-muted)] uppercase tracking-widest pl-1">Event Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-card-muted)]" size={18} />
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full h-14 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-2xl pl-12 pr-4 focus:border-purple-500/50 outline-none transition-all font-bold text-[14px] text-[var(--input-text)]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-black text-[var(--text-card-muted)] uppercase tracking-widest pl-1">Price (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-card-muted)]" size={18} />
                    <input 
                      type="number" 
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full h-14 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-2xl pl-12 pr-4 focus:border-purple-500/50 outline-none transition-all font-bold text-[14px] text-[var(--input-text)]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-black text-[var(--text-card-muted)] uppercase tracking-widest pl-1">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-card-muted)]" size={18} />
                    <input 
                      type="url" 
                      value={formData.img}
                      onChange={(e) => setFormData({...formData, img: e.target.value})}
                      className="w-full h-14 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-2xl pl-12 pr-4 focus:border-purple-500/50 outline-none transition-all font-bold text-[14px] text-[var(--input-text)]"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-black text-[var(--text-card-muted)] uppercase tracking-widest pl-1">Tags (Comma separated)</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-card-muted)]" size={18} />
                    <input 
                      type="text" 
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full h-14 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-2xl pl-12 pr-4 focus:border-purple-500/50 outline-none transition-all font-bold text-[14px] text-[var(--input-text)]"
                      placeholder="React, AI, Cloud"
                    />
                  </div>
                </div>
              </div>


              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#9b4fdf] to-[#3674e0] text-white font-black text-[16px] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-4 shadow-xl"
              >
                {loading ? 'Publishing Event...' : 'Publish Event'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
